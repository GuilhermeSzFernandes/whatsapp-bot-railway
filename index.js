const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();

// Inicializa o cliente do WhatsApp Web
const client = new Client();

client.on('qr', (qr) => {
  // Gera o QR Code para escaneamento
  qrcode.generate(qr, { small: true });
  console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', (message) => {
  console.log('Received message:', message.body);
  // Responde a mensagem recebida
  if (message.body === 'Oi') {
    message.reply('Olá! Como posso te ajudar?');
  }
});

// Inicializa o cliente WhatsApp
client.initialize();

// Serve o bot via Express
app.get('/', (req, res) => {
  res.send('Bot do WhatsApp rodando!');
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
