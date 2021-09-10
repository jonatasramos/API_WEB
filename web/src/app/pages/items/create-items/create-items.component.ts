import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../services';
import { CategoriesService } from '../../../services';

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.scss']
})
/**
 * Class CreateItemsComponent
 *
 * @author Jônatas Ramos
 */
export class CreateItemsComponent implements OnInit {
  public loading: boolean = false;
  public error: any = null;
  public submitted = false;
  public id: any = null;
  public title: string = '';
  public item: any = {
    name: '',
    category: []
  };
  public category: any = [];
  public categories: any = [];
  public ItemForm: FormGroup;
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public establishment_id: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.establishment_id = localStorage.getItem('establishment_id');
    this.createForm();
    this.route.params.subscribe((p: any) => {
      if (p.id != null && p.id != 0) {
        this.id = p.id;
        this.getItem();
      }

      this.title = this.id ? 'Editar Iten' : 'Novo Iten';
    });

    this.dropDownConfig();
  }

  /**
   * Select Config
   *
   */
  dropDownConfig() {
    this.categoriesService.get(this.establishment_id).subscribe((data: any) => {
      this.categories = data.category;
      this.item.category.map((c) => {
        this.category.push(c.id);
      })

      this.dropdownList = this.categories;
      this.selectedItems = this.item.category;

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Marcar Todos',
        unSelectAllText: 'Desmarcar todos',
        searchPlaceholderText: 'Procurar',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    })

  }

  /**
   * When selecting an item
   *
   * @param item
   */
  onItemSelect(item: any) {
    this.category.push(item.id);
  }

  /**
   * When selecting all item
   *
   * @param items
   */
  onSelectAll(items: any) {
    this.category = [];
    items.map((item: any) => {
      this.category.push(item.id);
    });
  }

  /**
   * When uncheck all items
   *
   * @param items
   */
  onDeSelect(items: any) {
    this.category = [];
  }

  /**
   * Get Item
   *
   */
  getItem() {
    this.itemService.show(this.id).subscribe((data) => {
      this.item = data.item;
      this.f.name.setValue(this.item.name);
    });
  }


  /**
   * Send Form
   */
  onSubmit() {
    this.submitted = true;

    if (this.ItemForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.id > 0) {
      console.log({
        name: this.f.name.value,
        categories: this.category
      });
      this.itemService.put({
        name: this.f.name.value,
        categories: this.category
      }, this.id).subscribe((data) => {
        localStorage.setItem('success', 'Iten Atualizada');
        this.router.navigate(['/items']);
      }, (error) => {
        this.error = "Ocorreu um erro!";
        this.loading = false;
      });
    } else {
      this.itemService.post({
        name: this.f.name.value,
        establishment_id: localStorage.getItem('establishment_id'),
        categories: this.category
      }).subscribe((data) => {
        localStorage.setItem('success', 'Iten Cadastrada!');
        this.router.navigate(['/items']);
      }, (error) => {
        this.error = "Ocorreu um erro!";
        this.loading = false;
      });
    }
  }

  /**
   * Delete a Item
   *
   */
  delete() {
    if (this.id > 0) {
      let confirmation = confirm("Deseja realmente deletar este Iten!");

      if (confirmation) {
        this.itemService.delete(this.id).subscribe((data) => {
          localStorage.setItem('success', 'Iten Deletada');
          this.router.navigate(['/items']);
        }, (error) => {
          this.error = "Ocorreu um erro!";
          this.loading = false;
        });
      }
    }
  }

  /**
  * Create formBuilder
  *
  */
  createForm() {
    this.ItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      categories: ['', Validators.required]
    });
  }

  /**
   * Get form
   */
  get f() {
    return this.ItemForm.controls;
  }


}
