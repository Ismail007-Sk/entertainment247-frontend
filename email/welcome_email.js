import emailjs from "@emailjs/browser";

export const sendWelcomeEmail = async (name, email) => {
    try {
        return await emailjs.send(
            process.env.NEXT_PUBLIC_SID,
            process.env.NEXT_PUBLIC_TID,
            {
                to_name: name,
                to_email: email,
                reply_to:"constructionsb400@gmail.com"
            },
            process.env.NEXT_PUBLIC_PKEY
        );
    } catch (error) {
        console.error("Welcome email failed:", error);
        throw error;
    }
};