import { describe } from "mocha";
import assert from "assert";
import app from "../server.js";

axios.defaults.baseURL = `http://localhost:8080`

function conectarServidor() {
    return new Promise((resolve, reject) => {
        const server = app.listen(8080, err => {
            if (err) return reject(err)
            resolve(server)
        })
    })
}

describe("productos", () => {
    
    before(async () => {
        server = await conectarServidor()
    })

    after(async () => {
        await server.close()
    })

    describe("GET a productos con datos validos", () => {
        it("Devuelve status 200 y lista de productos", async () => {
            const { data, status } = await axios.get('/api/products');
            assert.deepStrictEqual( status, 200);
            assert.ok( data );
        })
    })

    describe("Cuando agrego un producto", () => {
        it("Se agrega producto", async ()=> {
            const product = { nombre: "remera", precio: 2500, thumbnail: "photo.jpg" }
            await axios.post('/api/products', product )
            const { data, status } = await axios.get('/api/products');
            assert.deepStrictEqual( status, 200);
            assert.ok( data.includes(product) );
        })
    })
    
    describe("GET a mensajes con datos validos", () => {
        it("Devuelve status 200 y lista de mensajes", async () => {
            const { data, status } = await axios.get('/api/mensajes');
            assert.deepStrictEqual( status, 200);
            assert.ok( data );
        })
    })
    
    describe("Cuando agrego un mensaje", () => {
        it("Se agrega mensaje", async ()=> {
            const mensaje = { 
                author: { 
                    email: "csimonhurtado@gmail.com", 
                    nombre: "Carlos", 
                    apellido: "Simon", 
                    edad: 21, 
                    alias: "Limoncito", 
                    avatar: "photo.jpg" 
                }, 
                fecha: "[23/1/2023 11:12:48 PM]",
                mensaje: "Mensaje de prueba 1234" 
            };
            await axios.post('/api/message', { ...mensaje })
            const { data, status } = await axios.get('/api/mensajes');
            assert.deepStrictEqual( status, 200);
            assert.ok( data.includes(mensaje) );
        })
    })
    
})