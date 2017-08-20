import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Todo } from '../../types/todo';
import { Category } from '../../types/category';

import { TodoService } from '../../services/todo';

@Component({
  selector: '.todo',
  templateUrl: 'todo.html',
  providers: [TodoService]
})

export class TodoPage {

  todos:Array<Todo>;
  category:Category;
  title:string;
  categoryCount:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private todoService: TodoService,
    public events: Events
  ) {
    this.category = navParams.get('category');
    this.categoryCount = navParams.get('count');
    this.init();
  }

  init() {
    this.todoService.getTodosByCategoryId(this.category.id).then((todos) => {
      this.todos = todos;
    });
  }

  add() {
    this.todoService.add(this.title, this.category.id).then(() => {
      this.title = '';
      this.init();
      this.events.publish('todo:add', Date.now());
    });
  }

  delete(id:string) {
    this.todoService.delete(id).then(() => {
      this.init();
      this.events.publish('todo:delete', Date.now());
    });
  }

  change(id:string) {
    this.todoService.change(id). then(() => {
      this.init();
    })
  }
}
