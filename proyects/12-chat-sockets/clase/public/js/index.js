const socket = io()

const btnEnviar = document.getElementById("btnSubmit");
btnEnviar.addEventListener("click", e => {
    const mensaje = document.getElementById("inputMensaje").value;
    socket.emit("mensaje", { mensaje } );
});

socket.on( "mensaje", data => {
    alert(data)
})