const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
app.use(express.json());

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  }
});

client.on('qr', (qr) => {
  console.log('📲 Escaneie o QR code:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot do WhatsApp pronto!');
});

client.initialize();

app.post('/enviar', async (req, res) => {
  const { numero, mensagem } = req.body;
  const chatId = `${numero}@c.us`;

  try {
    await client.sendMessage(chatId, mensagem);
    res.send('✅ Mensagem enviada!');
  } catch (err) {
    res.status(500).send('Erro ao enviar mensagem: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
