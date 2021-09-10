import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../services';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})

/**
 * Class CreateCategoriesComponent
 *
 * @author Jônatas Ramos
 */
export class CreateCategoriesComponent implements OnInit {
  public loading: boolean = false;
  public error: any = null;
  public submitted = false;
  public id: any = null;
  public title: string = '';
  public category: any = {
    name: ''
  };
  public CategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe((p: any) => {
      if (p.id != null && p.id != 0) {
        this.id = p.id;
        this.getCategory();
      }

      this.title = this.id ? 'Editar Categoria' : 'Nova Categoria';
    });
  }

  /**
   * Get Category
   *
   */
  getCategory() {
    this.categoriesService.show(this.id).subscribe(data => this.category =  data.category);
  }


  /**
   * Send Form
   */
  onSubmit() {
    this.submitted = true;

    if (this.CategoryForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.id > 0) {
      this.categoriesService.put({
        name: this.f.name.value,
      }, this.id).subscribe((data) => {
        localStorage.setItem('success', 'Categoria Atualizada');
        this.router.navigate(['/categories']);
      }, (error) => {
        this.error = "Ocorreu um erro!";
        this.loading = false;
      });
    } else {
      this.categoriesService.post({
        name: this.f.name.value,
        establishment_id: localStorage.getItem('establishment_id')
      }).subscribe((data) => {
        localStorage.setItem('success', 'Categoria Cadastrada!');
        this.router.navigate(['/categories']);
      }, (error) => {
        this.error = "Ocorreu um erro!";
        this.loading = false;
      });
    }
  }

  /**
   * Delete a category
   *
   */
  delete() {
    if (this.id > 0) {
      let confirmation = confirm("Deseja realmente deletar esta categoria!");

      if (confirmation) {
        this.categoriesService.delete(this.id).subscribe((data) => {
          localStorage.setItem('success', 'Categoria Deletada');
          this.router.navigate(['/categories']);
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
    this.CategoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  /**
   * Get form
   */
  get f() {
    return this.CategoryForm.controls;
  }

}
