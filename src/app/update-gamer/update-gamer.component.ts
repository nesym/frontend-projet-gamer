import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Gamer } from '../model/gamer.model';
import { Genre } from '../model/genre.model';
import { GamerService } from '../services/gamer.service';

@Component({
  selector: 'app-update-gamer',
  imports: [FormsModule, RouterLink],
  templateUrl: './update-gamer.component.html'
})
export class UpdateGamerComponent implements OnInit {
  currentGamer = signal<Gamer>(new Gamer());
  genres = signal<Genre[]>([]);
  updatedIdGenre!: number;
  dateStr = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gamerService: GamerService
  ) {}

  ngOnInit(): void {
    this.gamerService.listeGenres().subscribe(cats => {
      this.genres.set(cats._embedded.genres);
    });

    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.gamerService.consulterGamer(id).subscribe(gam => {
      this.updatedIdGenre = gam.genre?.idGenre!;
      if (gam.dateInscription) {
        this.dateStr = String(gam.dateInscription).slice(0, 10);
      }
      this.currentGamer.set(gam);
    });
  }

  updateGamer() {
    const gam = this.currentGamer();
    gam.genre = this.genres().find(g => g.idGenre === this.updatedIdGenre);
    if (this.dateStr) {
      gam.dateInscription = this.dateStr;
    }
    this.gamerService.updateGamer(gam).subscribe(() => {
      this.router.navigate(['/gamers']);
    });
  }
}
