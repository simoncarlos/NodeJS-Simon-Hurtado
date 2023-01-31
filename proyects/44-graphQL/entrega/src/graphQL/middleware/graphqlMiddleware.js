import { buildSchema, graphql } from "graphql";
import { graphqlHTTP } from "express-graphql";

import {
    getProducts,
    getMessages,
    createMessage,
    createProduct
} from "../controllers/appController.js";

const schema = buildSchema(`
    input ProductoInput {
        nombre: String
        precio: Int
        thumbnail: String
    }
    input AutorInput {
        email: String
        nombre: String
        apellido: String
        edad: Int
        alias: String
        avatar: String
    }
    input MensajeInput {
        author: AutorInput
        fecha: String
        mensaje: String
    }
    type Author {
        email: String
        nombre: String
        apellido: String
        edad: Int
        alias: String
        avatar: String
    }
    type Mensaje {
        author: Author
        fecha: String
        mensaje: String
    }
    type Producto {
        nombre: String
        precio: Int
        thumbnail: String
    }
    type Query {
        getProducts: [Producto],
        getMessages: [Mensaje]
    }
    type Mutation {
        createProduct(datos: ProductoInput!): Producto,
        createMessage(datos: MensajeInput!): Mensaje
    }
`)

export const graphqlMiddleware = graphqlHTTP({
    schema,
    rootValue: {
        getProducts,
        getMessages,
        createProduct,
        createMessage
    },
    graphiql: true
})