
// Son los mode que recogen los datos obligatorios de la base de datos (para que no de fallos)

//con key para buscar (por ejemplo para update)
export interface ILibro {
    idLibro:number,
    categoria: string,
    editorial: string,
    lugar_Recogida: number
    titulo: string,
    propietario: string,
    key: string,
}

//sin key porq no hace falta (por ejemplo push)
export interface ILibro2 {
    idLibro:number,
    categoria: string,
    editorial: string,
    lugar_Recogida: number
    titulo: string,
    propietario: string,

}

export interface IUser {
    userid:string,
    pwd: string,
    nombre:string,
    tlf:number,
    preferencias:string,
    key:string,

}
export interface IUser2 {
    userid:string,
    pwd: string,
    nombre:string,
    tlf:number,
    preferencias:string,
   
}
