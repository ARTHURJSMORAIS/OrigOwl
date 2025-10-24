import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

async function enviarTeste() {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const { token } = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: token,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Teste de envio",
      text: "Se você recebeu isso, está funcionando!",
    });

    console.log("✅ E-mail de teste enviado com sucesso!");
  } catch (erro) {
    console.error("❌ Erro ao enviar e-mail:", erro);
  }
}

enviarTeste();
