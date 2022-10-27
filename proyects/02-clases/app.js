class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros, // Array de objetos
        this.mascotas = mascotas // Array de strings 
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota( mascota ){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook( nombre, autor ){
        this.libros.push( {nombre: nombre, autor: autor} )
    }

    getBookNames(){
        return this.libros.map( libro => libro.nombre )
    }

}

const user = new Usuario( "Carlos", "Simon", [{nombre: "1810", autor: "F.Pigna"},{nombre: "LCDP", autor: "John"}], ["Perro", "Tortugo"] );
console.log(user);

console.log(`El nombre completo del usuario es: ${user.getFullName()}`)

user.addMascota("Gato")
console.log(`Las mascotas del usuario son: ${user.mascotas} y su cantidad es: ${user.countMascotas()}`)

user.addBook("Azabache","Autor x")
console.log(user.libros)

console.log( `Los nombres de los libros son: ${user.getBookNames()}` )

console.log(user)