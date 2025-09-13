import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ==================================================================
// DEFINISI SKEMA (Sama untuk kedua contoh)
// ==================================================================
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// ==================================================================
// ✅ CARA YANG BENAR: Menggunakan z.infer
// ==================================================================

// 1. Kita membuat tipe data statis dari skema
type LoginFormType = z.infer<typeof loginSchema>;

const CorrectWay: React.FC = () => {
  // 2. 'useForm' diberikan tipe 'LoginFormType' yang sederhana.
  //    React Hook Form mengerti ini: "Oke, aku akan mengelola form dengan
  //    field 'email' dan 'password' yang keduanya string."
  const { register, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  // 3. 'data' di sini secara otomatis memiliki tipe yang benar:
  //    { email: string, password: string }
  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    // KETIK "data." DI SINI, DAN ANDA AKAN MELIHAT AUTOCOMPLETE:
    data.email;
    // -> .email
    // -> .password
    console.log("Data yang Benar:", data.email, data.password);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
};

// ==================================================================
// ❌ CARA YANG SALAH: Menggunakan typeof
// ==================================================================

const IncorrectWay: React.FC = () => {
  // 1. 'useForm' diberikan tipe dari objek Zod itu sendiri.
  //    React Hook Form akan bingung: "Apa ini? Tipe ini punya
  //    metode .parse(), .safeParse(), dll. Ini bukan tipe form biasa!"
  //    EDITOR ANDA AKAN MENUNJUKKAN ERROR DI BARIS DI BAWAH INI.
  const { register, handleSubmit } = useForm<typeof loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // 2. 'data' di sini akan memiliki tipe dari objek Zod, BUKAN data form.
  //    Tipenya adalah: z.ZodObject<{ email: z.ZodString, ... }>
  const onSubmit: SubmitHandler<typeof loginSchema> = (data) => {
    // KETIK "data." DI SINI, DAN ANDA AKAN MELIHAT AUTOCOMPLETE:
    data// -> .parse
    // -> .safeParse
    // -> .shape
    // ...dan metode Zod lainnya. TIDAK ADA .email atau .password!

    // BARIS DI BAWAH INI AKAN MENYEBABKAN ERROR DARI TYPESCRIPT:
    // "Property 'email' does not exist on type 'ZodObject<...>'."
    .console
      .log("Data yang Salah:", data.email, data.password);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
};
