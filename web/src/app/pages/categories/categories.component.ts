import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../../services'
import * as moment from 'moment';
declare var $;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
/**
 * Class CategoriesComponent
 *
 * @author Jônatas Ramos
 */
export class CategoriesComponent implements OnInit {
  @ViewChild('dataTable', { static: true }) table;
  public dataTable: any;
  public categories: any = [];
  public message_success: any = '';
  public establishment_id: any = null;
  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.message_success = localStorage.getItem('success');
    this.establishment_id = localStorage.getItem('establishment_id');
    localStorage.removeItem('success');
    this.getCategories();
  }

  /**
   * Get Categories
   *
   */
  getCategories() {
    this.categoriesService.get(this.establishment_id).subscribe((data: any) => {
      if (data.category) {
        data.category.map((c) => {
          c.created_at = moment(c.created_at).format('DD/MM/YYYY');
          c.action = `<a href="/categories/${c.id}" class="btn btn-info"><i class="fa fa-pencil"></i> Editar</a>`
        });
        this.categories = data.category;
      }
      this.dataTables();
    })
  }

  /**
   * Generate DataTable
   */
  dataTables() {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"
      },
      "data": this.categories,
      "columns": [
        { "data": 'id' },
        { "data": 'name' },
        { "data": 'created_at' },
        { "data": 'action' },
      ],

    });
  }

}
