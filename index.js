const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
require('./routes/pizzaRoute')(app);

if(process.env.NODE_ENV === 'prod'){
    // 1. Express will serve up prod assets like main.css and main.js
    app.use(express.static('app/dist/pizza-challenge'));
   
    // 2. Express wirll serve up index.html if it doesn't recognize the file 
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'app', 'dist', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

console.log(`listening to port ${PORT}`);

app.listen(PORT);

module.exports = app;