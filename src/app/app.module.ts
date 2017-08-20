import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { TodoList } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddListPage } from '../pages/add-list/add-list';
import { TodoPage } from '../pages/todo/todo';

import { LoadingScreen } from '../components/loading-screen/loading-screen';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    TodoList,
    LoadingScreen,
    HomePage,
    ListPage,
    AddListPage,
    TodoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TodoList),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TodoList,
    LoadingScreen,
    HomePage,
    ListPage,
    AddListPage,
    TodoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
