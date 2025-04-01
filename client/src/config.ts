// Mục đích của file này là để kiểm tra các biến môi trường trong file .env của client

import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
}); // kiểm tra dữ liệu dựa trên schema mà không ném lỗi (throw errors) nếu dữ liệu không hợp lệ

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("Các giá trị khai báo trong file .env không hợp lệ");
}

const envConfig = configProject.data;

export default envConfig;
