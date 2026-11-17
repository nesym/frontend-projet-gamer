import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-genre',
  imports: [FormsModule],
  templateUrl: './update-genre.component.html',
  styleUrl: './update-genre.component.css'
})
export class UpdateGenreComponent implements OnInit {
  @Input()
  genre!: Genre;

  @Input()
  ajout!: boolean;

  @Output()
  genreUpdated = new EventEmitter<Genre>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateGenre', this.genre);
  }

  saveGenre() {
    this.genreUpdated.emit(this.genre);
  }
}