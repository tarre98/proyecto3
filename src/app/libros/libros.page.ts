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

  //declaramos variables

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

  //declaramos toast & declaramos ruta
  constructor(private _toastCtrl: ToastController ,private _Libroservice: LibroService,private _activateRoute: ActivatedRoute) 
  {
  }


  ngOnInit() 
  {
    //en tu userid almacenas lo que te viene por la url(la ruta declarada en el cosntructor y la app-routing.module.ts)
    this.userid =this._activateRoute.snapshot.paramMap.get('useridInput');
    console.log(this.userid)
    //recogemos todos los libros, y lo almacenamos en la array (uno a uno)
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
          // id autogenerada x firebse
          "key": child.key
        }
          //lo cargamos en la variable
          this.Libros.push(libro)
          console.log(this.Libros)

      })

    })

  }
  //toast
  async presentToast() {
    const toast = await this._toastCtrl.create({
        message: this.errorMessage,
        duration: 3000,
        position: 'bottom'

    });
    toast.present();

}
  // recogemos la información de ese libro que podemos modificar, y mostramos su información en los labels
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

  //borrar libro segun la key
  deleteBook(key)
  {   
    console.log(key)
    let ref = this._Libroservice.deleteBook(key);     
    window.location.reload(true);
  }

  //te monta el molde(interfaz), para poder añadir el nuevo libro
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
    //tapa el menu, y abre el de añadir libro
    this.visibleInput=true;
    this.visibleMenu=false;
    //añade a la firebase el hijo libro
    let ref = this._Libroservice.setLibro(libroInsert);

    //reload all page
    if(this.visibleMenu==false)
    {
      this.visibleInput=false;
      this.visibleMenu=true;
      location.reload();
    }
    this.contador++
  }
 
  //para modificar libro
  changeVisibilityMenuUpdate(){   
    
    //si todos los campos no estan rellenos salta toast
    if(this.tituloInput == null || this.categoriaInput == null || this.editorialInput == null || this.propietarioInput == null || this.lugarRecogidaInput == null )
    {
      this.errorMessage = "debes introducir todos los campos"
      this.presentToast();
    }
    //en caso de q no sean null, 
    else
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
    //borra el que tiene la misma key
    let ref2 = this._Libroservice.deleteBook(this.keyUser);

    //añade el nuevo con al info de ILibro2 recien recogida
    let ref1 = this._Libroservice.setLibro(libroInsert);  
    location.reload();

    this.contador++

    }

  }

  //comprueba que sean tuyos los libros , funciona cuando le das al boton de mis libros
  myBooks()
  {
    this.booksMine =true
    //vaciamos libros para buscar los que queremos
    this.Libros = []
    this.userid =this._activateRoute.snapshot.paramMap.get('useridInput');
    console.log(this.userid)
    //lee base de datos
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
        //comprueba si es suyo para guardarlo en el array que se muestra
        if(child.val().propietario==this.userid){
          this.Libros.push(libro)

        }
        console.log(this.Libros)
      })

    })
  }

  //boton para ver toda la array de libros
  allBooks()
  {
    //recoge toda la array, y muestra todas a través del target
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

  // La busqueda por usuario
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
        //cuando el propietario sea igual a el escrito en el input
        if(child.val().propietario==this.useridFilter){
          this.Libros.push(libro)

        }
        console.log(this.Libros)
      })

    })

  }

  //Busqueda por categoria
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
        //cuando la categoria sea igual a el escrito en el input
        if(child.val().categoria==this.categoriaFilter){
          this.Libros.push(libro)

        }
        console.log(this.Libros)
      })

    })

  }

}
