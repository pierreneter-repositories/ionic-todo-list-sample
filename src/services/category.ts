import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import uuid from 'uuid';

import { Category } from '../types/category';

@Injectable()
export class CategoryService {
  private categories:Array<Category>;
  constructor(
    private storage: Storage
  ) {
    this.getCategories().then((val:Array<Category>) => {
      this.categories = val;
    });
  }

  init() {
    this.storage.set('categories', []);
    this.categories = [];
  }

  getCategories(): Promise<Array<Category>> {
    return this.storage.get('categories').then((val:Array<Category>) => {
      if (val && val.length) {
        this.categories = val;
      } else {
        this.init();
      }
      return this.categories;
    }).catch((empty) => {
      this.init();
      return this.categories;
    });
  }

  clearCategories() {
    this.init();
  }

  add(name:string): Promise<boolean> {
    this.categories.push({
      id: uuid.v1(),
      name: name,
      createdAt: Date.now(),
      count: 0
    });
    return this.storage.set('categories', this.categories).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }

  delete(id:string): Promise<boolean> {
    this.categories = this.categories.filter((category) => {
      return category.id !== id;
    });
    return this.storage.set('categories', this.categories).then(() => {
      return true;
    }).catch(() => {
      return false;
    });
  }
}
