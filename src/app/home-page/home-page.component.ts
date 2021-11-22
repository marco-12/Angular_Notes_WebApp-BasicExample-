import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  nomeUtente: string = 'Marco';
  nuovoNome: string;

  nuovoTitolo: string;
  nuovoContenuto: string;

  arrayManzioni: any[];
  elencoNote: any;
  isOpenNote: boolean = false;
  isOpenEditNote: boolean = false;
  notaDaModificare: any;
  https: HttpClient

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.arrayManzioni = ['LAVORO', 'STUDIO', 'SVAGO', 'CIBO'];
  }

  cambiaNome() {
    this.nomeUtente = this.nuovoNome;
  }

  /* METODO PER APRIRE O CHIUDERE CREAZIONE NOTA
  writeNote() {
    this.openNote = !this.openNote;
  } */

  openNote() {
    this.isOpenNote = true;
  }

  closeNote() {
    this.isOpenNote = false;
  }

  openEditNote(nota) {
    this.notaDaModificare = {
      id: nota.id,
      title: nota.title,
      content: nota.content
    };
    this.isOpenEditNote = true;
  }

  closeEditNote() {
    this.isOpenEditNote = false;
  }

  getDatiFromBe() {
    this.http.get<any>('http://localhost:8080/notes').subscribe(response => {
        this.elencoNote = response;
    })
  }

  saveNote() {
    if(this.nuovoTitolo && this.nuovoContenuto) {
      let nota = { 
        title: this.nuovoTitolo,
        content: this.nuovoContenuto
      }
      this.http.post<any>('http://localhost:8080/notes', nota).subscribe(response => {
          this.getDatiFromBe();
      })
    }
    
  }

  editNote() {
    this.http.put<any>('http://localhost:8080/notes/'+ this.notaDaModificare.id, this.notaDaModificare).subscribe(response => {
          this.getDatiFromBe();
          this.closeEditNote();
      })
  }

  deleteNote(noteId) {
    this.http.delete<any>('http://localhost:8080/notes/'+ noteId).subscribe(response => {
        this.elencoNote.forEach((nota, index) => {
          if(nota.id == noteId) {
            this.elencoNote.splice(index,1);
            return
          }
        });
    })
  }

}
