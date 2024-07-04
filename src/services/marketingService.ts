
import { Action, MarketingFlow } from '../types/marketingTypes';
import { sendEmail } from './emailService'; // Assuming this function is implemented

const flow1: MarketingFlow = {
  event: 'user_signup',
  actions: [
    { type: 'timer', delayInHours: 2 }, // 2 hours
    {
      type: 'email',
      subject: 'Welcome to Sock Station Store!',
      body: 'Thank you for signing up. Keep warm and enjoy your socks!',
    },
  ],
};

const flow2: MarketingFlow = {
  event: 'purchase_made',
  actions: [
    {
      type: 'email',
      subject: 'Payment Received for Your Socks',
      body: 'Thank you for your purchase. We have received your payment.',
    },
    {
      type: 'email',
      subject: 'Your Socks Have Been Dispatched!',
      body: 'Your socks are on their way to you. Enjoy!',
    },
  ],
};

export const executeFlow = async (eventName: string, userEmail: string): Promise<void> => {
  try {
    let actions: Action[] = [];

    switch (eventName) {
      case 'user_signup':
        actions = flow1.actions;
        break;
      case 'purchase_made':
        actions = flow2.actions;
        break;
      default:
        throw new Error(`Unsupported event: ${eventName}`);
    }

    for (const action of actions) {
      if (action.type === 'email') {
        const { subject, body } = action;
        await sendEmail(subject, body, userEmail);
      } else if (action.type === 'timer') {
        const { delayInHours } = action;
        const delayMilliseconds = delayInHours * 60 * 60 * 1000; // Convert hours to milliseconds
        await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
      }
    }
  } catch (error) {
    console.error(`Error executing marketing flow for ${eventName}:`, error);
    throw error;
  }
};
