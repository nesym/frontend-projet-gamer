import { Genre } from './genre.model';

export class Gamer {
  idGamer?: number;
  pseudoGamer?: string;
  scoreGamer?: number;
  dateInscription?: string | Date;
  genre?: Genre;
}
