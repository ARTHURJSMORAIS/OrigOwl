import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ======= CONFIG GMAIL OAUTH2 =======
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// ======= ROTA DE TESTE =======
app.get("/", (req, res) => {
  res.json({ mensagem: "Servidor ativo e rodando 🚀" });
});

// ======= ROTA DE ENVIO DE E-MAIL =======
app.post("/enviar", async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    await transporter.sendMail({
      from: `"OrigOwl Contato" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 Nova mensagem do site",
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    });

    res.json({ mensagem: "✅ Mensagem enviada com sucesso!" });
  } catch (erro) {
    console.error("Erro ao enviar o e-mail:", erro);
    res.status(500).json({ mensagem: "❌ Falha ao enviar" });
  }
});

const PORT = process.env.PORT || 5020;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
