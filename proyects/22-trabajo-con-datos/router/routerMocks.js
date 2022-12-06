import express, { Router } from "express";
import { Container } from "../src/container.js";
import { faker } from "@faker-js/faker";

const mock = new Router();
mock.use( express.json() );
mock.use( express.urlencoded( { extended: true } ) );

function getFakerProduct(){
    return {
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(100, 5000),
        thumbnail: faker.image.transport()
    }
}

function getFiveProductsFaker(){
    let productList = []
    for (let index = 0; index < 5; index++) {
        productList.push( getFakerProduct() )
    }
    return productList
}

mock.get("/productos-test", async (req, res) =>{

    const listProductsFaker = getFiveProductsFaker();
    console.log(listProductsFaker);
    res.render("../mocks/faker", { 
        products: listProductsFaker
    });

})

export default mock;