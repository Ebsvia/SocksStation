import express, {Request, Response } from 'express';


export const handleSignup = async (req: Request, res: Response) => {
    const { userEmail } = req.body;

    try {
         
        res.status(200).send('Sign Up Successful');
    } catch (error) {
        console.error('Error handling signup', error);
        res.status(500).send('Internal server error');
    }
};

export const handlePurchase = async (req: Request, res: Response) => {
    const { userEmail } = req.body;

    try {
        res.status(200).send('Purchase handled')
    }
    catch (error) {
        console.error('Error handling purchase', error);
        res.status(500).send('Internal server error');
    }
};
