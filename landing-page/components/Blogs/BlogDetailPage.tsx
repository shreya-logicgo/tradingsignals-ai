// app/blog/[slug]/page.tsx
// ─── Usage ────────────────────────────────────────────────────────────────────
// This page is fully dynamic. Pass any `BlogPost` object and every
// content block type (paragraph, heading, image, chart, quote, list,
// divider, callout) will render automatically via <BlogContent />.
//
// To fetch real data, replace `getPostBySlug(slug)` with your CMS / API call.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import BlogContent from "@/components/Blogs/Blogcontent";
import BlogDetailView from "@/components/Blogs/BlogDetailView";
import { BlogPostDetail } from "./blog";
import symbollogo from "@/assets/images/symbol-logo.png";
import NoiseOverlay from "../NoiseOverlay";
// import type { BlogPost } from "./blog";

// ─── Mock data fetch (replace with real CMS / API call) ──────────────────────
async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  // TODO: fetch from your API/CMS here
  // e.g.  return await fetch(`/api/blog/${slug}`).then(r => r.json())
  const MOCK_POST: BlogPostDetail = {
  slug: "2026-ai-trading-strategies-nvda",
  title: {
    en: "2026 AI Trading Strategies for NVDA: Chart & AI Analytics Guide",
    pl: "Strategie handlowe AI na rok 2026 dla NVDA: Przewodnik po wykresach i analityce AI",
    th: "กลยุทธ์การเทรดด้วย AI ปี 2026 สำหรับ NVDA: คู่มือกราฟและการวิเคราะห์ AI"
  },
  author: { name: "TradingSignals AI", avatar: symbollogo },
  publishedAt: "2025-05-15",
  content: [
    {
      type: "paragraph",
      text: {
        en: "NVIDIA (NVDA) remains the undisputed heavyweight of the market in 2026. The massive daily volume and price swings offer incredible opportunities, but they often move faster than human reaction times. You don't need a Wall Street background to trade NVDA successfully; you just need a practical strategy, a disciplined workflow, and a reliable AI trading assistant to keep you ahead of the curve.",
        pl: "NVIDIA (NVDA) pozostaje niekwestionowanym liderem rynku w 2026 roku. Ogromny dzienny wolumen i wahania cen oferują niesamowite możliwości, ale często poruszają się szybciej niż czas ludzkiej reakcji. Nie potrzebujesz doświadczenia z Wall Street, aby odnosić sukcesy w handlu NVDA; potrzebujesz tylko praktycznej strategii, zdyscyplinowanego przepływu pracy i niezawodnego asystenta handlowego AI, aby być o krok do przodu.",
        th: "NVIDIA (NVDA) ยังคงเป็นผู้นำตลาดที่ไร้ข้อกังขาในปี 2026 ปริมาณการซื้อขายรายวันและการแกว่งตัวของราคาที่มหาศาลมอบโอกาสที่น่าทึ่ง แต่มักจะเคลื่อนไหวเร็วกว่าเวลาตอบสนองของมนุษย์ คุณไม่จำเป็นต้องมีพื้นฐานจาก Wall Street เพื่อเทรด NVDA ให้ประสบความสำเร็จ คุณเพียงแค่ต้องมีกลยุทธ์ที่ใช้ได้จริง ขั้นตอนการทำงานที่มีระเบียบวินัย และผู้ช่วยเทรด AI ที่เชื่อถือได้เพื่อให้คุณนำหน้าอยู่เสมอ"
      }
    },
    {
      type: "chart",
      component: null, // swap in your real chart component
    },
    {
      type: "paragraph",
      text: {
        en: "Why is AI essential for NVDA? The semiconductor sector is highly volatile. In this guide, we'll explore the various AI-driven indicators that can help you navigate NVDA's price action.",
        pl: "Dlaczego sztuczna inteligencja jest niezbędna dla NVDA? Sektor półprzewodników charakteryzuje się dużą zmiennością. W tym przewodniku zbadamy różne wskaźniki oparte na sztucznej inteligencji, które pomogą Ci poruszać się po akcji cenowej NVDA.",
        th: "เหตุใด AI จึงมีความสำคัญต่อ NVDA? ภาคส่วนเซมิคอนดักเตอร์มีความผันผวนสูง ในคู่มือนี้ เราจะสำรวจตัวบ่งชี้ที่ขับเคลื่อนด้วย AI ต่างๆ ที่สามารถช่วยคุณนำทางความเคลื่อนไหวของราคาของ NVDA"
      }
    },
    {
      type: "heading",
      level: 2,
      text: {
        en: "Understanding AI Order Flow",
        pl: "Zrozumienie przepływu zamówień AI (Order Flow)",
        th: "ทำความเข้าใจ AI Order Flow (กระแสคำสั่งซื้อขาย)"
      }
    },
    {
      type: "paragraph",
      text: {
        en: "AI tools analyze massive amounts of order flow data in real-time. They track institutional buying and selling pressure, allowing retail traders to spot momentum shifts before they appear on standard price charts.",
        pl: "Narzędzia AI analizują ogromne ilości danych o przepływie zamówień w czasie rzeczywistym. Śledzą instytucjonalną presję kupna i sprzedaży, co pozwala inwestorom detalicznym dostrzec zmiany momentum, zanim pojawią się na standardowych wykresach cenowych.",
        th: "เครื่องมือ AI วิเคราะห์ข้อมูลกระแสคำสั่งซื้อขายจำนวนมหาศาลแบบเรียลไทม์ เครื่องมือเหล่านี้ติดตามแรงกดดันในการซื้อและขายของสถาบัน ช่วยให้เทรดเดอร์รายย่อยสามารถตรวจจับการเปลี่ยนแปลงของโมเมนตัมก่อนที่จะปรากฏบนกราฟราคามาตรฐาน"
      }
    },
    {
      type: "paragraph",
      text: {
        en: "This gives traders a significant edge. We will break down the top two AI indicators you should add to your trading routine.",
        pl: "Daje to traderom znaczącą przewagę. Omówimy dwa najważniejsze wskaźniki AI, które powinieneś dodać do swojej rutyny handlowej.",
        th: "สิ่งนี้ทำให้เทรดเดอร์ได้เปรียบอย่างมาก เราจะแจกแจงตัวบ่งชี้ AI สองอันดับแรกที่คุณควรเพิ่มลงในกิจวัตรการเทรดของคุณ"
      }
    },
    {
      type: "heading",
      level: 3,
      text: {
        en: "1. Predictive Volume Analysis",
        pl: "1. Przewidywana analiza wolumenu",
        th: "1. การวิเคราะห์ปริมาณการซื้อขายเชิงคาดการณ์"
      }
    },
    {
      type: "paragraph",
      text: {
        en: "First, you must understand volume. Traditional volume indicators show what has already happened. AI predictive models, however, analyze historical patterns to forecast volume spikes.",
        pl: "Po pierwsze, musisz zrozumieć wolumen. Tradycyjne wskaźniki wolumenu pokazują, co już się wydarzyło. Modele predykcyjne AI analizują jednak historyczne wzorce, aby prognozować skoki wolumenu.",
        th: "ประการแรก คุณต้องเข้าใจปริมาณการซื้อขาย (Volume) ตัวบ่งชี้ปริมาณแบบดั้งเดิมจะแสดงสิ่งที่เกิดขึ้นไปแล้ว อย่างไรก็ตาม โมเดลการคาดการณ์ของ AI จะวิเคราะห์รูปแบบในอดีตเพื่อพยากรณ์การพุ่งขึ้นของปริมาณ"
      }
    },
    {
      type: "paragraph",
      text: {
        en: "This is especially effective for trading the market open or during major tech earnings announcements.",
        pl: "Jest to szczególnie skuteczne podczas handlu na otwarciu rynku lub podczas głównych ogłoszeń o zyskach firm technologicznych.",
        th: "วิธีนี้มีประสิทธิภาพอย่างยิ่งสำหรับการเทรดในช่วงเปิดตลาดหรือระหว่างการประกาศผลประกอบการของบริษัทเทคโนโลยีขนาดใหญ่"
      }
    },
    {
      type: "heading",
      level: 3,
      text: {
        en: "2. Algorithmic Trend Detection",
        pl: "2. Algorytmiczne wykrywanie trendów",
        th: "2. การตรวจจับแนวโน้มด้วยอัลกอริทึม"
      }
    },
    {
      type: "paragraph",
      text: {
        en: "False breakouts are incredibly annoying. Think of buying a resistance break, only for the price to instantly reverse.",
        pl: "Fałszywe wybicia są niezwykle irytujące. Pomyśl o kupnie po przebiciu oporu tylko po to, by cena natychmiast się odwróciła.",
        th: "การเบรกเอาต์หลอก (False breakouts) เป็นสิ่งที่น่ารำคาญอย่างยิ่ง ลองนึกถึงการซื้อเมื่อราคาทะลุแนวต้าน แต่ราคากลับตัวในทันที"
      }
    },
    {
      type: "paragraph",
      text: {
        en: "AI trend detection algorithms filter out the market noise. They use machine learning to differentiate between a genuine breakout and a liquidity grab.",
        pl: "Algorytmy wykrywania trendów AI filtrują szum rynkowy. Wykorzystują uczenie maszynowe, aby odróżnić prawdziwe wybicie od polowania na płynność (liquidity grab).",
        th: "อัลกอริทึมตรวจจับแนวโน้มของ AI จะกรองสัญญาณรบกวนของตลาดออกไป พวกเขาใช้การเรียนรู้ของเครื่อง (Machine Learning) เพื่อแยกความแตกต่างระหว่างการเบรกเอาต์ของจริงและการกวาดสภาพคล่อง (Liquidity grab)"
      }
    },
    {
      type: "paragraph",
      text: {
        en: "By incorporating these AI models, you are effectively trading alongside the algorithms rather than against them.",
        pl: "Włączając te modele AI, skutecznie handlujesz razem z algorytmami, a nie przeciwko nim.",
        th: "ด้วยการรวมโมเดล AI เหล่านี้เข้าด้วยกัน คุณกำลังเทรดไปพร้อมกับอัลกอริทึมอย่างมีประสิทธิภาพ แทนที่จะเทรดสวนทางกับพวกมัน"
      }
    }
  ],
  tags: [
    { en: "AI Trading", pl: "Handel AI", th: "การเทรดด้วย AI" },
    { en: "NVDA", pl: "NVDA", th: "NVDA" },
    { en: "Strategies", pl: "Strategie", th: "กลยุทธ์" }
  ],
  readingTime: 6,
};

  if (slug === MOCK_POST.slug) return MOCK_POST;
  return null;
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title.en} | Trading Signals AI`,
    description: post.title.en,
  };
}

// ─── Inline chart placeholder (swap with your real chart) ────────────────────
function NvdaChartPlaceholder() {
  return (
    <div className="bg-[#0d1117] rounded-xl border border-white/10 p-5">
      <p className="text-white font-semibold text-sm mb-4">NVDA Share Price Performance</p>

      {/* Stats row */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mb-4">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00e676] inline-block" />
            <span className="text-white font-bold text-lg">US$175.02</span>
          </div>
          <div className="text-[#00e676] text-xs mt-0.5">
            ↗ 40.77 (30.37%)&nbsp;
            <span className="text-gray-500">30.1% undervalued</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff4081] inline-block" />
            <span className="text-white font-bold text-lg">US$250.39</span>
          </div>
          <div className="text-gray-500 text-xs mt-0.5">Fair Value</div>
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm text-gray-500 self-start pt-1">
          {["7D", "3M", "1Y", "MAX"].map((t) => (
            <button
              key={t}
              className={`hover:text-white transition-colors ${t === "1Y" ? "text-white font-semibold" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SVG chart lines */}
      <div className="w-full overflow-hidden rounded-lg" style={{ height: 180 }}>
        <svg viewBox="0 0 700 180" preserveAspectRatio="none" className="w-full h-full">
          {/* Fair value line (pink) */}
          <polyline
            points="0,140 60,138 120,130 180,120 240,115 300,100 360,85 420,78 480,72 540,65 600,60 660,55 700,52"
            fill="none"
            stroke="#ff4081"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          {/* Price line (green) */}
          <polyline
            points="0,165 30,162 60,158 80,155 100,160 120,150 140,145 160,148 180,140 200,135 220,138 240,130 260,125 280,128 300,118 320,112 340,110 360,105 380,108 400,100 420,95 440,98 460,90 480,88 500,92 520,85 540,82 560,88 580,84 600,78 630,80 660,75 700,72"
            fill="none"
            stroke="#00e676"
            strokeWidth="2"
          />
          {/* End labels */}
          <text x="660" y="49" fill="#ff4081" fontSize="10" fontFamily="monospace">US$250.39</text>
          <text x="660" y="70" fill="#00e676" fontSize="10" fontFamily="monospace">US$175.02</text>
        </svg>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostBySlug(params.id);
  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Inject real chart component into chart blocks
  const enrichedContent = post.content.map((block) =>
    block.type === "chart"
      ? { ...block, component: <NvdaChartPlaceholder /> }
      : block
  );

  return (
    <div className="bg-[#010B24] min-h-screen flex flex-col lg:mt-28 font-hoves"
    >
      {/* <Navbar /> */}
      <NoiseOverlay/>

      <main className="flex-1">
          {/* Client-side Translated Content Viewer */}
          <BlogDetailView post={post} formattedDate={formattedDate} enrichedContent={enrichedContent} />
      </main>

      {/* <Footer /> */}
    </div>
  );
}