import request from "supertest";
import app from "../src/app";
import { sendEmail } from "../src/services/emailService";

jest.mock("../src/services/emailService", () => ({
  sendEmail: jest.fn().mockResolvedValue(undefined), // Mock sendEmail function
}));

describe("Marketing Flows API", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls between tests
  });

  it("should execute the UserSignup flow", async () => {
    const userEmail = "pete@healthtech1.uk";

    const response = await request(app)
      .post("/signup")
      .send({ eventName: "websiteSignup", userEmail });

    expect(response.status).toBe(200);

    expect(sendEmail).toHaveBeenCalledWith(
      "Welcome to Sock Station Store!",
      "Thank you for signing up. Keep warm and enjoy your socks!",
      userEmail
    );
    expect(sendEmail).toHaveBeenCalledTimes(1); // Ensure only one email is sent
  });

  it("should execute the PurchaseMade flow", async () => {
    const userEmail = "pete@healthtech1.uk";

    const response = await request(app)
      .post("/purchase")
      .send({ eventName: "socksPurchased", userEmail });

    expect(response.status).toBe(200);

    // Ensure sendEmail was called with the expected parameters for both emails
    expect(sendEmail).toHaveBeenCalledWith(
      "Payment Received for Your Socks",
      "Thank you for your purchase. We have received your payment.",
      userEmail
    );
    expect(sendEmail).toHaveBeenCalledWith(
      "Your Socks Have Been Dispatched!",
      "Your socks are on their way to you. Enjoy!",
      userEmail
    );
    expect(sendEmail).toHaveBeenCalledTimes(2); // Ensure two emails are sent
  });

  it("should throw error for unsupported event", async () => {
    const userEmail = "pete@healthtech1.uk";

    const response = await request(app)
      .post("/purchase")
      .send({ eventName: "unknown_event", userEmail });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No flow found for this event");
    expect(sendEmail).not.toHaveBeenCalled(); // Ensure no emails are sent
  });
});

