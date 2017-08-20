import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import uuid from 'uuid';

import { Todo } from '../types/todo';

@Injectable()
export class TodoService {
  private todos:Array<Todo>;
  constructor(private storage: Storage) {
    this.getTodos().then((val:Array<Todo>) => {
      this.todos = val;
    });
  }

  init() {
    this.storage.set('todos', []);
    this.todos = [];
  }

  getTodos(): Promise<Array<Todo>> {
    return this.storage.get('todos').then((val:Array<Todo>) => {
      if (val && val.length) {
        this.todos = val;
      } else {
        this.init();
      }
      return this.todos;
    }).catch((empty) => {
      this.init();
      return this.todos;
    });
  }

  getTodosByCategoryId(categoryId:string): Promise<Array<Todo>> {
    return this.getTodos().then((val) => {
      return val.filter((todo) => {
        return todo.categoryId === categoryId;
      });
    });
  }

  cleartodos() {
    this.init();
  }

  count(categoryId:string, active:boolean = false): Promise<number> {
    return this.getTodosByCategoryId(categoryId).then((todos) => {
      if (active) return todos.filter((todo) => {
        return todo.checked;
      }).length;
      return todos.length;
    });
  }

  add(title:string, categoryId:string): Promise<boolean> {
    this.todos.push({
      id: uuid.v1(),
      categoryId: categoryId,
      title: title,
      createdAt: Date.now(),
      checked: false
    });
    return this.storage.set('todos', this.todos).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }

  deleteByCategoryId(categoryId:string): Promise<boolean> {
    this.todos = this.todos.filter((todo) => {
      return todo.categoryId !== categoryId;
    });
    return this.storage.set('todos', this.todos).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }

  delete(id:string): Promise<boolean> {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    });
    return this.storage.set('todos', this.todos).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }

  change(id:string):Promise<boolean> {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) todo.checked != todo.checked;
      return todo;
    });
    return this.storage.set('todos', this.todos).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }
}
