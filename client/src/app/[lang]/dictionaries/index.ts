import "server-only"; // Đảm bảo chỉ chạy trên server

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export async function getDictionary(lang: string) {
  const dictionary =
    dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;
  return dictionary();
}
