"use client";
import { useState } from "react";
import { Upload, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddProduct() {
  const [currency, setCurrency] = useState("RUB");
  const [customCurrency, setCustomCurrency] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-neutral-400 hover:text-white flex items-center gap-2 mb-8 transition-colors w-fit">
          <ArrowLeft size={20} /> Назад
        </Link>
        <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Создать объявление
        </h1>
        <form className="bg-neutral-900 border border-white/10 p-8 rounded-3xl flex flex-col gap-6">
          <div>
            <label className="block text-neutral-400 mb-2 font-medium">Фото товара</label>
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center relative overflow-hidden group cursor-pointer h-40">
              <input type="file" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
              {photo ? (
                <img src={photo} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-neutral-500 mt-4">
                  <Upload size={32} />
                  <span>Нажмите для загрузки фото</span>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-neutral-400 mb-2 font-medium">Цена</label>
              <input type="number" placeholder="100" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 outline-none text-white" />
            </div>
            <div>
              <label className="block text-neutral-400 mb-2 font-medium">Валюта</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 outline-none text-white appearance-none">
                <option value="RUB">Рубли (₽)</option>
                <option value="UAH">Гривны (₴)</option>
                <option value="USD">Доллары ($)</option>
                <option value="CUSTOM">Своя валюта...</option>
              </select>
            </div>
          </div>
          {currency === "CUSTOM" && (
            <div>
              <label className="block text-neutral-400 mb-2 font-medium">Название своей валюты</label>
              <input type="text" placeholder="Например: Алмазы, Кристаллы" onChange={(e) => setCustomCurrency(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 outline-none text-white" />
            </div>
          )}
          <button type="button" className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2">
            <Plus size={20} /> Опубликовать
          </button>
        </form>
      </div>
    </div>
  );
}
