import express, {Request, Response } from 'express';

const router = express.Router();


router.post('/trigger-event', async (req: Request, res: Response) => {
    try {
        const { eventName, userEmail} = req.body;
    
     //check inputs
    if (!eventName || !userEmail){
        return res.status(400).json({ error: 'eventName and userEmail are required' });
    }
  //sucessful
    res.sendStatus(200);
} catch (err) {
    console.error('Error triggering marketing flow:', err);
    res.status(500).json({ error: 'Internal server error' });
}
});


export default router;