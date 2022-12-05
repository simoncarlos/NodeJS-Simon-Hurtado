const socket = io();

socket.on("mensaje", mensaje => {
    console.log(mensaje);
});

const buttonSubmitProduct = document.getElementById("submitProduct");

buttonSubmitProduct.addEventListener("click", e => {
    
    e.preventDefault();

    const name = document.getElementById("nombre").value;
    const price = document.getElementById("precio").value;
    const url = document.getElementById("thumbnail").value;
    
    const newProduct = { nombre: name, precio: price, thumbnail: url };

    socket.emit("newProduct", newProduct);

});

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

buttonSubmitChat.addEventListener("click", e => {

    e.preventDefault();

    const fecha = new Date();
    const today = fecha.toLocaleDateString();
    const hour = fecha.toLocaleTimeString('en-US');

    const mail = document.getElementById("mail").value;
    const date = `[${today} ${hour}]`
    const message = document.getElementById("message").value;
    
    const newMessage = { email: mail, fecha: date, mensaje: message };

    socket.emit("newMessage", newMessage);

});

socket.on("newMessage", message => {

    if( document.getElementById("chat__message") !== null ){
        document.getElementById("chat__message").outerHTML = "";
    }

    const chat = document.querySelector(".cuerpo__chat ul");
    chat.innerHTML += 
    `<li>
        <p>
            <span>
                ${message.email}
            </span>
            <span>
                ${message.fecha}
            </span>
            <span>
                ${message.mensaje}
            </span>
        </p>
    </li>`;
});