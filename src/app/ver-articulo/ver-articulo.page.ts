import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Bolsos } from '../bolsos';
import { FirestoreService } from '../firestore.service';

import { Router } from "@angular/router";

//Importamos el controlador de alertas de ionic
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


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

  constructor(private activatedRoute: ActivatedRoute,
     private firestoreService: FirestoreService, private router: Router,
      private alertCtrl: AlertController,
      private loadingController: LoadingController,
      private toastController: ToastController,
      private imagePicker: ImagePicker) {}

  ngOnInit() {
    //Recoge el id y el tipo de acción que realizamos
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.tipo = this.activatedRoute.snapshot.paramMap.get("tipo");

    //Sólo se cargarán los datos del bolso si se está modificando un bolso seleccionado(variable tipo se recibe del home)
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
    //Cuando creemos el artículo volvemos a home
    this.router.navigate(["/home"]); 
  }
 


  clicBotonBorrar() {
    //Sólo se borrará el registro si el usuario lo confirma desde la alerta
    this.alertCtrl.create({
      header: 'Atención',
      subHeader: 'Eliminar Bolso',
      message: '¿Está seguro que desea eliminar el bolso?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log("Cancelado");
          },
        },
        {
          text: 'SÍ',
          handler: () => {
            //YA QUE EL USUARIO HA CONFIRMADO, BORRAMOS EL BOLSO
            this.deleteFile(this.document.data.Imagen);
            this.firestoreService.borrar("bolsos", this.id).then(() => {
              // Limpiar datos de pantalla
              this.document.data = {} as Bolsos;

              //Cuando eliminemos el artículo volvemos a home
              this.router.navigate(["/home"]); 
            })            
          },
        }
      ]
    }).then(res => {
      res.present();
    });

  }


  async uploadImagePicker(){
    //Mensaje de espera mientras se sube la imagen
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });

    //Mensaje de finalización de subida de la imagen
    const toast = await this.toastController.create({
      message: 'Image was updated successfully',
      duration: 3000
    });

    //Comprobar si la aplicación tiene permisos de lectura
    this.imagePicker.hasReadPermission().then(
      (result) => {
        //Si no tiene permiso de lectura se solicita al usuario
        if(result == false){
          this.imagePicker.requestReadPermission();
        }else{
          //Abrir selector de imágenes (ImagePicker)
          this.imagePicker.getPictures({
            maximumImagesCount: 1, //Permitir sólo 1 imagen
            outputType: 1 //1 =Base64
          }).then(
            (results) => { //En la variable results se tienen las imágenes seleccionadas

              //Carpeta del Storage donde se almacenará la imagen
              let nombreCarpeta = "imagenes";
              //Recorrer todas las imágenes que haya seleccionado el usuario
              //aunque realmente sólo será 1 como se ha indicado en las opciones
              for(var i = 0; i < results.length; i++){
                //Mostrar el mensaje de espera
                loading.present();
                //Asignar el nombre de la imiagen en función de la hora actual para evitar duplicidades de nombres
                let nombreImagen = `${new Date().getTime()}`;
                //LLamar al método que sube la imagen al Storage
                this.firestoreService.uploadImage(nombreCarpeta, nombreImagen,results[i])
                  .then(snapshot => {
                    snapshot.ref.getDownloadURL()
                      .then(downloadURL => {
                        //En la variable downloadURL se tiene la dirección de descarga de la imagen
                        console.log("downloadURL:"+downloadURL);

//------------------->GUARDAR downloadURL en this.document.data.Imagen
                        this.document.data.Imagen = downloadURL;

                        //Mostrar el mensaje de finalización de la subida
                        toast.present();
                        //Ocultar mensaje de espera
                        loading.dismiss();
                      })
                  })
                }
              },
              (err) => {
                console.log(err)
              });
          }
        }
      )
    }

    async deleteFile(fileURL){
      const toast = await this.toastController.create({
        message: 'File was deleted successfully',
        duration: 3000
      });
      this.firestoreService.deleteFileFromURL(fileURL)
        .then(() => {
          toast.present();
        }, (err) => {
          console.log(err);
        });
    }



  //Alerta tipo Sencilla (un sólo botón)
  //  showAlert() {
  //   this.alertCtrl.create({
  //     header: 'Atención',
  //     subHeader: 'Ver Bolsos',
  //     message: 'Debe seleccionar un bolso antes de pulsar el botón',
  //     buttons: ['OK']
  //   }).then(res => {

  //     res.present();

  //   });

  // }

}
