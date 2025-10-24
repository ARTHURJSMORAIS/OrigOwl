import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const app = express();
const port = process.env.PORT || 2600;

// Middleware
app.use(express.json());
app.use(cors()); // permite requisições de qualquer origem (ajuste se quiser limitar)
app.use(express.static("D:/OrigOwl")); // seus arquivos estáticos

// Configuração OAuth2 do Google
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Rota de envio de e-mail
app.post("/enviar", async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;

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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Mensagem de ${nome}`,
      text: mensagem,
    };

    await transporter.sendMail(mailOptions);
    res.json({ mensagem: "✅ E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ mensagem: "❌ Erro ao enviar e-mail." });
  }
});

// Rota principal
app.get("/", (req, res) => {
  res.send("🚀 Servidor OrigOwl está funcionando corretamente!");
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
