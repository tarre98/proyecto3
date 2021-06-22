import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { IUser, ILibro, IUser2, ILibro2} from "../Interfaces";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';

@Injectable()

// LLAMADA BASE DE DATOS
export class LibroService
{  
    //Los moldes de la base de datos
    Productos: (ILibro| IUser)[]=[];

    constructor(private _db: AngularFireDatabase)
    { 
    }

    //LEE TODOS LOS LIBROS
    GetLibros() : firebase.database.Reference
    {
    let ref =this._db.database.ref("libros")
    return ref;
    }
    
    //LEE TODOS LOS USERS
    GetUsers() : firebase.database.Reference
    {
    let ref =this._db.database.ref("users")
    return ref;
    }

    //MODIFICA TODOS LOS USERS
    setUser(producto: IUser2)
    {
    let ref=this._db.database.ref("users");
    ref.push(producto);
    }

    //MODIFICA TODOS LOS LIBROS
    setLibro(producto: ILibro2)
    {
    let ref=this._db.database.ref("libros");
    ref.push(producto);
    }

    //DELETEA TODOS LOS LIBROS
    deleteUser(userid)
    {
    this._db.database.ref('users/'+userid).remove();  
    }

    //DELETEA TODOS LOS USERS
    deleteBook(userid)
    {
    this._db.database.ref('libros/'+userid).remove();  
    }
  
}



