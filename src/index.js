import express from 'express';
import cors from 'cors';
import config from 'config';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(__dirname + config.paths.public));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + config.paths.views));

app.use('/', routes);

app.get('/*', (req, res) => res.render('index'));

app.listen(
    config.app.port,
    config.app.host,
    () => console.log(`Listen to http://${config.app.host}:${config.app.port}`)
);
