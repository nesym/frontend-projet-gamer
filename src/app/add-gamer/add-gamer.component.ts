import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Gamer } from '../model/gamer.model';
import { Genre } from '../model/genre.model';
import { GamerService } from '../services/gamer.service';

@Component({
  selector: 'app-add-gamer',
  imports: [FormsModule],
  templateUrl: './add-gamer.component.html'
})
export class AddGamerComponent implements OnInit {
  newGamer = new Gamer();
  genres = signal<Genre[]>([]);
  newIdGenre!: number;

  constructor(private gamerService: GamerService, private router: Router) {}

  ngOnInit(): void {
    this.gamerService.listeGenres().subscribe(cats => {
      this.genres.set(cats._embedded.genres);
    });
  }

  addGamer() {
    this.newGamer.genre = this.genres().find(g => g.idGenre === this.newIdGenre);
    this.gamerService.ajouterGamer(this.newGamer).subscribe(() => {
      this.router.navigate(['/gamers']);
    });
  }
}
