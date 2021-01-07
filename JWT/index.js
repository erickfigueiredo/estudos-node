const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const JWT = require("jsonwebtoken");

// Em Uma aplicação real deve ser secreto
const JWTSecret = "sdfghjldfvçeonintinfaddcfgdsdfnff";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        const bearer = authToken.split(' ');

        JWT.verify(bearer[1], JWTSecret, (err, data) => {
            if (err) {
                res.status(401);
                res.json({ err: "Token inválido" });
            } else {
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email };
                next();
            }
        });
        res.json({ token: bearer[1] })
    } else {
        res.status(401);
        res.json({ err: "Token inválido" })
    }

    next();
}

const dataBase = {
    games: [{
            id: 23,
            title: "Batman Arkham Knight",
            year: 2015,
            price: 30
        },
        {
            id: 3,
            title: "Minecraft Fake Edition",
            year: 2021,
            price: Infinity
        },
        {
            id: 1,
            title: "The Elder Scrolls V - Skyrim",
            year: 2011,
            price: 45
        },
        {
            id: 4,
            title: "Forza Horizon",
            year: 2012,
            price: 25
        }
    ],
    users: [{
            id: 1,
            name: "Erick Lima",
            email: "e@e.com",
            password: "123"
        },
        {
            id: 2,
            name: "Renata Lima",
            email: "r@r.com",
            password: "123"
        }
    ]
}

// Endpoints == rotas na api

// Gets
app.get('/games', auth, (req, res) => {
    res.statuscode = 200;
    res.json(dataBase.games)
});

app.get('/game/:id', (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        const game = dataBase.games.find(game => game.id == id);
        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.statusCode = 400;
    }
});

// Posts
app.post('/game', auth, (req, res) => {
    const { title, price, year } = req.body;
    if (title != undefined && !isNaN(price) && !isNaN(year)) {
        dataBase.games.push({
            id: title,
            price,
            year
        });
        res.statusCode = 200;
    } else {
        res.statusCode = 400;
    }
});

app.post('/auth', auth, (req, res) => {
    const { email, password } = req.body;

    if (email != undefined && password != undefined) {
        const user = dataBase.users.find(user => user.email === email);

        if (user != undefined) {
            if (user.password == password) {

                JWT.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: "Falha interna" });
                    } else {
                        res.json({ token: token })
                    }
                });
            } else {
                res.status(401);
                res.json({ err: "Senha Inválida" });
            }

        } else {
            res.status(404);
            res.json({ err: "O email enviado não existe" });
        }
    } else {
        res.status(400);
        res.json({ err: "Dados inválidos" });
    }
});

// Put

app.put('/game/:id', auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {

            var { title, price, year } = req.body;


            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }
});

// Delete
app.delete('/game:id', auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.statusCode = 400;
    } else {
        const id = parseInt(req.params.id);
        const index = dataBase.games.findIndex(game => game.id == id);

        if (index > -1) {
            dataBase.games.splice(index, 1);
            res.statusCode = 200;
        } else {
            res.statusCode = 404;
        }
    }
})

app.listen(3003, _ => {
    console.log('Rodando');
});