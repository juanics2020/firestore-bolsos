import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Bolsos } from '../bolsos';
import { FirestoreService } from '../firestore.service';

import { Router } from "@angular/router";

@Component({
  selector: 'app-ver-articulo',
  templateUrl: './ver-articulo.page.html',
  styleUrls: ['./ver-articulo.page.scss'],
})
export class VerArticuloPage implements OnInit {

  id = null;
  //Si es insertar o modificar
  tipo = null;

  document: any = {
    id: "",
    data: {} as Bolsos
  };


  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService, private router: Router) {}

  ngOnInit() {
    //Recoge el id y el tipo de acción que realizamos
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.tipo = this.activatedRoute.snapshot.paramMap.get("tipo");

    if(this.tipo == 'modificar'){
      this.firestoreService.consultarPorId("bolsos", this.id).subscribe((resultado) => {
        // Preguntar si se hay encontrado un document con ese ID
        if(resultado.payload.data() != null) {
          this.document.id = resultado.payload.id
          this.document.data = resultado.payload.data();
          // Como ejemplo, mostrar la Referencia del bolso en consola
          console.log(this.document.data.Referencia);
        } else {
          // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
          this.document.data = {} as Bolsos;
        } 
      });
    }
  }

  clicBotonBorrar() {
    //Borramos el bolso
    this.firestoreService.borrar("bolsos", this.id).then(() => {
      // Limpiar datos de pantalla
      this.document.data = {} as Bolsos;
      //Cuando eliminemos el artículo volvemos a home
      this.router.navigate(["/home"]); 
    })
  }

  clicBotonModificar() {
    //Modificamos el bolso seleccionado
    this.firestoreService.actualizar("bolsos", this.id, this.document.data).then(() => {
      // Limpiar datos de pantalla
      this.document.data = {} as Bolsos;
    })
  }

  clicBotonInsertar() {
    //Inserta un objeto de tipo bolso en la base de datos, llamando al método insertar (en el archivo firestore.service.ts)
    this.firestoreService.insertar("bolsos", this.document.data).then(() => {
      console.log('Bolso creado correctamente!');
      //Limpiamos el contenido del bolso que se estaba editando en el navegador
      this.document.data= {} as Bolsos;
    }, (error) => {
      console.error(error);//Si da error
    });
    //Cuando eliminemos el artículo volvemos a home
    this.router.navigate(["/home"]); 
  }
 

}
