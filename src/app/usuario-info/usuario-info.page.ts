import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IUser, IUser2 } from '../Interfaces';
import { LibroService } from '../services/Libros.service';


@Component(
{
  selector: 'app-usuario-info',
  templateUrl: './usuario-info.page.html',
  styleUrls: ['./usuario-info.page.scss'],
})


export class UsuarioInfoPage implements OnInit
{

  //declaramos variables
  userid
  Users: (IUser)[] = [];
  nombre
  telefono
  preferencias
  nombreInput
  telefonoInput
  preferenciasInput
  key
  pwd: string;
  pwdInput: string;

  //declaramos toast y para poder pasar parametros (user id)
  constructor(private _toastCtrl: ToastController ,private _Libroservice: LibroService,private _activateRoute: ActivatedRoute) 
  {  
  }

  ngOnInit() 
  {
    //recoge usuario idinput
    this.userid =this._activateRoute.snapshot.paramMap.get('useridInput');
    console.log(this.userid)
    let ref = this._Libroservice.GetUsers();

    //cargamos todos
    ref.once("value", snapshot => {

      snapshot.forEach(child => {
        console.log("he encontrado " + child.val().userid);
        let user: IUser = {
          "userid": child.val().userid,
          "pwd": child.val().pwd,
          "nombre": child.val().nombre,
          "tlf": child.val().tlf,
          "preferencias": child.val().preferencias,
          "key": child.key
        }

        
        this.Users.push(user)
        console.log(this.Users)
      })

    })

    // comprueba el user que concuerda con la id 
    .then(()=>{this.Users.forEach(user=>{

      // si es el mismo
      if(user.userid == this.userid)
      {
        //muestra:
        this.nombre=user.nombre
        this.preferencias=user.preferencias
        this.telefono=user.tlf
        this.key=user.key
        this.pwd=user.pwd
      }

    })
    
    console.log(this.preferencias)

    })

  }

  // cuando le das a el botón de modificar:
  updateUser()
  { 
    //se recoge en la interfaz 
    let userInsert:IUser2 ={
          "userid": this.userid,
          "pwd": this.pwdInput,
          "nombre": this.nombreInput,
          "tlf": this.telefonoInput,
          "preferencias":this.preferenciasInput,
    }
    console.log("he entrado")
    
    //Utilizamos el delete y set como update
    let ref = this._Libroservice.deleteUser( this.key);
    let ref1 = this._Libroservice.setUser(userInsert);
      
  }
  
}
