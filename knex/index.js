const database = require('./database');

let dados = {
    nome: "Skyrim",
    preco: "50.00"
}

/*
* INSERT

database.insert(dados).into('tb_games').then(data => {
    console.log(data)
}).catch(err => {
    console.log(err);
});

* SELECT

database.select().table('tb_games').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

* DELETE

database.where({ id: 3 }).delete().table('tb_games').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

* UPDATE

database.where({ id: 1 }).update({ preco: 120 }).table('tb_games');

* ORDER BY

database.select().table('tb_games').orderBy('preco', 'asc').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

* INSERT COM RELACIONAMENTO

database.insert({
    nome: 'Blizzard',
    game_id: 5
}).table('tb_estudio').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

* 1 - 1 ou 1 - n 

database.select(['tb_games.id as game_id', 'tb_estudios as estudio_id']).table('tb_games').innerJoin('tb_estudios', 'tb_estudios.game_id', 'tb_estudios.id').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

* N - N
database.select([
    "tb_estudio.nome as estudio_nome",
    "tb_games.nome as game_nome",
    "tb_games.preco"
]).table("tb_games_estudio")
.innerJoin('tb_games', 'tb_games.id', 'tb_games_estudio.game_id')
.innerJoin('tb_estudios', 'tb_estudios.id', 'tb_games_estudio.estudio_id')
.where('tb_games.id', 8)
.then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

* Transactions

async function testeTransacao() {

    try {
        
        await database.transaction(async transaction => {
            await database.insert({ nome: 'Yu-Gi-Oh GX' }).table('tb_games');
            await database.insert({ nome: 'Super Meat Boy' }).table('tb_games');
            await database.insert({ nome: 'Pokémon Heart Gold' }).table('tb_games');
        });
    } catch (err) {
        console.log(err);
    }
}
*/