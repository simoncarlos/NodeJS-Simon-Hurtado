

export const randomController = (req, res) => {

    const randomNumbers = fork(path.resolve(process.cwd() + "/child-process", 'getRandomNumbers.js'))

    if ( req.query.cant ){
        console.log("La cantidad enviada en el query es: " + req.query.cant );
        randomNumbers.send( req.query.cant );
    }else{
        randomNumbers.send(100000000);// calcular 100.000.000
    }

    randomNumbers.on("message", data => {
        console.log("Se obtuvo la cantidad de numeros aleatorios..........");
        res.json( { data } )
    });

    //const number = 1; // cantidad de veces que salio el numero
    //// number randoms 1 al 1000, x cant de veces
    //const numbers = {};
    //numbers[ number ] = 3;
    //res.render("random", numbers);
}