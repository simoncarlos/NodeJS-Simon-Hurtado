import { faker } from "@faker-js/faker";

const getRandomNumbers = ( quantity ) => {
    let numbers = {};
    for (let i = 0; i < quantity; i++) {
        let number = faker.random.numeric(3);
        if( numbers[ number ] === undefined ){
            numbers[ number ] = 1;
        }else{
            numbers[ number ]++;
        }
    };
    return numbers;
}

process.on("message", param =>{
    const data = getRandomNumbers( param );
    process.send( data );
    process.exit();
});