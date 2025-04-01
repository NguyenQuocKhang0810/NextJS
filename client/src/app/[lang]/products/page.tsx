import { getDictionary } from "../dictionaries";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang); // Lấy từ điển dựa trên locale

  // Giả lập danh sách sản phẩm
  const products = [
    { id: "1", name: "Laptop" },
    { id: "2", name: "Phone" },
  ];

  return (
    <div>
      <h1>{dict.title}</h1>
      <p>{dict.description}</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - <button>{dict.addToCart}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Tạo trang tĩnh cho từng locale
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}
