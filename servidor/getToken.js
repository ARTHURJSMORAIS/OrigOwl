import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Substitua aqui pelos valores do seu JSON
const CLIENT_ID = "160578311843-f1guv8rm4umld6cc9ttht5c9gdhh57kk.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground/";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ["https://mail.google.com/"];

const url = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  response_type: "code",
});

console.log("👉 Acesse este link no navegador para gerar o token:");
console.log(url);
