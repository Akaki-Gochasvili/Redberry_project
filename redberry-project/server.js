const express = require("express");
const exphbs = require('express-handlebars');
const flash = require('connect-flash')
const path = require('path');
const session = require('express-session');
const chalk = require('chalk');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const app = express();

const hbs = exphbs.create(
    {
        default: 'main',
        extname: 'hbs'
    }
);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(
    express.urlencoded({ extended: true })
);

app.use(
    express.static(
        path.join(path.dirname(__filename), "public")
    )
);

app.use(
    session(
        {
            secret: "my_secret_key",
            resave: true,
            saveUninitialized: false
        }
    )
);

app.use(flash());

app.use(require('./routes/landing'));
app.use(require('./routes/add'));
app.use(require('./routes/success'));
app.use(require('./routes/list'));

async function start() {
    try {
         await mongoose
            .connect('mongodb+srv://Admin:Admin@applicationcluster.jeqbi.mongodb.net/redberry', {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            })

        console.log(chalk.bold.yellow(`MongoDb Connected`));
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }


    app.listen(PORT, () => {
        console.log(chalk.bold.cyan("Server has been started..."))
    })
};

start();
