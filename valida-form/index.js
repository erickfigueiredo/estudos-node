const express = require('express');
const app = express();

const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser('password'));

app.use(session({
    secret: 'phpsucks',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());

// Rotas

// Get 
app.get('/', (req, res) => {
    let emailError = req.flash('emailError');
    let pontosError = req.flash('pontosError');
    let nomeError = req.flash('nomeError');

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;

    res.render('index', { emailError, pontosError, nomeError });
});

// Post
app.post('/form', (req, res) => {
    const { email, nome, pontos } = req.body;

    let emailErr, nomeErr, pontosErr;

    if (email == undefined || email == "") {
        emailErr = "O campo de e-mail não pode ser vazio";
    }

    if (nome == undefined || nome == "") {
        nomeErr = "O campo de nome não pode ser vazio";
    }

    if (pontos == undefined || isNaN(pontos)) {
        pontosErr = "O campo de pontos não pode ser vazio e deve ser um número";
    }

    if (emailErr != undefined || nomeErr != undefined || pontosErr != undefined) {
        req.flash('emailError', emailErr);
        req.flash('nomeError', nomeErr);
        req.flash('pontosError', pontosError);
        res.redirect("/");
    } else {
        res.json({ nome, email, pontos });
    }
});

app.listen(3000, _ => {
    console.log('Servidor iniciado com sucesso!');
});