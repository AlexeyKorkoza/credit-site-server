import express from 'express';
import cors from 'cors';
import config from 'config';
import path from 'path';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, config.paths.views));
app.use('/public', express.static(__dirname + config.paths.public));

app.use('/', routes);

app.get('/', (req, res) => res.render('index'));

app.listen(
    config.app.port,
    config.app.host,
    () => console.log(`Listen to http://${config.app.host}:${config.app.port}`)
);
