const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3000;

//CONFIGURAÇÃO DO HANDLEBARS

app.engine("hbs", hbs.engine({
    extname: "hbs", 
    defaultLayout: "main"
})); app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({extended:false}))

app.get("/", (req,res)=>{
res.render("index", {navActiveCad: true});
});

app.get("/users", (req,res)=>{
res.render("users", {navActiveUsers: true});
});

app.get("/editar", (req,res)=>{
res.render("editar");
});

app.post("/cad", (req,res)=>{
    
    // VALORES VINDOS DO FORMULARIO;

    let nome =  req.body.nome;
    let email =  req.body.email;

    //ARRAY QUE VAI CONTER OS ERROS

    const erros = [];

    //REMOVER OS ESPAÇOS EM BRANCO ANTES E DEPOIS

    nome = nome.trim();
    email = email.trim();

    //LIMPAR O NOME DE CARACTERES ESPECIAIS (APENAS LETRAS)

    nome = nome.replace(/[^A-zà-ú\s]/gi,"")

});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta${PORT}`)
})