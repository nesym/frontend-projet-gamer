import { Component, OnInit, signal } from '@angular/core';
import { Genre } from '../model/genre.model';
import { GamerService } from '../services/gamer.service';
import { UpdateGenreComponent } from '../update-genre/update-genre.component';

@Component({
  selector: 'app-liste-genres',
  imports: [UpdateGenreComponent],
  templateUrl: './liste-genres.component.html',
  styleUrl: './liste-genres.component.css'
})
export class ListeGenresComponent implements OnInit {
  genres = signal<Genre[]>([]);
  updatedGenre = signal<Genre>({ idGenre: 0, nomGenre: '' });
  ajout = signal<boolean>(true);

  constructor(private gamerService: GamerService) {}

  ngOnInit(): void {
    this.chargerGenres();
  }

  chargerGenres() {
    this.gamerService.listeGenres().subscribe(cats => {
      this.genres.set(cats._embedded.genres);
    });
  }

  updateGenre(gen: Genre) {
    this.updatedGenre.set({ ...gen });
    this.ajout.set(false);
  }

  genreUpdated(gen: Genre) {
    console.log('Genre updated event', gen);
    const appel = this.ajout()
      ? this.gamerService.ajouterGenre(gen)
      : this.gamerService.updateGenre(gen);

    appel.subscribe(() => {
      this.chargerGenres();
      this.updatedGenre.set({ idGenre: 0, nomGenre: '' });
      this.ajout.set(true);
    });
  }
}
