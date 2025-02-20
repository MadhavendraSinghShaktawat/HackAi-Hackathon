import express from 'express';
import { moodRouter } from './modules/mood/mood.controller';

const app = express();

app.use(express.json());
app.use('/moods', moodRouter);

// ... rest of your app setup 