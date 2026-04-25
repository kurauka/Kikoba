import axios from 'axios';

export const api = {
  sendSMS: async (to: string, body: string) => {
    const response = await axios.post('/api/sms/send', { to, body });
    return response.data;
  },
  stkPush: async (amount: number, phoneNumber: string, reference: string) => {
    const response = await axios.post('/api/mpesa/stkpush', { amount, phoneNumber, reference });
    return response.data;
  }
};
