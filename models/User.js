const db = require("./db");

const User = db.sequelize.define("usuario", {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {  
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {  
        type: db.Sequelize.STRING,
        allowNull: false
    }   
})

User.sync();

module.exports = User