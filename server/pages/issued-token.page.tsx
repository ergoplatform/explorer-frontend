import express from 'express';

export const IssuedTokenPage = express.Router();

IssuedTokenPage.get('/issued-token');
