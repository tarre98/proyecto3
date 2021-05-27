import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ILibro, ILibro2 } from '../Interfaces';
import { LibroService } from '../services/Libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {

  constructor() { }
export class LibrosPage implements OnInit 
{
  userid
  Libros: (ILibro)[] = [];
  titulo
  idLibro
  editorial
  categoria
  lugarRecogida
  propietario
  tituloInput
  editorialInput
  categoriaInput
  lugarRecogidaInput
  propietarioInput
  idLibroInput
  key
  cargado=false
  visibleInput=false
  visibleMenu=true
  visibleUpdate=false

  constructor(private _toastCtrl: ToastController ,private _Libroservice: LibroService,private _activateRoute: ActivatedRoute) 
  {   
  }

  ngOnInit() 
  {
    this.userid =this._activateRoute.snapshot.paramMap.get('useridInput');
    console.log(this.userid)
    let ref = this._Libroservice.GetLibros();
    ref.once("value", snapshot => {

      snapshot.forEach(child => {
       console.log("he encontrado " + child.val().userid);
        let libro: ILibro = {
         "idLibro": child.val().idLibro,
         "categoria": child.val().categoria,
         "titulo": child.val().titulo,
         "editorial": child.val().editorial,
         "lugar_Recogida": child.val().lugar_Recogida,
         "propietario": child.val().propietario,
         "key": child.key
      }

        if ( child.val().propietario==this.userid ) 
        {
          this.Libros.push(libro)
        }

      console.log(this.Libros)

    })

  })

}

  updateBook(key)
  { 
    this.Libros.forEach(libro =>{
    if(libro.key==key)
    {
      this.titulo=libro.titulo
      this.idLibro=libro.idLibro
      this.categoria=libro.categoria
      this.editorial=libro.editorial
      this.propietario=libro.propietario
      this.lugarRecogida=libro.lugar_Recogida
      console.log( this.titulo)
    }

    })
    this.visibleMenu=false;
    this.visibleUpdate=true;

    
  
}

  deleteBook(key)
  {   
    console.log(key)

    
  }

  changeVisibilityMenuInput()
  {   


  }


}
