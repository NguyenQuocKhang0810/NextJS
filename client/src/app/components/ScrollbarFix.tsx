"use client";

import { useEffect } from "react";

const ScrollbarFix = () => {
  useEffect(() => {
    // Kiểm tra xem trình duyệt có hỗ trợ scrollbar-gutter không
    const supportsScrollbarGutter = CSS.supports("scrollbar-gutter", "stable");

    if (!supportsScrollbarGutter) {
      const updateScrollbarPadding = () => {
        const hasScrollbar =
          window.innerHeight < document.documentElement.scrollHeight;
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;

        if (hasScrollbar) {
          document.body.style.paddingRight = "0px";
        } else {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
      };

      // Cập nhật padding ban đầu
      updateScrollbarPadding();

      // Lắng nghe sự thay đổi kích thước hoặc nội dung
      window.addEventListener("resize", updateScrollbarPadding);
      const observer = new MutationObserver(updateScrollbarPadding);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("resize", updateScrollbarPadding);
        observer.disconnect();
        document.body.style.paddingRight = "";
      };
    }
  }, []);

  return null;
};

export default ScrollbarFix;
