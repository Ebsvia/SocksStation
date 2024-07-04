export const sendEmail = async (
  subject: string,
  body: string,
  userEmail: string
): Promise<boolean> => {
  console.log(`Sending email to ${userEmail}: ${subject} = ${body}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return true;
};
