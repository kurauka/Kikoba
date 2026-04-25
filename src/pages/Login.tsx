import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Shovel as Handshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if profile exists, if not create one
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Anonymous User',
          role: 'user',
          createdAt: new Date().toISOString()
        });
      }

      navigate('/');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        setError(`Unauthorized Domain: "${domain}" is not whitelisted. Go to Firebase Console > Authentication > Settings > Authorized domains and add "${domain}".`);
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4"
          >
            <Handshake className="w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to KIKOBA</h1>
          <p className="text-slate-500">Smart Chama Management for modern savings groups.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 px-6 py-3.5 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 grayscale group-hover:grayscale-0" />
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
          By signing in, you agree to our Terms of Service and Privacy Policy. 
          Managed by secure Firebase Authentication.
        </p>
      </div>
    </div>
  );
}
