const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const expressWs = require('express-ws')(app);
dotenv.config();

const port = process.env.PORT || 5000;
const uri = process.env.DATABASE_URI;

const tasks = require('./api/Tasks');
const auth = require('./api/Auth');

app.use(express.json());
app.use(cors());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDb Connected success'))
    .catch(error => console.log(error));
    

app.use('/api/tasks', tasks);
app.use('/api', auth);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));