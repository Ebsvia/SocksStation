export const sendEmail = async (
  subject: string,
  body: string,
  userEmail: string
): Promise<boolean> => {
  if (!userEmail.includes("@")) {
    throw new Error("Invalid email address");
  }

  console.log(`Sending email to ${userEmail}: ${subject} = ${body}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //Failure
  if (subject === "Failure") {
    throw new Error("Failed to send email");
  }
  return true;
};
