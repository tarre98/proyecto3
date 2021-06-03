import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IUser, IUser2 } from '../Interfaces';
import { LibroService } from '../services/Libros.service';


@Component({
  selector: 'app-usuario-info',
  templateUrl: './usuario-info.page.html',
  styleUrls: ['./usuario-info.page.scss'],
})


export class UsuarioInfoPage implements OnInit {

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

  constructor(private _toastCtrl: ToastController ,private _Libroservice: LibroService,private _activateRoute: ActivatedRoute) 
  {
  }

  ngOnInit() 
  {

    this.userid =this._activateRoute.snapshot.paramMap.get('useridInput');
    console.log(this.userid)
    let ref = this._Libroservice.GetUsers();
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

    }).then(()=>{this.Users.forEach(user=>{

      if(user.userid == this.userid){
        this.nombre=user.nombre
        this.preferencias=user.preferencias
        this.telefono=user.tlf
        this.key=user.key
        this.pwd=user.pwd

      }
    })
    console.log(this.preferencias)})
    
  }

  updateUser(){ 
    let userInsert:IUser2 =
      {
        "userid": this.userid,
        "pwd": this.pwdInput,
        "nombre": this.nombreInput,
        "tlf": this.telefonoInput,
        "preferencias":this.preferenciasInput,
      }
    console.log("he entrado")
    let ref = this._Libroservice.deleteUser( this.key);
    let ref1 = this._Libroservice.setUser(userInsert);
      
  }

}
