import { Component } from '@angular/core';
import { Bolsos } from '../bolsos';
//importamos el archivo de la base de datos que nos había creado anteriormente
import { FirestoreService } from '../firestore.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Variable de tipo bolso.
  bolsosEditando: Bolsos;

  //Variable de tipo array que recoge los registros de bolsos desde la base de datos
  arrayColeccionBolsos: any = [{
    id: "",
    data: {} as Bolsos
   }];

  //Variable para guardar el id del bolso seleccionado
  idBolsoSelec: string;

  //Variable para saber si modificamos un bolso o lo añadimos nuevo
  tipo: string;

  constructor(private firestoreService: FirestoreService, private router: Router) {
        // Crear un bolso vacío al empezar
        this.bolsosEditando = {} as Bolsos;
        //Obtener registros llamando a la función
        this.obtenerListaBolsos();
  }


  clicBotonInsertar() {
      this.tipo = 'insertar';
    //en el caso de insertar, no hemos seleccionado bolso y el id que pasamos debe estar vacío
    this.idBolsoSelec = '';

    this.navigateToVerArticulo();
  }

  obtenerListaBolsos(){
    this.firestoreService.consultar("bolsos").subscribe((resultadoConsultaBolsos) => {
      this.arrayColeccionBolsos = [];
      //Va añadiendo registros al final del array con el bucle
      resultadoConsultaBolsos.forEach((datosBolsos: any) => {
        this.arrayColeccionBolsos.push({
          id: datosBolsos.payload.doc.id,
          data: datosBolsos.payload.doc.data()
        });
      })
    });
  }

  //Función para saber qué bolso está seleccionado, le pasamos el bolso por parámetro
  selecBolso(BolsoSelec) {
    console.log("Bolso seleccionado: ");
    console.log(BolsoSelec);
    this.idBolsoSelec = BolsoSelec.id;//Guarda el id en la variable
    /*Guarda los campos de ese bolso en la variable de tipo bolso 
    y actualiza los valores de los input en html*/
    this.bolsosEditando.Referencia = BolsoSelec.data.Referencia;
    this.bolsosEditando.Nombre = BolsoSelec.data.Nombre;
    this.bolsosEditando.Categoria = BolsoSelec.data.Categoria;
    this.bolsosEditando.Color = BolsoSelec.data.Color;
    this.bolsosEditando.Herrajes = BolsoSelec.data.Herrajes;
    this.bolsosEditando.Imagen = BolsoSelec.data.Imagen;
    this.bolsosEditando.Piel = BolsoSelec.data.Piel;
    this.bolsosEditando.FechaDiseno = BolsoSelec.data.FechaDiseno;
    this.bolsosEditando.Precio = BolsoSelec.data.Precio;

    this.tipo = 'modificar';

    this.navigateToVerArticulo();
  }


  navigateToVerArticulo() {
    this.router.navigate(["/ver-articulo", this.idBolsoSelec, this.tipo]);      
  }


}
