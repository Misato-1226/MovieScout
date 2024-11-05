import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zen: ["Zen Kurenaido"],
        cinzel: ["Cinzel"],
        raleway: ["raleway"],
        playfair: ["Playfair Display"],
        lora: ["Lora"],
        poppins: ["Poppins"],
        serif: ["Roboto Serif"],
        merriweather: ["Merriweather Sans"],
        kaisei: ["Kaisei Decol"],
        shippori: ["Shippori Mincho"],
        klee: ["Klee One"],
        noto: ["Noto Sans Japanese"],
        kosugi: ["Kosugi Maru"],
      },
    },
  },
  plugins: [],
} satisfies Config;
