/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderColor: {
        border: "var(--border)",
      },
      ringColor: {
        ring: "var(--ring)",
      },
      fontFamily: {
        // ============ FONT THƯ PHÁP / CALLIGRAPHY ============
        // Dùng cho: Tên dòng họ, tiêu đề trang trọng, chữ ký
        dancing: ["var(--font-dancing)", "cursive"],        // Thư pháp mềm mại
        "great-vibes": ["var(--font-great-vibes)", "cursive"], // Thư pháp sang trọng

        // ============ FONT TRUYỀN THỐNG / SERIF ============
        // Dùng cho: Tiêu đề, heading, nội dung quan trọng
        playfair: ["var(--font-playfair)", "Georgia", "serif"],     // Sang trọng
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],   // Thanh lịch
        cinzel: ["var(--font-cinzel)", "Georgia", "serif"],         // La Mã cổ đại
        "cinzel-deco": ["var(--font-cinzel-deco)", "Georgia", "serif"], // Trang trí
        libre: ["var(--font-libre)", "Georgia", "serif"],           // Cổ điển
        garamond: ["var(--font-garamond)", "Georgia", "serif"],     // Châu Âu cổ
        crimson: ["var(--font-crimson)", "Georgia", "serif"],       // Trang nhã
        "noto-serif": ["var(--font-noto-serif)", "Georgia", "serif"], // Tiếng Việt tốt
        spectral: ["var(--font-spectral)", "Georgia", "serif"],     // Hiện đại + truyền thống
        lora: ["var(--font-lora)", "Georgia", "serif"],             // Cân bằng

        // ============ FONT NỘI DUNG ============
        bevietnam: ["var(--font-bevietnam)", "system-ui", "sans-serif"],

        // ============ ALIAS DỄ DÙNG ============
        sans: ["var(--font-bevietnam)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-bevietnam)", "system-ui", "sans-serif"],
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        calligraphy: ["var(--font-dancing)", "cursive"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
