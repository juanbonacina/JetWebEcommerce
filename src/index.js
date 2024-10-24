import express, { Router } from 'express';
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';
import indexRoutesroutes from './routes/indexRoutes.js';
import fs from 'fs'
import router from './routes/indexRoutes.js';
import { Console } from 'console';

const app = express();
app.listen(3000);
 
const __dirname = dirname(fileURLToPath(import.meta.url))/*-toma la ruta de las carpetas hasta SRC-*/


app.set('views', join(__dirname, 'views') )
app.set('view engine', 'ejs')
app.use(indexRoutesroutes);

app.use(express.static(join(__dirname, 'public')))

