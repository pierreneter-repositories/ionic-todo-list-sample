import { Component } from '@angular/core';

import { TestPage } from '../../pages/test/test';
import { HomePage } from '../../pages/home/home';

@Component({
  templateUrl: 'tabs.html'
})

export class Tabs {

  tabHome = HomePage;
  tabTest = TestPage;

  constructor() {

  }
}
