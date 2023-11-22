import { Resend } from "resend";
import { RESEND_ERROR_CODES_BY_KEY } from "resend/build/src/interfaces";

const sendOtp = async (email, otp) => {
  try {
    const resend = new Resend(process.env.REACT_APP_RESEND_API);

    const emailSent = await resend.emails.send({
      from: "onboarding@resend.dev", // @todo replace with team email id
      to: email,
      subject: "OTP for t3.money",
      html: `<p>Here's your OTP for t3.money: <strong>${otp}</strong></p>`, // @todo decide on copy for email
    });
    if (emailSent.data.id) {
      // store email ID in supabase?
      return true;
    } else if (emailSent.error) {
      // handle error
      if (emailSent.error.name === RESEND_ERROR_CODES_BY_KEY.rate_limit_exceeded) {
        // try again in 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return sendOtp(email, otp);
      }
      return false;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return false;
  }
};

export default sendOtp;
