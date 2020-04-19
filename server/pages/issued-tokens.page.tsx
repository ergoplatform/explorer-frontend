import express from 'express';

export const IssuedTokensPage = express.Router();

IssuedTokensPage.get('/issued-tokens');
