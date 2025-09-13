import z from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email tidak boleh kosong" }).regex(emailRegex, { message: "Format email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }).min(1, { message: "Password wajib diisi" }),
});

export const registrationSchema = z
  .object({
    email: z.string().min(1, { message: "Email tidak boleh kosong" }).regex(emailRegex, { message: "Format email tidak valid" }),
    first_name: z.string().min(1, { message: "Nama depan tidak boleh kosong" }),
    last_name: z.string().min(1, { message: "Nama belakang tidak boleh kosong" }),
    password: z.string().min(8, { message: "Password minimal 8 karakter" }),
    confirm_password: z.string().min(8, { message: "Konfirmasi password minimal 8 karakter" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirm_password"], // Menampilkan pesan error di bawah field konfirmasi password
  });

export const profileSchema = z.object({
  first_name: z.string().min(1, "Nama depan tidak boleh kosong"),
  last_name: z.string().min(1, "Nama belakang tidak boleh kosong"),
});

// export const topupSchema = z.object({
//   top_up_amount: z
//     .number()
//     .min(10000, "Minimum top up is Rp 10.000")
//     .max(1000000, "Maximum top up is Rp 1.000.000")
//     .refine((value) => !Number.isNaN(value), {
//       message: "Nominal harus berupa angka",
//       path: ["top_up_amount"],
//     })
//     .refine((value) => value !== undefined, {
//       message: "Nominal tidak boleh kosong",
//       path: ["top_up_amount"],
//     }),
// });

export const topupSchema = z.object({
  top_up_amount: z.any().superRefine((value, ctx) => {
    if (value === undefined || value === null || value === "") {
      ctx.addIssue({
        code: "custom", // Menggunakan string literal, bukan enum
        message: "Nominal top up tidak boleh kosong.",
      });
      return;
    }

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      ctx.addIssue({
        code: "custom",
        message: "Nominal harus valid.",
      });
      return;
    }

    if (numberValue < 10000) {
      ctx.addIssue({
        code: "custom",
        message: "Minimum top up adalah Rp 10.000",
      });
    }

    if (numberValue > 1000000) {
      ctx.addIssue({
        code: "custom",
        message: "Maksimum top up adalah Rp 1.000.000",
      });
    }
  }),
});
