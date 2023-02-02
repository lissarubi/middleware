require('dotenv').config();

class EnvVariables{
    USERS_SERVER: string | undefined
    PRODUCTS_SERVER: string | undefined

    constructor(){
        this.USERS_SERVER = process.env.USERS_SERVER
        this.PRODUCTS_SERVER = process.env.PRODUCTS_SERVER
    }
}

export { EnvVariables }