import { Action, MarketingFlow } from "../types/marketingTypes";
import { sendEmail } from "./emailService";

const flow1: MarketingFlow = {
  event: "websiteSignup",
  actions: [
    { type: "timer", delayInHours: 2 }, // 2 hours
    {
      type: "email",
      subject: "Welcome to Sock Station Store!",
      body: "Thank you for signing up. Keep warm and enjoy your socks!",
    },
  ],
};

const flow2: MarketingFlow = {
  event: "socksPurchased",
  actions: [
    {
      type: "email",
      subject: "Payment Received for Your Socks",
      body: "Thank you for your purchase. We have received your payment.",
    },
    {
      type: "email",
      subject: "Your Socks Have Been Dispatched!",
      body: "Your socks are on their way to you. Enjoy!",
    },
  ],
};

export const executeFlow = async (
  eventName: string,
  userEmail: string
): Promise<void> => {
  try {
    let actions: Action[] = [];

    switch (eventName) {
      case "websiteSignup":
        actions = flow1.actions;
        break;
      case "socksPurchased":
        actions = flow2.actions;
        break;
      default:
        throw new Error(`Unsupported event: ${eventName}`);
    }

    actions.forEach((action, index) => {
      console.log(`Action ${index + 1}:`, action);
    });

    for (const action of actions) {
      if (action.type === "email") {
        const { subject, body } = action;
        await sendEmail(subject, body, userEmail);
        console.log(`Email sent successfully to ${userEmail}`);
      } else if (action.type === "timer") {
        const { delayInHours } = action;
        await new Promise((resolve) => setTimeout(resolve, delayInHours)); 
        console.log(`Timer delay completed: ${delayInHours} hours`);
      }
    }

    console.log(`Execution completed for event: ${eventName}`);
  } catch (error) {
    console.error(`Error executing marketing flow for ${eventName}:`, error);
    throw error;
  }
};
