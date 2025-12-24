import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/service/useToas";
import {
  Playfair_Display,
  Be_Vietnam_Pro,
  Dancing_Script,
  Great_Vibes,
  Cormorant_Garamond,
  Cinzel,
  Cinzel_Decorative,
  Libre_Baskerville,
  EB_Garamond,
  Crimson_Text,
  Noto_Serif,
  Spectral,
  Lora,
} from "next/font/google";
import Providers from "@/utils/providers";

// ============ FONT THƯ PHÁP / CALLIGRAPHY ============

// Dancing Script - Thư pháp mềm mại, bay bổng
const dancing = Dancing_Script({
  subsets: ["vietnamese", "latin"],
  variable: "--font-dancing",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Great Vibes - Thư pháp sang trọng, cổ điển
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
  display: "swap",
});

// ============ FONT TRUYỀN THỐNG / SERIF ============

// Playfair Display - Sang trọng, cổ điển
const playfair = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Cormorant Garamond - Thanh lịch, quý phái
const cormorant = Cormorant_Garamond({
  subsets: ["vietnamese", "latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Cinzel - Phong cách La Mã cổ đại, trang trọng
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Cinzel Decorative - Cinzel phiên bản trang trí
const cinzelDeco = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel-deco",
  weight: ["400", "700", "900"],
  display: "swap",
});

// Libre Baskerville - Cổ điển, dễ đọc
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre",
  weight: ["400", "700"],
  display: "swap",
});

// EB Garamond - Cổ điển châu Âu
const ebGaramond = EB_Garamond({
  subsets: ["vietnamese", "latin"],
  variable: "--font-garamond",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Crimson Text - Truyền thống, trang nhã
const crimson = Crimson_Text({
  subsets: ["vietnamese", "latin"],
  variable: "--font-crimson",
  weight: ["400", "600", "700"],
  display: "swap",
});

// Noto Serif - Hỗ trợ tiếng Việt tuyệt vời
const notoSerif = Noto_Serif({
  subsets: ["vietnamese", "latin"],
  variable: "--font-noto-serif",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Spectral - Hiện đại pha truyền thống
const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Lora - Cân bằng giữa hiện đại và cổ điển
const lora = Lora({
  subsets: ["vietnamese", "latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ============ FONT NỘI DUNG ============

// Be Vietnam Pro - Thiết kế riêng cho tiếng Việt
const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  variable: "--font-bevietnam",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gia Phả Việt",
  description: "Hệ thống quản lý gia phả dòng họ Việt Nam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Gộp tất cả font variables
  const fontVariables = [
    dancing.variable,
    greatVibes.variable,
    playfair.variable,
    cormorant.variable,
    cinzel.variable,
    cinzelDeco.variable,
    libreBaskerville.variable,
    ebGaramond.variable,
    crimson.variable,
    notoSerif.variable,
    spectral.variable,
    lora.variable,
    beVietnam.variable,
  ].join(" ");

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontVariables} font-body antialiased`}>
        <ToastProvider>
          <Providers>{children}</Providers>
        </ToastProvider>
      </body>
    </html>
  );
}