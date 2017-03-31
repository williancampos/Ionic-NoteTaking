import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Import social sharing
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: FirebaseListObservable<any[]>;
  bla: Date;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    angularFire: AngularFire,
    private socialSharing: SocialSharing) {
    this.notes = angularFire.database.list('/notes');
    this.bla = new Date();
  }

  showOptions(noteId, noteTitle, noteContent, noteDate) {
    let actionSheet = this.actionSheetCtrl.create(
      {
        title: "What do you want to do?",
        buttons: [
          {
            text: "Share",
            handler: () => {
              this.shareNote(noteTitle, noteContent);
            }
          },
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              this.removeNote(noteId);
            }
          },
          {
            text: "Update",
            handler: () => {
              this.updateNote(noteId, noteTitle, noteContent);
            }
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          }
        ]
      }
    )
    actionSheet.present();
  }

  addNote() {
    let prompt = this.alertCtrl.create(
      {
        title: "New Note",
        message: "Enter the text for the new note",
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
        ]
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
        title: "Update text",
        message: "Update text for the note",
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

  shareNote(noteTitle, noteContent) {
    this.socialSharing.share(noteTitle, noteTitle, null, "\n" + noteContent).then(() => {
      console.log("Note shared successfully.");
    }).catch(() => {
      console.log("It was not possible to share the note.");
    });
  }

  showDate(dateInMillis) {
    return new Date(dateInMillis);
  }

}
