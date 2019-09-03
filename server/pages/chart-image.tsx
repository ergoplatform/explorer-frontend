import * as express from 'express';
import { chartsRoot } from '../constants/chartsRoot';

export const ChartImage = express.Router();

ChartImage.use('/', express.static(chartsRoot));
