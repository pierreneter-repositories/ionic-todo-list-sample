import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { ListPage } from '../list/list';

import { CategoryService } from '../../services/category';

@Component({
  selector: '.add-list',
  templateUrl: 'add-list.html',
  providers: [CategoryService]
})

export class AddListPage {
  name:string;

  constructor(
    public navCtrl: NavController,
    private categoryService: CategoryService,
    public events: Events
  ) {

  }

  add() {
    this.categoryService.add(this.name).then(() => {
      this.events.publish('category:add', Date.now());
      this.navCtrl.setRoot(ListPage);
    });
  }
}
