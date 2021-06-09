import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ILibro, ILibro2 } from '../Interfaces';
import { LibroService } from '../services/Libros.service';


@Component(
  {
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  })


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
  useridFilter
  categoriaFilter

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

          this.Libros.push(libro)
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

    let libroInsert:ILibro2 ={
      "idLibro": this.idLibroInput,
      "titulo": this.tituloInput,
      "categoria": this.categoriaInput,
      "editorial": this.editorialInput,
      "propietario": this.propietarioInput,
      "lugar_Recogida":this.lugarRecogidaInput,
    }

    console.log("he entrado")
    let ref = this._Libroservice.deleteBook(key);
    let ref1 = this._Libroservice.setLibro(libroInsert);
    
  }


  deleteBook(key)
  {   
    console.log(key)
    let ref = this._Libroservice.deleteBook(key);     
  }


  changeVisibilityMenuInput()
  {   
    let libroInsert:ILibro2 ={
      "idLibro": this.idLibroInput,
      "titulo": this.tituloInput,
      "categoria": this.categoriaInput,
      "editorial": this.editorialInput,
      "propietario": this.propietarioInput,
      "lugar_Recogida":this.lugarRecogidaInput,
    }

    this.visibleInput=true;
    this.visibleMenu=false;
    let ref = this._Libroservice.setLibro(libroInsert);

    if(this.visibleMenu==false)
    {
      this.visibleInput=false;
      this.visibleMenu=true;
      location.reload();
    }
      
  }
 
  myBooks(){
    this.Libros = []
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
        if(child.val().propietario==this.userid){
          this.Libros.push(libro)

        }
        console.log(this.Libros)
      })

    })
  }
  allBooks(){
    this.Libros = []
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
          this.Libros.push(libro)


        console.log(this.Libros)
      })

    })
  }
  userIDfilter(){
    this.Libros = []
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
        if(child.val().propietario==this.useridFilter){
          this.Libros.push(libro)

        }
        console.log(this.Libros)
      })

    })

  }
  categoryFilter(){
    this.Libros = []
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
        if(child.val().categoria==this.categoriaFilter){
          this.Libros.push(libro)

        }
        console.log(this.Libros)
      })

    })
  }
}
