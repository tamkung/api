let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
let port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send({
        error: false,
        message: "Hello World!!",
        written_by: "TWT",
        published_on: "11/11/2022",
    })
})

var con = mysql.createConnection({

    host: "ap-southeast.connect.psdb.cloud",
    user: "315tbrkooe37c1c3ih5b",
    password: "pscale_pw_fpzwYnqTEK38acUZFp0thOIBDTcgeKWmFOYRXIGpHUr",
    database: "test",
    ssl: {}

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/Smart_Bes_iSupply', (req, res) => {

    con.query('SELECT * FROM site_cartran', (err, rows, fields) => {
        if (err) throw err;

        let message = "";
        if (rows === undefined || rows.length === 0) {
            message = "No records found";
        } else {
            message = "Records found";
        }
        return res.send({ error: false, data: rows, message: message });
    })
})

app.post('/Smart_Bes_iSupply/sitecar', (req, res) => {
    let bccode = req.body.BCCODE;
    let bcname = req.body.BCNAME;
    let hbcode = req.body.HBCODE;
    let hbcname = req.body.HBCNAME;
    let trannumber = req.body.trannumber;
    let customerCode = req.body.CustomerCode;
    let customerName = req.body.CustomerName;
    let s_address = req.body.S_address;
    let u_date = req.body.u_date;
    let type_tran = req.body.type_tran;
    let duldates = req.body.duldates;
    let trnote01 = req.body.trnote01;
    let trnote02 = req.body.trnote02;
    let trnote03 = req.body.trnote03;
    let plantnnote01 = req.body.plantnnote01;
    let plantnnote02 = req.body.plantnnote02;
    let trupcustomer01 = req.body.trupcustomer01;
    let dp_note01 = req.body.dp_note01;
    let dp_note02 = req.body.dp_note02;
    let dp_note03 = req.body.dp_note03;
    let dp_note04 = req.body.dp_note04;

    //validate the data
    if (!bccode || !bcname) {
        return res.status(400).send({ error: true, message: "Please provide both name and author" });
    } else {
        con.query('INSERT INTO site_cartran (BCCODE, BCNAME, HBCODE, HBCNAME, trannumber, CustomerCode, CustomerName, S_address, u_date, type_tran, duldates, trnote01, trnote02, trnote03, plantnote01, plantnote02, trupcustomer01, dp_note01, dp_note02, dp_note03, dp_note04) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
            [bccode, bcname, hbcode, hbcname, trannumber, customerCode, customerName, s_address, u_date, type_tran, duldates, trnote01, trnote02, trnote03, plantnnote01, plantnnote02, trupcustomer01, dp_note01, dp_note02, dp_note03, dp_note04],
            (err, result, fields) => {
                if (err) throw err;
                return res.send({ error: false, data: result, message: "Record added" });
            }
        )
    }
})

//---------------------------------------------------Post----------------------------
app.get('/getpost', (req, res) => {

    con.query('SELECT * FROM Post2', (err, rows, fields) => {
        if (err) throw err;

        let message = "";
        if (rows === undefined || rows.length === 0) {
            message = "No records found";
        } else {
            message = "Records found";
        }
        return res.send({ error: false, data: rows, message: message });
    })
})

app.post('/add/post', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let contentHtml = req.body.contentHtml;
    let hidden = req.body.hidden;
    let createdAt = req.body.createdAt;
    let updatedAt = req.body.updatedAt;
    let authorId = req.body.authorId;

    //validate the data
    if (!title || !content) {
        return res.status(400).send({ error: true, message: "Please provide both name and author" });
    } else {
        con.query('INSERT INTO Post2 (title, content, contentHtml, hidden, createdAt, updatedAt, authorId) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, content, contentHtml, hidden, createdAt, updatedAt, authorId],
            (err, result, fields) => {
                if (err) throw err;
                return res.send({ error: false, data: result, message: "Record added" });
            }
        )
    }
})

app.listen(port, () => {
    console.log('Server started on port ' + port);
})

module.exports = app;
