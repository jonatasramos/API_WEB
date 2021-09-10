import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public routes = [
    { 'url': '/items', 'name': 'Itens', 'icon': 'fa fa-clipboard' },
    { 'url': '/categories', 'name': 'Categorias', 'icon': 'fa fa-tags' }
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
