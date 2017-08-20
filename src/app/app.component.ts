import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoadingScreen } from '../components/loading-screen/loading-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TodoPage } from '../pages/todo/todo';
import { AddListPage } from '../pages/add-list/add-list';

import { Category } from '../types/category';

import { CategoryService } from '../services/category';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html',
  providers: [CategoryService]
})

export class TodoList {

  rootPage:any = LoadingScreen;

  @ViewChild(Nav) nav: Nav;
  categories:Array<Category>;
  _categoryService:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    categoryService: CategoryService,
    public events: Events
  ) {
    this._categoryService = categoryService;
    events.subscribe('category:add', () => {
      this.init();
    });
    events.subscribe('category:delete', () => {
      this.init();
    });
    setTimeout(() => {
      this.init();
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
        categoryService.getCategories().then((val:any) => {
          this.categories = val;
          if (this.categories.length) {
            this.rootPage = ListPage;
          } else {
            this.rootPage = HomePage;
          }
        });
      });
    },  700);
  }

  openList(category:Category) {
    this.nav.push(TodoPage, {category: category});
  }

  addList() {
    this.nav.push(AddListPage);
  }

  init() {
    this._categoryService.getCategories().then((val) => {
      this.categories = val;
    });
  }
}
