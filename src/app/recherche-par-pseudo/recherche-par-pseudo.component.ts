import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gamer } from '../model/gamer.model';
import { GamerService } from '../services/gamer.service';

@Component({
  selector: 'app-recherche-par-pseudo',
  imports: [FormsModule, DatePipe],
  templateUrl: './recherche-par-pseudo.component.html'
})
export class RechercheParPseudoComponent implements OnInit {
  allGamers: Gamer[] = [];
  gamers = signal<Gamer[]>([]);

  constructor(private gamerService: GamerService) {}

  ngOnInit(): void {
    this.gamerService.listeGamers().subscribe(gams => {
      this.allGamers = gams;
      this.gamers.set(gams);
    });
  }

  onKeyUp(filterText: string) {
    this.gamers.set(
      this.allGamers.filter(item =>
        item.pseudoGamer?.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }
}
