import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_KEY)

export const sendRegistrationEmail = async recipientAddress => {
    const msg = {
        to: recipientAddress,
        from: process.env.SENDER_EMAIL,
        subject: "Let's try sending my first email server side!",
        text: "Using Node.js ",
        html: "<h3>A new world is waiting fors us... but, we need it?</h3>",
    }

    await sgMail.send(msg)
}