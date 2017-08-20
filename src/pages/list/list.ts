import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { AddListPage } from '../add-list/add-list';
import { HomePage } from '../home/home';
import { TodoPage } from '../todo/todo';

import { Category } from '../../types/category';

import { CategoryService } from '../../services/category';
import { TodoService } from '../../services/todo';

@Component({
  selector: '.list',
  templateUrl: 'list.html',
  providers: [CategoryService, TodoService]
})

export class ListPage {

  categories:Array<Category>;

  constructor(
    public navCtrl: NavController,
    private categoryService: CategoryService,
    private todoService: TodoService,
    public events: Events
  ) {
    this.init();
    events.subscribe('todo:add', () => {
      this.countTodos();
    });
    events.subscribe('todo:delete', () => {
      this.countTodos();
    });
  }

  init(): Promise<boolean> {
    return this.categoryService.getCategories().then((val) => {
      this.categories = val;
      this.countTodos();
      return true;
    })
  }

  countTodos() {
    this.categories.map((category) => {
      return this.todoService.count(category.id).then((val) => {
        category.count = val;
        return category;
      });
    })
  }

  addList() {
    this.navCtrl.push(AddListPage);
  }

  openList(category:Category) {
    this.navCtrl.push(TodoPage, {category: category});
  }

  deleteList(id:string) {
    this.categoryService.delete(id).then(() => {
      this.todoService.deleteByCategoryId(id).then(() => {
        this.events.publish('category:delete', Date.now());
        this.init().then(() => {
          if (!this.categories.length) {
            this.navCtrl.setRoot(
              HomePage,
              {},
              {
                animate: true,
                direction: "forward"
              }
            );
          }
        });

      })

    });
  }
}
