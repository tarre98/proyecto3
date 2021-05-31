import { Component } from '@angular/core';
import { ChildActivationEnd } from '@angular/router';
import { IUser, IUser2 } from '../Interfaces';
import { LibroService } from '../services/Libros.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  Users: (IUser)[] = [];
  errorMessage: string;
  registro=false
  login=true
  userIdRegistro:string;
  pwdRegistro:string;
  preferenciasRegistro:string;
  nombreRegistro:string;
  tlfRegistro:number;

  constructor(private _toastCtrl: ToastController ,private _Libroservice: LibroService) 
  {
  }

  ngOnInit() 
  {
    console.log(this)
    let ref = this._Libroservice.GetUsers();
    ref.once("value", snapshot => 
    {

      snapshot.forEach(child => 
        {
          console.log("he encontrado " + child.val().userid);
          let user: IUser = 
            {
            "userid": child.val().userid,
            "pwd": child.val().pwd,
            "nombre": child.val().nombre,
            "tlf": child.val().tlf,
            "preferencias": child.val().preferncias,
            "key": child.key
            }

        this.Users.push(user)
      })

    })

  }

  async presentToast() 
  {
    const toast = await this._toastCtrl.create({
        message: this.errorMessage,
        duration: 3000,
        position: 'bottom'

    });
    toast.present();

  }

  async CorrectToast() 
  {
    const toast = await this._toastCtrl.create({
        message: 'Login Correcto',
        duration: 3000,
        position: 'bottom'

    });
    toast.present();

  }

  registroVisibility()
  {
    this.registro=true;
    this.login=false;
  }
   
  changeRegistroVisibility()
  {

  } 
      
  



}
