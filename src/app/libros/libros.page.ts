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
  keyUser
  cargado=false
  visibleInput=false
  visibleMenu=true
  visibleUpdate=false
  useridFilter
  categoriaFilter
  booksMine=false
  contador: number;
  errorMessage: string;

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

  async presentToast() {
    const toast = await this._toastCtrl.create({
        message: this.errorMessage,
        duration: 3000,
        position: 'bottom'

    });
    toast.present();

}
  
  updateBook(key)
  { 
    this.visibleMenu=false;
    this.visibleUpdate=true;
    this.Libros.forEach(libro =>{
      if(libro.key==key)
      {
      this.titulo=libro.titulo
      this.idLibro=libro.idLibro
      this.categoria=libro.categoria
      this.editorial=libro.editorial
      this.propietario=libro.propietario
      this.lugarRecogida=libro.lugar_Recogida
      this.keyUser=key
      console.log( this.titulo)  
      }

    })

    
  }


  deleteBook(key)
  {   
    console.log(key)
    let ref = this._Libroservice.deleteBook(key);     
    window.location.reload(true);
  }


  changeVisibilityMenuInput()
  {   
    let libroInsert:ILibro2 ={
      "idLibro": this.Libros.length+1,
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
    this.contador++
  }
 
  changeVisibilityMenuUpdate(){   
    
    if(this.tituloInput == null || this.categoriaInput == null || this.editorialInput == null || this.propietarioInput == null || this.lugarRecogidaInput == null )
    {
      this.errorMessage = "debes introducir todos los campos"
      this.presentToast();
    }else
      {
    console.log(this.keyUser)
    
    let libroInsert:ILibro2 =
    {
      "idLibro": this.Libros.length+1,
      "titulo": this.tituloInput,
      "categoria": this.categoriaInput,
      "editorial": this.editorialInput,
      "propietario": this.propietarioInput,
      "lugar_Recogida":this.lugarRecogidaInput,
    }

  this.visibleInput=false;
  this.visibleMenu=true;
  this.visibleUpdate=false;
    let ref2 = this._Libroservice.deleteBook(this.keyUser);
    let ref1 = this._Libroservice.setLibro(libroInsert);  
    location.reload();

    this.contador++

    }

  }

  myBooks()
  {
    this.booksMine =true
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


  allBooks()
  {
    this.booksMine = false;
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


  userIDfilter()
  {
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


  categoryFilter()
  {
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
