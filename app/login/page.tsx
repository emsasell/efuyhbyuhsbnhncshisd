"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        setStep(2);
      } else {
        alert("Ошибка отправки кода. Возможно, требуется настройка Пароля приложений Google.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === "deemiix64@gmail.com") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="bg-black/60 border border-white/10 p-10 rounded-[2rem] w-full max-w-md z-10 backdrop-blur-xl shadow-2xl"
      >
        <Link href="/" className="text-neutral-400 hover:text-white flex items-center gap-2 mb-8 transition-colors w-fit">
          <ArrowLeft size={20} /> На главную
        </Link>
        
        <div className="text-center mb-10">
          <img src="https://cdn-icons-png.flaticon.com/512/862/862032.png" alt="Logo" className="w-16 h-16 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(99,102,241,1)]" />
          <h2 className="text-3xl font-bold text-white mb-2">Вход в EMSELL</h2>
          <p className="text-neutral-400">
            {step === 1 ? "Введите данные для авторизации" : "Код отправлен на emsamsell@gmail.com (или вашу почту)"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLogin} 
              className="flex flex-col gap-5"
            >
              <input 
                type="email" placeholder="Ваша почта" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-neutral-500"
              />
              <input 
                type="password" placeholder="Пароль" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-neutral-500"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-2xl font-bold mt-4 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] flex justify-center items-center h-[56px]"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Получить код"}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={verifyCode} 
              className="flex flex-col gap-5"
            >
              <input 
                type="text" placeholder="000000" required maxLength={6}
                value={code} onChange={(e) => setCode(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-center text-4xl tracking-[0.5em] font-mono"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-green-600 hover:bg-green-500 text-white p-4 rounded-2xl font-bold mt-4 transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)] h-[56px]"
              >
                {loading ? "Проверка..." : "Войти"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
