require('dotenv').config(); // Se necessário para carregar variáveis locais em dev
const nodemailer = require('nodemailer');

async function sendEmail() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME, // Variável de ambiente do GitHub para o e-mail
            pass: process.env.EMAIL_PASSWORD // Variável de ambiente do GitHub para a senha
        },
    });

    let info = await transporter.sendMail({
        from: '"Pipeline Notifier" <' + process.env.EMAILUSERNAMEID + '>',
        to: process.env.EMAILUSERNAMEID, // Substitua conforme necessário
        subject: "Status do Pipeline",
        text: `Workflow: ${process.env.GITHUB_WORKFLOW}
Repository: ${process.env.GITHUB_REPOSITORY}
Status: ${process.env.PIPELINE_STATUS}`,
    });

    console.log("Message sent: %s", info.messageId);
}

sendEmail().catch(console.error);