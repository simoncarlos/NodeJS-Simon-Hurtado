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

// tiene que mostrar productos y mensajes
describe("productos", () => {
    
    before(async () => {
        server = await conectarServidor()
    })

    after(async () => {
        await server.close()
    })

    describe("GET a productos y mensajes con datos validos", () => {
        it("Devuelve status 200, lista de productos y listado de mensajes", async () => {
            const { products, chat, status } = await axios.get('/aplication');
            assert.deepStrictEqual( status, 200);
            assert.ok( products );
            assert.ok( chat );
        })
    })

})