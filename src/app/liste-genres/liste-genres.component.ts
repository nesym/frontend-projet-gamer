import { Component } from '@angular/core';
import { Genre } from '../model/genre.model';
import { GamerService } from '../services/gamer.service';
import { UpdateGenreComponent } from '../update-genre/update-genre.component';

@Component({
  selector: 'app-liste-genres',
  imports: [UpdateGenreComponent],
  templateUrl: './liste-genres.component.html',
  styleUrl: './liste-genres.component.css'
})
export class ListeGenresComponent {
  genres: Genre[];
  updatedGenre: Genre = { idGenre: 0, nomGenre: '' };
  ajout: boolean = true;

  constructor(private gamerService: GamerService) {
    this.genres = gamerService.listeGenres();
  }

  chargerGenres() {
    this.genres = this.gamerService.listeGenres();
  }

  updateGenre(gen: Genre) {
    this.updatedGenre = { ...gen };
    this.ajout = false;
  }

  genreUpdated(gen: Genre) {
    console.log('Genre updated event', gen);
    if (this.ajout) {
      this.gamerService.ajouterGenre(gen);
    } else {
      this.gamerService.updateGenre(gen);
    }
    this.chargerGenres();
    this.updatedGenre = { idGenre: 0, nomGenre: '' };
    this.ajout = true;
  }
}