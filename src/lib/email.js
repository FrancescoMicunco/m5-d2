import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendRegistrationEmail = async recipientAddress => {
    try {
        const msg = {
            to: recipientAddress,
            from: process.env.SENDER_EMAIL,
            subject: "Let's try sending my first email server side!",
            text: "Using Node.js ",
            html: "<h3>A new world is waiting fors us... but, we need it?</h3>",

        }
        const sendgrid = await sgMail.send(msg)

        console.log(sendgrid)

    } catch (error) {
        console.log(error.response.body.errors)
    }


}