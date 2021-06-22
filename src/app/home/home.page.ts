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

  //VARIABLES DEFINIDAS
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

    // lIBRERIA DEL TOAST
    constructor(private _toastCtrl: ToastController ,private _Libroservice: LibroService) 
    {    
    }

  //Se genera al entrar en la página
  ngOnInit() 
  {
    //utilizamos el "once" ya que el "on" da fallos para coger todos los usuarios y guardarlos en una variable local (todos los de la firebase)
    let ref = this._Libroservice.GetUsers();
    ref.once("value", snapshot => {

      snapshot.forEach(child => {
        console.log("he encontrado " + child.val().userid + child.val().pwd );
        //Recoge la información y se la pasa al molde (user > IUser)
        let user: IUser = {
          "userid": child.val().userid,
          "pwd": child.val().pwd,
          "nombre": child.val().nombre,
          "tlf": child.val().tlf,
          "preferencias": child.val().preferncias,
          "key": child.key
        }
        // Recoge usuario y lo guarda en el array(molde)
        this.Users.push(user)
        console.log(this.Users)
      })
    })

  }

  //async =asincrono

  // TOAST (mensajito de abajo)
  async presentToast()
  {
    const toast = await this._toastCtrl.create({
        message: this.errorMessage,
        duration: 3000,
        position: 'bottom'

    });
    toast.present();

  }

  // TOAST
  async CorrectToast() 
  {
    const toast = await this._toastCtrl.create({
        message: 'Login Correcto',
        duration: 3000,
        position: 'bottom'

    });  
    toast.present();

  }

  // Metodo para comprobar que el usuario es correcto
  matchLogin() {

    this.Users.forEach(user => {
      if ((user.userid == this.useridInput) && (user.pwd == this.pwdInput)) {
        this.match = true
        console.log("match")
        //toast
        this.CorrectToast(); 

      }

    });

    //si esta mal, utiliza el toast
    if(this.match==false){

        this.errorMessage = "Contraseña o ususario incorrectos"
          this.presentToast();
          this.match=false

    }

  }
  
  //cuando da al botón de registro
  registroVisibility()
  {

    this.registro=true;
    this.login=false;

    //si todos los campos no estan vacios
    if((this.userIdRegistro,this.pwdRegistro,this.nombreRegistro,this.tlfRegistro,this.preferenciasRegistro) != null)
    {

      // iguala un usuario para meterlo en la firebsase
      let userInsert:IUser2 ={
        "userid": this.userIdRegistro,
        "pwd": this.pwdRegistro,
        "nombre": this.nombreRegistro,
        "tlf": this.tlfRegistro,
        "preferencias":this.preferenciasRegistro,
      }

      //aquí llama a la referencia para subir el usuario nuevo al firebase
      //reseteo
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
      //recarga pag
      location.reload()
    }
      
  }

}

