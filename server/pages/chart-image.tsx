import * as express from 'express';
import { cacheRoot } from '../constants/cacheRoot';

export const ChartImage = express.Router();

ChartImage.use('/', express.static(cacheRoot));
