import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddListPage } from '../add-list/add-list';

@Component({
  selector: '.page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public navCtrl: NavController) {

  }
  addList() {
    this.navCtrl.push(AddListPage);
  }
}
