"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Привет! Хочу купить у тебя админку.", sender: "me", time: "12:00" },
    { id: 2, text: "Привет! Да, она в наличии. Оплачивай через сайт.", sender: "seller", time: "12:05" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const playNotificationSound = () => {
    try {
      const audio = new Audio("https://actions.google.com/sounds/v1/water/droplet_reverb.ogg");
      audio.volume = 0.5;
      audio.play();
    } catch (e) {
      console.log("Автовоспроизведение заблокировано");
    }
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMessage("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, text: "Секунду, проверяю...", sender: "seller", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      playNotificationSound();
    }, 2000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:p-6 p-0 font-sans">
      <div className="max-w-4xl mx-auto w-full h-[100dvh] md:h-[90vh] bg-neutral-900 md:rounded-3xl border border-white/10 flex flex-col overflow-hidden relative">
        <div className="bg-black/50 backdrop-blur-md p-4 border-b border-white/10 flex items-center gap-4 z-10">
          <Link href="/" className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/10"><ArrowLeft size={20} /></Link>
          <div className="relative">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Seller" alt="Avatar" className="w-12 h-12 rounded-full bg-indigo-500/20" />
            <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-neutral-900 ${isOnline ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-neutral-500'}`}></div>
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center gap-1">TopSeller <CheckCircle size={14} className="text-blue-500" /></h3>
            <p className="text-xs text-neutral-400">{isOnline ? "В сети" : "Был недавно"}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col max-w-[75%] ${msg.sender === "me" ? "self-end items-end" : "self-start items-start"}`}>
              <div className={`p-4 rounded-2xl ${msg.sender === "me" ? "bg-indigo-600 text-white rounded-br-none" : "bg-white/10 text-white rounded-bl-none border border-white/5"}`}>
                {msg.text}
              </div>
              <span className="text-xs text-neutral-500 mt-1 mx-1">{msg.time}</span>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-black/50 border-t border-white/10">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Напишите сообщение..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-white" />
            <button type="submit" disabled={!newMessage.trim()} className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 px-5 rounded-xl flex items-center justify-center">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
