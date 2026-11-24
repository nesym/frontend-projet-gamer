import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gamer } from '../model/gamer.model';
import { Genre } from '../model/genre.model';
import { GenreWrapper } from '../model/genre-wrapper.model';

@Injectable({
  providedIn: 'root'
})
export class GamerService {
  // Si le backend tourne sur un autre port (ex : 8090), changez 8080 ici
  apiURL: string = 'http://localhost:8080/gamers/api';
  apiURLGenre: string = 'http://localhost:8080/gamers/genres';      // Spring Data REST
  apiURLGenreEdit: string = 'http://localhost:8080/gamers/api/genres';

  constructor(private http: HttpClient) {}

  // ---------- Gamers ----------
  listeGamers(): Observable<Gamer[]> {
    return this.http.get<Gamer[]>(this.apiURL);
  }

  consulterGamer(id: number): Observable<Gamer> {
    return this.http.get<Gamer>(this.apiURL + '/' + id);
  }

  ajouterGamer(gam: Gamer): Observable<Gamer> {
    return this.http.post<Gamer>(this.apiURL, gam);
  }

  updateGamer(gam: Gamer): Observable<Gamer> {
    return this.http.put<Gamer>(this.apiURL, gam);
  }

  supprimerGamer(id: number): Observable<void> {
    return this.http.delete<void>(this.apiURL + '/' + id);
  }

  rechercherParGenre(idGenre: number): Observable<Gamer[]> {
    return this.http.get<Gamer[]>(this.apiURL + '/gen/' + idGenre);
  }

  // ---------- Genres ----------
  listeGenres(): Observable<GenreWrapper> {
    return this.http.get<GenreWrapper>(this.apiURLGenre);
  }

  ajouterGenre(gen: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiURLGenreEdit, { nomGenre: gen.nomGenre });
  }

  updateGenre(gen: Genre): Observable<Genre> {
    return this.http.put<Genre>(this.apiURLGenreEdit, gen);
  }
}
