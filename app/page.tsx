"use client";
import { motion } from "framer-motion";
import { Gamepad2, Server, HelpCircle, Send, ShoppingCart, User, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500 pb-20">
      <nav className="p-6 flex justify-between items-center border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-2xl font-bold tracking-widest text-indigo-500"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/862/862032.png" alt="EMSELL Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
          EMSELL
        </motion.div>
        <div className="flex gap-4 items-center">
          <Link href="/add-product" className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-sm">
            <ShoppingCart size={16} /> Продать товар
          </Link>
          <Link href="/chat" className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-sm">
            <MessageCircle size={16} /> Мои чаты
          </Link>
          <Link href="/login" className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all font-medium text-sm shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <User size={16} /> Войти
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Твоя игровая биржа
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            Покупай и продавай товары, валюту и аккаунты. Minecraft сервера, Roblox плейсы и многое другое.
          </p>
        </motion.div>

        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Gamepad2 className="text-indigo-500" /> Выберите игру
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <GameCard 
            title="Minecraft" 
            subCategories={["Сервера", "Моды", "Аккаунты", "Донат-валюта"]} 
            icon={<Server size={40} />} 
            color="from-green-500 to-emerald-800" 
            link="#"
          />
          <GameCard 
            title="Roblox" 
            subCategories={["Плейсы", "Робаксы (Robux)", "Скины", "Аккаунты"]} 
            icon={<Gamepad2 size={40} />} 
            color="from-red-500 to-rose-800" 
            link="#"
          />
        </div>
      </div>

      <footer className="mt-32 border-t border-white/10 p-10 bg-black text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6">
          <a href="https://t.me/emsasell" target="_blank" className="flex items-center gap-2 text-neutral-400 hover:text-[#0088cc] transition-colors text-lg">
            <Send size={24} /> Канал t.me/emsasell
          </a>
          <a href="https://t.me/emsellhelpbot" target="_blank" className="flex items-center gap-2 text-neutral-400 hover:text-[#0088cc] transition-colors text-lg">
            <HelpCircle size={24} /> Поддержка @emsellhelpbot
          </a>
        </div>
      </footer>
    </main>
  );
}

function GameCard({ title, subCategories, icon, color, link }: any) {
  return (
    <Link href={link}>
      <motion.div 
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="p-[1px] rounded-3xl bg-gradient-to-b from-white/20 to-transparent overflow-hidden cursor-pointer shadow-2xl"
      >
        <div className="bg-neutral-900/90 backdrop-blur-xl p-8 rounded-3xl h-full relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${color} opacity-20 blur-[50px] group-hover:opacity-50 transition-opacity duration-500`} />
          <div className="text-white mb-6 drop-shadow-md">{icon}</div>
          <h3 className="text-3xl font-bold mb-4">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {subCategories.map((sub: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-300 group-hover:border-white/30 transition-colors">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
