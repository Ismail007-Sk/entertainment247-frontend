import emailjs from "@emailjs/browser";

export const sendOtpEmail = async (email, otp) => {
    // console.log("Entering Block",otp)
    try {
        return await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID, // Different template
            {
                to_email: email,
                otp: otp,
                reply_to: process.env.NEXT_PUBLIC_REPLY_EMAIL
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
    } catch (error) {
        console.error("OTP email failed:", error);
        throw error;
    }
};