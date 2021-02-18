import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
import { Router } from "@angular/router";


=======
>>>>>>> 31a7a87a183293b7356eb69d4a3c89c87a8e704a
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

<<<<<<< HEAD
  constructor(private router: Router) { }
=======
  constructor() { }
>>>>>>> 31a7a87a183293b7356eb69d4a3c89c87a8e704a

  ngOnInit() {
  }

<<<<<<< HEAD
  navigateToHome(){
    this.router.navigate(["/home"]);  
  }

  navigateToDesc(){
    this.router.navigate(["/descripcion"]);  
  }

=======
>>>>>>> 31a7a87a183293b7356eb69d4a3c89c87a8e704a
}
