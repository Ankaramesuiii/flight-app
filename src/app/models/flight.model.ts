export interface Flight {
  id: string;
  dateDepart: string;
  dateArrivee: string;
  villeDepart: string;
  villeArrivee: string;
  prix: number;
  tempsTrajet: number;
  capacite: number;
  placesRestantes: number;
}