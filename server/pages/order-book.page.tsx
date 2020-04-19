import express from 'express';

export const OrderBookPage = express.Router();

OrderBookPage.get('/order-book');
