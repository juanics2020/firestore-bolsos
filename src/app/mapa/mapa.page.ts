import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToHome(){
    this.router.navigate(["/home"]);  
  }

  navigateToDesc(){
    this.router.navigate(["/descripcion"]);  
  }

}
