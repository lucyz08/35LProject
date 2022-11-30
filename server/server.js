import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import SpotifyWebApi from 'spotify-web-api-node';

import songRoutes from './routes/songRoutes.js';
import promptRoutes from './routes/promptRoutes.js'
import userRoutes from './routes/userRoutes.js';
import searchRoutes from './routes/searchRoutes.js'
import playlistRoutes from './routes/playlistRoutes.js'
import dotenv from 'dotenv'
import { initSpotifyToken } from './spotifyFunctions.js';
dotenv.config()
mongoose.set("useFindAndModify", false);

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/songs', songRoutes);
app.use('/prompts', promptRoutes);
app.use('/user', userRoutes);
app.use('/search', searchRoutes);
app.use('/playlist', playlistRoutes);

const CONNECTION_URL = 'mongodb+srv://rohanj:IAmJake1@35lproject.tnn1kyn.mongodb.net/test';

const PORT = process.env.PORT|| 8888;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:8888`)))
  .catch((error) => console.log(`failed connection`));

export var spotifyApi = new SpotifyWebApi({
  clientId: '4a484f64e7f04e2ea48e43b0aa731916',
  clientSecret: 'a25959caa7614a2b91ecb5753de9403b',
  redirectUri: 'http://localhost:8888/callback'
});

await initSpotifyToken();