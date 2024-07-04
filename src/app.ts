import express, { Request, Response, NextFunction } from "express";
import { executeFlow } from "./services/marketingService";

const app = express();
app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { eventName, userEmail } = req.body;
    await executeFlow(eventName, userEmail);
    res.status(200).json({ message: "Flow executed successfully" });
  } catch (error: any) {

    if (error.message.includes("Unsupported event")) {
      res.status(404).json({ message: "No flow found for this event" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.post("/purchase", async (req: Request, res: Response) => {
  try {
    const { eventName, userEmail } = req.body;
    await executeFlow(eventName, userEmail);
    res.status(200).json({ message: "Flow executed successfully" });
  } catch (error: any) {

    if (error.message.includes("Unsupported event")) {
      res.status(404).json({ message: "No flow found for this event" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

export default app;
