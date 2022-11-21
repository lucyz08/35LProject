import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import songRoutes from './routes/songRoutes.js';
import promptRoutes from './routes/promptRoutes.js'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/songs', songRoutes);
app.use('/prompts', promptRoutes);

<<<<<<< HEAD
const CONNECTION_URL = 'mongodb+srv://GeneBordegaray:Gene2003@35lproject.tnn1kyn.mongodb.net/test';
=======
const CONNECTION_URL = 'mongodb+srv://pinkm:lejlighed921BR90o@35lproject.tnn1kyn.mongodb.net/?retryWrites=true&w=majority';
>>>>>>> 999a538a203dceb03e73ea669576d344ceea30cf

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:5000`)))
  .catch((error) => console.log(`failed connection`));
