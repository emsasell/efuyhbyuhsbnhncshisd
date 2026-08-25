"use client";
import { ShieldAlert, CheckCircle, UserCheck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function AdminPanel() {
  const [users, setUsers] = useState([
    { id: 1, email: "player1@mail.ru", status: "active", verified: false },
    { id: 2, email: "scammer99@gmail.com", status: "banned", verified: false },
    { id: 3, email: "top_seller@yandex.ru", status: "active", verified: true },
  ]);

  const toggleBan = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "banned" ? "active" : "banned" } : u));
  };

  const toggleVerify = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, verified: !u.verified } : u));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-red-500 flex items-center gap-3">
              <ShieldAlert size={36} /> Панель Администратора
            </h1>
            <p className="text-neutral-400 mt-2">Доступ разрешен: deemiix64@gmail.com</p>
          </div>
          <Link href="/" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
            На главную
          </Link>
        </div>

        <div className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 bg-black/50 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Пользователи</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-5 text-neutral-400 border-b border-white/10">ID</th>
                  <th className="p-5 text-neutral-400 border-b border-white/10">Почта</th>
                  <th className="p-5 text-neutral-400 border-b border-white/10">Статус</th>
                  <th className="p-5 text-neutral-400 border-b border-white/10">Верификация</th>
                  <th className="p-5 text-neutral-400 border-b border-white/10">Бан/Разбан</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-5 text-neutral-500">#{user.id}</td>
                    <td className="p-5 font-medium flex items-center gap-2">
                      {user.email}
                      {user.verified && <CheckCircle size={16} className="text-blue-500" title="Галочка" />}
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === "banned" ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"}`}>
                        {user.status === "banned" ? "Забанен" : "Активен"}
                      </span>
                    </td>
                    <td className="p-5">
                      <button onClick={() => toggleVerify(user.id)} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${user.verified ? "bg-blue-600/20 text-blue-500" : "bg-white/10 text-neutral-400"}`}>
                        <UserCheck size={16} /> {user.verified ? "Снять" : "Выдать"}
                      </button>
                    </td>
                    <td className="p-5">
                      <button onClick={() => toggleBan(user.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${user.status === "banned" ? "bg-green-600/20 text-green-500" : "bg-red-600/20 text-red-500"}`}>
                        {user.status === "banned" ? "Разбанить" : "Забанить"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
