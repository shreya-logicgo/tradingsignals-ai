"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// 1. Define your types for the multilingual fields
type MultilingualText = {
  en: string;
  pl: string;
  th: string;
};

// 2. Update your BlogPost interface
interface BlogPost {
  id: number;
  title: MultilingualText;
  excerpt: MultilingualText;
  image: string;
  href: string;
}

// 3. The updated array with English, Polish, and Thai
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: {
      en: "2026 AI Trading Strategies for NVDA: Chart & AI Analytics Guide",
      pl: "Strategie handlowe AI na rok 2026 dla NVDA: Przewodnik po wykresach i analityce AI",
      th: "กลยุทธ์การเทรดด้วย AI ปี 2026 สำหรับ NVDA: คู่มือกราฟและการวิเคราะห์ AI"
    },
    excerpt: {
      en: "Discover how AI analytics can optimize your NVDA trading strategies with advanced chart patterns.",
      pl: "Odkryj, jak analityka AI może zoptymalizować Twoje strategie handlowe NVDA dzięki zaawansowanym formacjom wykresów.",
      th: "ค้นพบว่าการวิเคราะห์ด้วย AI สามารถเพิ่มประสิทธิภาพกลยุทธ์การเทรด NVDA ของคุณด้วยรูปแบบกราฟขั้นสูงได้อย่างไร"
    },
    image: "/blog/post-1.jpg",
    href: "https://picsum.photos/400/300",
  },
  {
    id: 2,
    title: {
      en: "How to Trade XAUUSD Breakouts Using ATR and AI-empowered Tr...",
      pl: "Jak handlować wybiciami XAUUSD przy użyciu ATR i sztucznej inteligencji...",
      th: "วิธีเทรดการเบรกเอาต์ XAUUSD โดยใช้ ATR และ AI..."
    },
    excerpt: {
      en: "Learn the secrets of trading gold breakouts using Average True Range and AI tools.",
      pl: "Poznaj sekrety handlu wybiciami złota przy użyciu Average True Range i narzędzi AI.",
      th: "เรียนรู้เคล็ดลับการเทรดการเบรกเอาต์ของทองคำโดยใช้ Average True Range และเครื่องมือ AI"
    },
    image: "/blog/post-2.jpg",
    href: "/blog/trade-xauusd-breakouts",
  },
  {
    id: 3,
    title: {
      en: "PR News: Automate Trading Ideas in Seconds: TradeOS Launches...",
      pl: "Wiadomości PR: Automatyzuj pomysły handlowe w kilka sekund: Premiera TradeOS...",
      th: "ข่าว PR: ทำไอเดียการเทรดให้เป็นอัตโนมัติในไม่กี่วินาที: การเปิดตัว TradeOS..."
    },
    excerpt: {
      en: "TradeOS revolutionizes the market by allowing traders to automate complex strategies instantly.",
      pl: "TradeOS rewolucjonizuje rynek, pozwalając traderom na natychmiastową automatyzację złożonych strategii.",
      th: "TradeOS ปฏิวัติวงการตลาดด้วยการให้เทรดเดอร์สามารถสร้างกลยุทธ์ที่ซับซ้อนแบบอัตโนมัติได้ในทันที"
    },
    image: "/blog/post-3.jpg",
    href: "/blog/tradeos-launches",
  },
  {
    id: 4,
    title: {
      en: "Trading Signals Ai x DEXTools: Turn Real-Time Data Into 24/7 Ch...",
      pl: "Trading Signals Ai x DEXTools: Zamień dane w czasie rzeczywistym na wykresy 24/7...",
      th: "Trading Signals Ai x DEXTools: เปลี่ยนข้อมูลเรียลไทม์เป็นกราฟ 24/7..."
    },
    excerpt: {
      en: "Maximize your crypto profits by turning real-time DEXTools data into actionable AI charts.",
      pl: "Zmaksymalizuj swoje zyski z kryptowalut, zamieniając dane DEXTools w czasie rzeczywistym na praktyczne wykresy AI.",
      th: "เพิ่มผลกำไรคริปโตของคุณให้สูงสุดด้วยการเปลี่ยนข้อมูล DEXTools แบบเรียลไทม์เป็นกราฟ AI ที่นำไปใช้ได้จริง"
    },
    image: "/blog/post-4.jpg",
    href: "/blog/trading-signals-dextools",
  },
  {
    id: 5,
    title: {
      en: "Trading Signals Ai Hosts AI Payments AMA Exploring the Ne...",
      pl: "Trading Signals Ai organizuje AMA o płatnościach AI, badając nowe...",
      th: "Trading Signals Ai จัดกิจกรรม AMA การชำระเงินด้วย AI เพื่อสำรวจสิ่งใหม่..."
    },
    excerpt: {
      en: "Join our AMA session as we dive deep into the future of AI-driven payment solutions.",
      pl: "Dołącz do naszej sesji AMA, podczas której zagłębimy się w przyszłość rozwiązań płatniczych opartych na sztucznej inteligencji.",
      th: "เข้าร่วมเซสชั่น AMA ของเราในขณะที่เราเจาะลึกถึงอนาคตของโซลูชันการชำระเงินที่ขับเคลื่อนด้วย AI"
    },
    image: "/blog/post-5.jpg",
    href: "/blog/ai-payments-ama",
  },
  {
    id: 6,
    title: {
      en: "OpenClaw and Moltbook Are Going Viral—Here's the Missing L...",
      pl: "OpenClaw i Moltbook stają się viralami – oto brakujący element...",
      th: "OpenClaw และ Moltbook กำลังเป็นไวรัล — นี่คือส่วนที่ขาดหายไป..."
    },
    excerpt: {
      en: "Understand the hype behind OpenClaw and Moltbook, and find the missing piece to your portfolio.",
      pl: "Zrozum szum wokół OpenClaw i Moltbook i znajdź brakujący element swojego portfela.",
      th: "ทำความเข้าใจกระแสความนิยมของ OpenClaw และ Moltbook และค้นหาส่วนที่ขาดหายไปในพอร์ตโฟลิโอของคุณ"
    },
    image: "/blog/post-6.jpg",
    href: "/blog/openclaw-moltbook-viral",
  },
  {
    id: 7,
    title: {
      en: "Trading Signals Ai AI Startup Pitch Rewards Winning at Token2049...",
      pl: "Nagrody w konkursie startupów AI Trading Signals Ai na Token2049...",
      th: "รางวัลการประกวดสตาร์ทอัพ AI ของ Trading Signals Ai ที่ Token2049..."
    },
    excerpt: {
      en: "We celebrate our recent victory and pitch rewards at the prestigious Token2049 event.",
      pl: "Świętujemy nasze niedawne zwycięstwo i nagrody w prestiżowym wydarzeniu Token2049.",
      th: "เราเฉลิมฉลองชัยชนะล่าสุดและรางวัลการนำเสนอที่งาน Token2049 อันทรงเกียรติ"
    },
    image: "/blog/post-7.jpg",
    href: "/blog/token2049-pitch-rewards",
  },
  {
    id: 8,
    title: {
      en: "Blockchain-Powered Agentic Marketplace Revolution: TradeO...",
      pl: "Rewolucja na rynku agentów oparta na technologii blockchain: TradeO...",
      th: "การปฏิวัติตลาดตัวแทนที่ขับเคลื่อนด้วยบล็อกเชน: TradeO..."
    },
    excerpt: {
      en: "Explore how blockchain is transforming agentic marketplaces with the latest TradeOS update.",
      pl: "Dowiedz się, jak technologia blockchain przekształca rynki agentów dzięki najnowszej aktualizacji TradeOS.",
      th: "สำรวจว่าบล็อกเชนกำลังเปลี่ยนแปลงตลาดตัวแทนอย่างไรด้วยการอัปเดตล่าสุดของ TradeOS"
    },
    image: "/blog/post-8.jpg",
    href: "/blog/blockchain-agentic-marketplace",
  },
];

