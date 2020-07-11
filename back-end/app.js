const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const dbConnector = require('./config/database');

app.get('/', (req, res) => res.send("Hello Swish"));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

dbConnector.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((err) => console.error('Unable to connect to the database:', err));
