const jwt = require('jsonwebtoken');

const generarJwt = ( uid )=>{

    return new Promise( (resolve, reject) =>{

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' }, 
            (err, token) =>{
            if(err)
                reject( 'No se puedo crear el token' );
            resolve( token );
        });

    });


}

module.exports = {
    generarJwt
}