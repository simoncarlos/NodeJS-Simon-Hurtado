import { faker } from "@faker-js/faker";

const getRandomNumbers = ( quantity ) => {
    let numbers = {};
    for (let i = 0; i < quantity; i++) {
        numbers[ faker.random.numeric(3) ]++;
    };
    return numbers;
}

process.on("message", param =>{
    const data = getRandomNumbers( param );
    process.send( data );
    process.exit();
});