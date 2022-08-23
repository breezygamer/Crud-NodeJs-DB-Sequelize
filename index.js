//TESTE DE GIT HUB

const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session")
const PORT = process.env.PORT || 3000;

//CONFIGURAÇÃO DO HANDLEBARS

app.engine("hbs", hbs.engine({
    extname: "hbs", 
    defaultLayout: "main"
})); app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({extended:false}));

// IMPORTAR USUARIOS

const User = require("./models/User")

//CONFIGUTAÇÃO DAS SESSIONS 
app.use(session({
    secret:"minhaChave",
    resave: false,
    saveUninitialized: true
}))

//ROTAS

app.get("/", (req,res)=>{
    if(req.session.errors){
        var arrayErros = req.session.errors;
        req.session.errors = "";
        return res.render("index", {navActiveCad: true, errors:arrayErros})
    };

    if(req.session.success){
        req.session.success = false;
        return res.render("index", {navActiveCad: true, MsgSuccess: true})
    };
    res.render("index", {navActiveCad: true});
});

app.get("/users", (req,res)=>{
    User.findAll().then((valores)=>{

        if(valores.length > 0){
            res.render("users", {navActiveUsers: true, table: true, usuarios:valores.map(valores => valores.toJSON()) });
        } else{
            res.render("users", {navActiveUsers: true, table: false})
        }

    }).catch((err)=>{
        console.log("Ocoreu um erro na pesquisa")
    })
    
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
    nome = nome.trim();

    //VERIFICAR SE O CAMPO ESTA VAZIO 

    if (nome =="" || typeof nome == undefined || nome == null){
        erros.push({mensagem: "campo nome não pode estar vazio!"})
    }
    
    //VERIFICAR SE O CAMPO NOME É VALIDO(APENAS LETRAS)

   if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(nome)) {
    erros.push({mensagem: "Nome invalido"})
   }

   //VERIFICAR SE O CAMPO ESTA VAZIO 
    
   if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    erros.push({mensagem: "campo email invalido!"});
   };

   if(erros.length > 0){
    console.log(erros)

    req.session.errors = erros;
    req.session.success = false;
    return res.redirect("/")
   }

        
   //SUCESSO NENHUM ERRO
   //SALVAR NO BANCO DE DADOS

    User.create({
        nome: nome,
        email: email.toLowerCase()
    }).then(()=>{
        console.log("Cadastrado com sucesso")
        req.session.success = true;
        return res.redirect("/");
    }).catch((erro)=>{
        console.log(`OPS, ouve um erro: ${erro}`)
    })

 

});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})