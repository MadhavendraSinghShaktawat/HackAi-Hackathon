import { Express } from 'express';
import { chatRoutes } from '../modules/chat/chat.routes';
import { exercisesRoutes } from '../modules/exercises/exercises.routes';

export const configureRoutes = (app: Express): void => {
  app.use('/api/chat', chatRoutes);
  app.use('/api/exercises', exercisesRoutes);
}; 