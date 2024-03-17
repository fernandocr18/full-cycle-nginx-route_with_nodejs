const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req,res) => {
    var nome = "Fernando Ribeiro";
    
    const con = mysql.createConnection(config);
    var nomes = [];
    var insert = `INSERT INTO people(name) values('${nome}')`;
    con.query(insert, function (err, result) {
        if (err) throw err;
    });
    
    console.log(`Nome ${nome} inserido na base`)
    const sqlQueryNames = `select * from people`;
    
    con.query(sqlQueryNames, function(err, results, fields) {
        if (err) throw err;
        results.forEach(result => {
            nomes.push(result.name);
            console.log(result.name);
        });
        
        console.log(`nomes => ${nomes};`);
        console.log(`results => ${results};`);
        res.render("fullcyclenames", {names: nomes})
    }); 
    con.end();
    
    console.log(`nomes req => ${nomes};`);
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})