import { Component } from '@angular/core';
import { ChildActivationEnd } from '@angular/router';
import { IUser, IUser2 } from '../Interfaces';
import { LibroService } from '../services/Libros.service';
import { ToastController } from '@ionic/angular';


@Component(
  {
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage
 {
    useridInput: string;
    pwdInput: string;
    Users: (IUser)[] = [];
    match=false
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
    ref.once("value", snapshot => {

      snapshot.forEach(child => {
        console.log("he encontrado " + child.val().userid + child.val().pwd );
        let user: IUser = {
          "userid": child.val().userid,
          "pwd": child.val().pwd,
          "nombre": child.val().nombre,
          "tlf": child.val().tlf,
          "preferencias": child.val().preferncias,
          "key": child.key
        }
        this.Users.push(user)
        console.log(this.Users)
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


  matchLogin() {

    this.Users.forEach(user => {
      if ((user.userid == this.useridInput) && (user.pwd == this.pwdInput)) {
        this.match = true
        console.log("match")
        this.CorrectToast(); 

      }

    });

    if(this.match==false){

        this.errorMessage = "Contraseña o ususario incorrectos"
          this.presentToast();
          this.match=false

    }

  }
  
  registroVisibility()
  {

    this.registro=true;
    this.login=false;
    if((this.userIdRegistro,this.pwdRegistro,this.nombreRegistro,this.tlfRegistro,this.preferenciasRegistro) != null)
    {

      let userInsert:IUser2 ={
        "userid": this.userIdRegistro,
        "pwd": this.pwdRegistro,
        "nombre": this.nombreRegistro,
        "tlf": this.tlfRegistro,
        "preferencias":this.preferenciasRegistro,
      }

      let ref1 = this._Libroservice.setUser(userInsert);
      this.errorMessage = "Usuario insertado"
      this.presentToast();
      this.registro=false;
      this.login=true;     
      this.userIdRegistro="";
      this.pwdRegistro="";
      this.preferenciasRegistro="";
      this.nombreRegistro="";
      this.tlfRegistro=null;  
      location.reload()
    }
      
  }

}

