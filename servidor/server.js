import express from "express";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2600;

// Middlewares para receber JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Função de envio de e-mail
async function enviarEmail({ nome, email, mensagem }) {
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

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // envia para você mesmo
    subject: `Mensagem de ${nome}`,
    text: `De: ${nome} <${email}>\n\n${mensagem}`,
  };

  return transporter.sendMail(mailOptions);
}

// Rota do formulário
app.post("/enviar", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  try {
    await enviarEmail({ nome, email, mensagem });
    res.json({ mensagem: "✅ E-mail enviado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
    res.status(500).json({ mensagem: "❌ Falha ao enviar a mensagem." });
  }
});

// Rota de teste rápida
app.get("/teste-email", async (req, res) => {
  try {
    await enviarEmail({
      nome: "Teste",
      email: process.env.EMAIL_USER,
      mensagem: "Mensagem de teste"
    });
    res.send("✅ Teste de e-mail OK");
  } catch (erro) {
    console.error("Erro no envio de teste:", erro);
    res.status(500).send("❌ Falha no teste de e-mail");
  }
});

// Start do servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
