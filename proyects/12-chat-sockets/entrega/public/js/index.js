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

    const mail = document.getElementById("mail").value;
    const date = "today"
    const message = document.getElementById("message").value;
    
    const newMessage = { email: mail, fecha: date, mensaje: message };

    socket.emit("newMessage", newMessage);

});

socket.on("newMessage", message => {
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