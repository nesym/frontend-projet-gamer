import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gamer } from '../model/gamer.model';
import { Genre } from '../model/genre.model';
import { GamerService } from '../services/gamer.service';

@Component({
  selector: 'app-recherche-par-genre',
  imports: [FormsModule, DatePipe],
  templateUrl: './recherche-par-genre.component.html'
})
export class RechercheParGenreComponent implements OnInit {
  gamers = signal<Gamer[]>([]);
  genres = signal<Genre[]>([]);
  idGenre = 0;

  constructor(private gamerService: GamerService) {}

  ngOnInit(): void {
    this.gamerService.listeGenres().subscribe(cats => {
      this.genres.set(cats._embedded.genres);
    });
    this.gamerService.listeGamers().subscribe(gams => {
      this.gamers.set(gams);
    });
  }

  onChange(id: number) {
    this.idGenre = id;
    if (id === 0) {
      this.gamerService.listeGamers().subscribe(gams => this.gamers.set(gams));
    } else {
      this.gamerService.rechercherParGenre(id).subscribe(gams => this.gamers.set(gams));
    }
  }
}
