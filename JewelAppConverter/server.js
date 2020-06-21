const express = require('express');
const path = require('path');
const base64Img = require('base64-img');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const database = new sqlite.Database(path.resolve(__dirname, 'Database/testDatabase.db'));
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('HTML'));
app.use(express.static('Query'));
app.use(express.static('JS'));

app.get('/', (req, res) => {
    res.sendfile('fileupload.html', {root: path.join(__dirname + '/html')});
})

app.post('/Saving', (req, res) => {
    const base64Image = req.body.base64Image;
    database.get('SELECT * FROM Imagebase64 WHERE base64 = ?', [base64Image], (err, result) => {
        if (err) {
            throw err;
        }
        else if (result == undefined) {
            const date = new Date();
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + (date.getDate())).slice(-2);
            const dateCreated = month + '/' + day + '/' + year;
            const hours = date.getHours();
            if (hours < 10) {
                hours = "0" + hours;
            }
            const minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            const seconds = date.getSeconds();
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            const hourCreated = hours + ':' + minutes + ':' + seconds;

            database.run('INSERT INTO Imagebase64 (base64, dateCreated, hourCreated) VALUES(?,?,?)', [base64Image, dateCreated, hourCreated], (err) => {
                if (err) {
                    throw err;
                }
                res.send('Success');
            });
            return;
        }
        res.send('Present');
        return;
    });
});

app.listen(1010, () => console.log('Server running at 1010'));