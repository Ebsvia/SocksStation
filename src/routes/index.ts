import express from 'express';
import { handleSignup, handlePurchase } from '../controllers/marketersController';

const router = express.Router();

//routes
router.post('/signup', handleSignup);
router.post('/purchase', handlePurchase);

export default router;