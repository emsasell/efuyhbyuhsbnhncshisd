import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const code = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "emsamsell@gmail.com",
        pass: "Almir210513", 
      },
    });

    await transporter.sendMail({
      from: '"EMSELL Авторизация" <emsamsell@gmail.com>',
      to: email,
      subject: "Ваш код для входа на EMSELL",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 40px; background: #0a0a0a; color: #ffffff; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 1px solid #333;">
          <h2 style="text-align: center; color: #6366f1; margin-bottom: 30px;">EMSELL MARKET</h2>
          <p style="font-size: 16px; color: #a3a3a3; text-align: center;">Ваш одноразовый код для входа:</p>
          <div style="background: #171717; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
            <h1 style="color: #ffffff; letter-spacing: 8px; font-size: 36px; margin: 0;">${code}</h1>
          </div>
        </div>
      `,
    });
    
    return NextResponse.json({ success: true, message: "Код отправлен" });
  } catch (error: any) {
    console.error("Ошибка отправки:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
