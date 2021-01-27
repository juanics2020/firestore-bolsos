import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";


@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.page.html',
  styleUrls: ['./descripcion.page.scss'],
})
export class DescripcionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  navigateToMap(){
    this.router.navigate(["/mapa"]);  
  }

  navigateToHome(){
    this.router.navigate(["/home"]);  
  }

}
