import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---

  // Twilio SMS
  app.post('/api/sms/send', async (req, res) => {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;

    if (!sid || !token) {
      return res.status(500).json({ error: 'Twilio not configured' });
    }
    try {
      const twilioClient = twilio(sid, token);
      const { to, body } = req.body;
      const message = await twilioClient.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to
      });
      res.json({ success: true, sid: message.sid });
    } catch (error) {
      console.error('Twilio error:', error);
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  });

  // M-Pesa Daraja STK Push Implementation
  app.post('/api/mpesa/stkpush', async (req, res) => {
    const { amount, phoneNumber, reference } = req.body;
    
    const consumerKey = process.env.DARAJA_CONSUMER_KEY;
    const consumerSecret = process.env.DARAJA_CONSUMER_SECRET;
    const shortCode = process.env.DARAJA_SHORTCODE;
    const passkey = process.env.DARAJA_PASSKEY;

    if (!consumerKey || !consumerSecret || !shortCode || !passkey) {
      console.warn('M-Pesa credentials missing. Falling back to simulation.');
      return res.json({ 
        CheckoutRequestID: 'sim_' + Math.random().toString(36).substr(2, 9), 
        ResponseCode: '0', 
        ResponseDescription: 'Simulation: Credentials missing' 
      });
    }

    try {
      // 1. Get OAuth Token
      const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
      const tokenResponse = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        { headers: { Authorization: `Basic ${auth}` } }
      );
      const accessToken = tokenResponse.data.access_token;

      // 2. Prepare STK Push
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
      const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');
      
      // Format phone number: ensure it's 254...
      let formattedPhone = phoneNumber.replace(/\D/g, '');
      if (formattedPhone.startsWith('0')) formattedPhone = '254' + formattedPhone.slice(1);
      if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) formattedPhone = '254' + formattedPhone;

      const stkResponse = await axios.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: formattedPhone,
          PartyB: shortCode,
          PhoneNumber: formattedPhone,
          CallBackURL: `${process.env.APP_URL || 'https://example.com'}/api/mpesa/callback`,
          AccountReference: reference || 'KIKOBA',
          TransactionDesc: 'Chama Contribution'
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      res.json(stkResponse.data);
    } catch (error: any) {
      console.error('M-Pesa STK Push error:', error.response?.data || error.message);
      res.status(500).json({ 
        error: 'Failed to initiate M-Pesa push',
        details: error.response?.data || error.message
      });
    }
  });

  // M-Pesa Callback
  app.post('/api/mpesa/callback', (req, res) => {
    console.log('M-Pesa Callback received:', JSON.stringify(req.body));
    // Here we would update Firestore based on status
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  });

  // --- Vite setup ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
