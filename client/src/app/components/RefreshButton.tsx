"use client";

import revalidatePosts from "../actions/revalidateProducts";

export default function RefreshButton() {
  const handleRefresh = async () => {
    const result = await revalidatePosts();
    if (result.success) {
      alert(result.message);
    }
  };

  return <button onClick={handleRefresh}>Làm mới bài viết</button>;
}
