/** import config-a bazy danych */
const db = require('../assets/database');


/** storzenie modelu  uzytkownika  */

module.exports = class User {
    
    constructor(role_id, last_name, first_name, email, password){
        this.role_id = role_id;
        this.last_name = last_name;
        this.first_name = first_name;
        this.email = email;
        this.password = password;
        this.regtime = new Date();
        this.confirm = false;
    }

    /** funkcja rejestrująca uzytkownika */

    register() {
        // make save in database 
        console.log(this);
    }
}


