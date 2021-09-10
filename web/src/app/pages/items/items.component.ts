import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../services'
import * as moment from 'moment';
declare var $;

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

/**
 * Class ItemComponent
 *
 * @author Jônatas Ramos
 */
export class ItemsComponent implements OnInit {
  @ViewChild('dataTable', { static: true }) table;
  public dataTable: any;
  public items: any = [];
  public message_success: any = '';
  public establishment_id: any = null;
  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.message_success = localStorage.getItem('success');
    this.establishment_id = localStorage.getItem('establishment_id');
    localStorage.removeItem('success');
    this.getItems();
  }

  /**
   * Get items
   *
   */
   getItems() {
    this.itemService.get(this.establishment_id).subscribe((data: any) => {

      if (data.item) {
        data.item.map((i: any) => {
          i.created_at = moment(i.created_at).format('DD/MM/YYYY');
          i.action = `<a href="/items/${i.id}" class="btn btn-info"><i class="fa fa-pencil"></i> Editar</a>`
          i.category = i.category.map((c: any) => {
            c.name = `<span class="badge badge-primary">${c.name}</span> `
            return c.name;
          }).join('');

        });

        this.items = data.item;
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
      "data": this.items,
      "columns": [
        { "data": 'id' },
        { "data": 'name' },
        { "data": 'created_at' },
        { "data": 'category' },
        { "data": 'action' },
      ],

    });
  }

}