function BlogCard({ post }: { post: BlogPost }) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0] as keyof MultilingualText;
  
  const currentTitle = post.title[lang] || post.title.en;
  const currentExcerpt = post.excerpt[lang] || post.excerpt.en;

  return (
    <div className="flex flex-col gap-3 group ">
      {/* Image */}
      <Link href="/blogs/2026-ai-trading-strategies-nvda">

        <div className="w-full aspect-[17/11] rounded-lg overflow-hidden bg-[#111827] relative"
        >
          {/* <Image
          src={post.image}
          alt={currentTitle}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        /> */}
          <img src={`https://picsum.photos/400/300?random=${post.id}`} alt={currentTitle} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-semibold text-[15px] xl:text-lg 2xl:text-xl leading-snug line-clamp-2">
          {currentTitle}
        </h3>
        <p className="text-gray-400 text-sm xl:text-base 2xl:text-lg leading-relaxed line-clamp-3">
          {currentExcerpt}
        </p>
        <Link
          href={`/blogs/2026-ai-trading-strategies-nvda`}
          className="text-white text-sm xl:text-base 2xl:text-lg font-medium underline underline-offset-2 hover:text-blue-400 transition-colors duration-200 mt-1 w-fit "
        >
          {t("blog.viewMore")}
        </Link>
      </div>
    </div>
  );
}

export default function BlogListing() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Small delay lets the scroll settle before fading in
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#010B24] min-h-screen py-12 lg:px-7 font-hoves"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-white text-4xl xl:text-5xl 2xl:text-6xl font-semibold mb-3 font-hoves"
          >
            {t("blog.title")}
          </h1>
          <p className="text-gray-400 text-sm xl:text-base 2xl:text-lg font-hoves"
          >
            {t("blog.description")}
          </p>
        </div>

        {/* Grid — top 6 posts in 3-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {blogPosts.slice(0, 8).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Learn More button */}
        <div className="flex justify-center">
          <button className="px-8 py-2.5 xl:px-10 xl:py-3 h-13 xl:h-14 rounded-full border border-white text-white text-md xl:text-lg 2xl:text-xl font-medium hover:bg-white hover:text-[#000000] transition-colors duration-200 cursor-pointer">
            {t("blog.cta")}
          </button>
        </div>
      </div>
    </section>
  );
}