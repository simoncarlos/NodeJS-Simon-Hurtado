import { denormalize, schema} from "./normalizr/index.js"

const socket = io();

socket.on("mensaje", mensaje => {
    console.log(mensaje);
});

const buttonSubmitProduct = document.getElementById("submitProduct");

if( buttonSubmitProduct != null ){
    
    buttonSubmitProduct.addEventListener("click", e => {
        
        e.preventDefault();
    
        const name = document.getElementById("nombre").value;
        const price = document.getElementById("precio").value;
        const url = document.getElementById("thumbnail").value;
        
        const newProduct = { nombre: name, precio: price, thumbnail: url };
    
        socket.emit("newProduct", newProduct);
    
    });

}


socket.on("newProduct", product => {

    if( document.querySelector("#cuerpo__subtitulo") !== null ){
        
        const tableHead = document.querySelector(".cuerpo__tabla");
        tableHead.innerHTML += 
        `
        <tr class="tabla__encabezado">
            <th> Nombre </th>
            <th> Precio </th>
            <th> Foto </th>
        </tr>
        `;
        document.getElementById("cuerpo__subtitulo").outerHTML = "";

    }

    const table = document.querySelector(".cuerpo__tabla");
    table.innerHTML += 
    `<tr>
        <td>${product.nombre}</td>
        <td>${product.precio}</td>
        <td>
            <img src=${product.thumbnail} alt=${product.nombre} width="40px" height="40px">
        </td>
    </tr>`;

});

const buttonSubmitChat = document.getElementById("submitMessage");

if( buttonSubmitChat != null ){
    
    buttonSubmitChat.addEventListener("click", e => {
    
        e.preventDefault();
    
        const fecha = new Date();
        const today = fecha.toLocaleDateString();
        const hour = fecha.toLocaleTimeString('en-US');
    
        const mail = document.getElementById("email").value;
        const date = `[${today} ${hour}]`
        const message = document.getElementById("message").value;
        const name = document.getElementById("nombreUser").value;
        const lastanme = document.getElementById("apellido").value;
        const age = document.getElementById("edad").value;
        const apodo = document.getElementById("alias").value;
        const avatar1 = document.getElementById("avatar").value;
        
        const newMessage = { 
            author: {
                email: mail, 
                nombre: name,
                apellido: lastanme,
                edad: age,
                alias: apodo,
                avatar: avatar1
            },
            fecha: date, 
            mensaje: message
        };
    
        socket.emit("newMessage", newMessage);
    
    });

}


socket.on("newMessage", dataNormalized => {

    if( document.getElementById("chat__message") !== null ){
        document.getElementById("chat__message").outerHTML = "";
    }
    //console.log(dataNormalized);
    //const authorSchema = new schema.Entity('authors', {}, {
    //    idAttribute: 'email'
    //});
    //const chatSchema = new schema.Entity('chats', { author: authorSchema });
    //const chatListSchema = [chatSchema];
    //const chatDenormalized = denormalize(dataNormalized.result, chatListSchema, dataNormalized.entities);
    //console.log( chatDenormalized );
    const chatBody = document.querySelector(".cuerpo__chat ul");
    chatBody.innerHTML = "";
    console.log(dataNormalized)
    dataNormalized.forEach( message => {
        chatBody.innerHTML += 
            `<li>
                <p>
                    <span>
                        ${message.author.email}
                    </span>
                    <span>
                        ${message.fecha}
                    </span>
                    <span>
                        ${message.mensaje}
                    </span>
                    <img src=${message.author.avatar}>
                </p>
            </li>`;        
    });

});

const logout = document.getElementById("logout");

if(logout != null ){
    logout.addEventListener("click", e => { 
        window.location.pathname = "/logout";
    });
}