import { Component } from '@angular/core';
import { CalendarComponent } from '../../projects/shared/src/lib/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService, FlightPage } from './services/flight.service';
import { Flight } from './models/flight.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarComponent,MatTableModule,MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private flightService: FlightService) {}

  selectedDate: string | null = null;
  departureCity: string = '';
  arrivalCity: string = '';
  departureDate: string | null = null;
  arrivalDate: string | null = null;
  sortBy: 'prix' | 'tempsTrajet' = 'prix';

  flights: Flight[] = [];
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pageSize = 5;
  displayedColumns: string[] = ['villeDepart', 'villeArrivee', 'dateDepart', 'dateArrivee', 'prix', 'tempsTrajet','capacite','placesRestantes','action'];

  onDateSelected(date: string): void {
    this.selectedDate = date;
    console.log('Date sélectionnée dans le parent :', this.selectedDate);
  }

  searchFlights(page: number = 0): void {
    const searchParams = {
      villeDepart: this.departureCity,
      villeArrivee: this.arrivalCity,
      dateDepart: this.departureDate || undefined,
      dateArrivee: this.arrivalDate || undefined,
      page: page,
      size: this.pageSize,
      sort: this.sortBy ? `${this.sortBy},asc` : undefined
    };

    this.flightService.getFlights(searchParams).subscribe({
      next: (response: FlightPage) => {
        this.flights = response.content;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItems;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des vols :", err);
        this.flights = [];
      }
    });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }

  // 🔹 Gestion pagination
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.searchFlights(page);
    }
  }

  reserveFlight(flight: Flight): void {
  const nom = prompt("Entrez votre nom:");
  const email = prompt("Entrez votre email:");
  const nombrePlacesStr = prompt("Combien de places voulez-vous réserver?", "1");

  if (!nom || !email || !nombrePlacesStr) return;

  const nombrePlaces = parseInt(nombrePlacesStr, 10);

  this.flightService.reserveFlight(flight.id, nom, email, nombrePlaces).subscribe({
    next: (res) => {
      alert("Booking done !");
      this.searchFlights(this.currentPage); // Refresh flights
    },
    error: (err) => {
      console.error("Erreur de réservation :", err);
      alert("Booking is declined : " + (err.error?.message || "Erreur inconnue"));
    }
  });
}

}
