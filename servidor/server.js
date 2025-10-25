import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 2600;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(process.cwd(), "../")));

// endpoints de teste simples
app.get("/ping", (req, res) => res.json({ ok: true, ts: Date.now() }));

// função helper para obter access token (com log de tempo)
async function getAccessTokenWithTiming(oAuth2Client) {
  const t0 = Date.now();
  try {
    const res = await oAuth2Client.getAccessToken();
    const t1 = Date.now();
    console.log(`[TIMING] getAccessToken: ${t1 - t0}ms`);
    return res?.token || res?.token === 0 ? res.token : res?.access_token || res;
  } catch (err) {
    const t1 = Date.now();
    console.error(`[TIMING] getAccessToken FAILED after ${t1 - t0}ms`, err);
    throw err;
  }
}

app.post("/enviar", async (req, res) => {
  const start = Date.now();
  console.log("POST /enviar received, body:", req.body);

  // validação simples
  if (!req.body || !req.body.nome || !req.body.email || !req.body.mensagem) {
    return res.status(400).json({ mensagem: "Campos inválidos" });
  }

  try {
    // checar se variáveis essenciais existem (log simples)
    const missing = [];
    ["CLIENT_ID", "CLIENT_SECRET", "REFRESH_TOKEN", "EMAIL_USER"].forEach(k => {
      if (!process.env[k]) missing.push(k);
    });
    if (missing.length) {
      console.error("Variáveis de ambiente faltando:", missing);
      return res.status(500).json({ mensagem: "Configuração inválida no servidor", detalhe: `Missing: ${missing.join(",")}` });
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    // pega token (com tempo)
    let token;
    try {
      token = await getAccessTokenWithTiming(oAuth2Client);
    } catch (errToken) {
      console.error("Erro obtendo access token:", errToken);
      return res.status(500).json({ mensagem: "Erro ao autenticar com Google", detalhe: errToken?.message || String(errToken) });
    }

    // cria transporter
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

    // medida de tempo do sendMail
    const tSend0 = Date.now();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: req.body.email,
      to: process.env.EMAIL_USER,
      subject: `Mensagem de ${req.body.nome}`,
      text: req.body.mensagem,
    });
    const tSend1 = Date.now();
    console.log(`[TIMING] sendMail: ${tSend1 - tSend0}ms`);

    const total = Date.now() - start;
    console.log(`POST /enviar SUCESSO (total ${total}ms)`);
    return res.json({ mensagem: "✅ E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail (stack):", error && (error.stack || error));
    const total = Date.now() - start;
    return res.status(500).json({ mensagem: "❌ Erro ao enviar e-mail.", detalhe: error?.message || String(error), time_ms: total });
  }
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
