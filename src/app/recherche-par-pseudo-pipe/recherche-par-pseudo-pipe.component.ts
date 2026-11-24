import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gamer } from '../model/gamer.model';
import { GamerService } from '../services/gamer.service';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-recherche-par-pseudo-pipe',
  imports: [FormsModule, DatePipe, SearchFilterPipe],
  templateUrl: './recherche-par-pseudo-pipe.component.html'
})
export class RechercheParPseudoPipeComponent implements OnInit {
  gamers = signal<Gamer[]>([]);
  searchTerm = '';

  constructor(private gamerService: GamerService) {}

  ngOnInit(): void {
    this.gamerService.listeGamers().subscribe(gams => {
      this.gamers.set(gams);
    });
  }
}
