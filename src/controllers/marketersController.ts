
import { Request, Response } from 'express';
import { executeFlow } from '../services/marketingService';

// Controller function to execute marketing flow
export const executeMarketingFlow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventName, userEmail } = req.body;

    if (!eventName || !userEmail) {
      res.status(400).json({ error: 'Missing eventName or userEmail in request body' });
      return;
    }

    await executeFlow(eventName, userEmail);

    res.status(200).json({ message: 'Marketing flow executed successfully' });
  } catch (error) {
    console.error('Error executing marketing flow:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
