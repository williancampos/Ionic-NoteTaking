import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Import social sharing
import { SocialSharing } from '@ionic-native/social-sharing';

// Import picture chooser
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    angularFire: AngularFire,
    private socialSharing: SocialSharing,
    private imagePicker: ImagePicker) {
    this.notes = angularFire.database.list('/notes');
  }

  addNote() {
    let prompt = this.alertCtrl.create(
      {
        title: "Add note",
        message: "Enter the data for the new note",
        inputs: [
          {
            name: "title",
            placeholder: "Enter the title..."
          },
          {
            name: "note",
            placeholder: "Enter the note..."
          }
        ],
        buttons: [
          {
            text: "Cancel",
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: "Save",
            handler: data => {

              var note = {
                title: data.title,
                note: data.note,
                date: new Date().getTime()
              };
              this.notes.push(note);
            }
          }
        ],
        cssClass: 'danger'
      });
    prompt.present();
  }


  removeNote(noteId: string) {
    let prompt = this.alertCtrl.create(
      {
        title: "Delete note",
        message: "Do you really want do delete this note?",
        buttons: [
          {
            text: "Cancel",
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: "Delete",
            handler: data => {
              this.notes.remove(noteId);
            }
          }
        ]
      });
    prompt.present();

  }

  updateNote(noteId, noteTitle, noteContent) {
    let prompt = this.alertCtrl.create(
      {
        title: "Update note",
        message: "Update the data for the note",
        inputs: [
          {
            name: "title",
            value: noteTitle
          },
          {
            name: "note",
            value: noteContent
          }
        ],

        buttons: [
          {
            text: "Cancel",
            handler: data => {
              console.log("Cancel update");
            }
          },
          {
            text: "Save",
            handler: data => {
              this.notes.update(noteId,
                {
                  title: data.title,
                  note: data.note,
                  date: new Date().getTime()
                });
            }
          }
        ]
      });
    prompt.present();
  }

  pickImage(noteId, noteTitle, noteContent) {
    this.imagePicker.getPictures({
      maximumImagesCount: 1,
      quality: 70,
      outputType: 1
    }).then((results) => {
      if (results.length == 1) {
        let prompt = this.alertCtrl.create(
          {
            title: "Change image",
            message: "Do you really want to change the image?",
            buttons: [
              {
                text: "Cancel",
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: "Change",
                handler: data => {
                  this.notes.update(noteId,
                    {
                      image: 'data:image/jpg;base64,' + results[0],
                      date: new Date().getTime()
                    });
                }
              }
            ]
          });
        prompt.present();
      }
    }, (err) => { });
  }

  removeImage(noteId, noteTitle, noteContent) {
    let prompt = this.alertCtrl.create(
      {
        title: "Delete image",
        message: "Do you really want do delete this image?",
        buttons: [
          {
            text: "Cancel",
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: "Delete",
            handler: data => {
              this.notes.update(noteId,
                {
                  image: null,
                  date: new Date().getTime()
                });
            }
          }
        ]
      });
    prompt.present();

  }

  shareNote(noteTitle, noteContent, noteImage) {
    this.socialSharing.share(noteTitle, noteTitle, noteImage, "\n" + noteContent).then(() => {
      console.log("Note shared successfully.");
    }).catch(() => {
      console.log("It was not possible to share the note.");
    });
  }

  showDate(dateInMillis) {
    return new Date(dateInMillis);
  }

}
