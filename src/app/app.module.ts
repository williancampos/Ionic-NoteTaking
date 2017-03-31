import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { SocialSharing } from '@ionic-native/social-sharing'
import { ImagePicker } from '@ionic-native/image-picker'
 
export const firebaseConfig = {
  apiKey: "AIzaSyA-Sl-u5KXyIJHg9OBlWuVDhY5SlY0iSZM",
  authDomain: "notetaking-17a3c.firebaseapp.com",
  databaseURL: "https://notetaking-17a3c.firebaseio.com",
  storageBucket: "notetaking-17a3c.appspot.com",
  messagingSenderId: "422103893138"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SocialSharing, ImagePicker]
})
export class AppModule {}
