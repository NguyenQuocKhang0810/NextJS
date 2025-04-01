export const revalidate = 15;

import { apiRequest } from "@/lib/http";
import { ApiResponse, Product } from "@/types/product";
import Link from "next/link";

async function fetchPosts() {
  const fetchTime = new Date().toLocaleTimeString();
  console.log("Fetching products at:", fetchTime);

  const res: ApiResponse = await apiRequest("/products", {
    method: "GET",
    next: { revalidate: 15 },
  });

  return {
    data: res.data,
    fetchTime, // Trả về cả thời gian fetch
  };
}

export default async function PostsPage() {
  const { data: posts, fetchTime } = await fetchPosts();

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <ul>
        {posts.map((post: Product) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
      <p>Dữ liệu được fetch lúc: {fetchTime}</p>
      <p>Trang được render lúc: {new Date().toLocaleTimeString()}</p>
      <Link href="/">Back to home</Link>
    </div>
  );
}
