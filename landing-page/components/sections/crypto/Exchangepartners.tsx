import { useState } from "react";

interface Exchange {
  name: string;
  desc: string;
  logo: string;
  link: string;
}

const exchanges: Exchange[] = [
  {
    name: "Binance",
    desc: "World's largest crypto exchange with high liquidity and advanced trading tools.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png",
    link: "https://www.binance.com/en/register?ref=YOUR_REF",
  },
  {
    name: "Bitget",
    desc: "Known for copy trading and powerful crypto derivatives trading.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/513.png",
    link: "https://www.bitget.com/en/referral?from=YOUR_REF",
  },
  {
    name: "Bybit",
    desc: "A popular platform for fast crypto derivatives trading and professional tools.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/521.png",
    link: "https://www.bybit.com/en/invite?ref=YOUR_REF",
  },
  {
    name: "Gate.io",
    desc: "A secure platform offering a wide range of digital asset trading options.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/302.png",
    link: "https://www.gate.io/signup/YOUR_REF",
  },
  {
    name: "OKX",
    desc: "A global crypto exchange offering spot, futures, and DeFi trading services.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png",
    link: "https://www.okx.com/join/YOUR_REF",
  },
  {
    name: "MEXC",
    desc: "A fast-growing exchange offering diverse crypto assets and low trading fees.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/544.png",
    link: "https://www.mexc.com/register?inviteCode=YOUR_REF",
  },
  {
    name: "KuCoin",
    desc: "A trusted exchange with hundreds of cryptocurrencies and advanced features.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/311.png",
    link: "https://www.kucoin.com/ucenter/signup?rcode=YOUR_REF",
  },
  {
    name: "Kraken",
    desc: "A reliable crypto exchange known for strong security and transparency.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/24.png",
    link: "https://www.kraken.com/sign-up?ref=YOUR_REF",
  },
  {
    name: "Coinbase",
    desc: "A leading regulated exchange trusted by millions for simple crypto investing.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png",
    link: "https://www.coinbase.com/join/YOUR_REF",
  },
  {
    name: "Huobi",
    desc: "A veteran exchange with deep liquidity and comprehensive trading products.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/102.png",
    link: "https://www.huobi.com/en-us/register/?invite_code=YOUR_REF",
  },
  {
    name: "Crypto.com",
    desc: "Pay, trade, and earn crypto rewards with one of the most feature-rich platforms.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/338.png",
    link: "https://crypto.com/app/YOUR_REF",
  },
  {
    name: "Bitfinex",
    desc: "Advanced trading tools and deep liquidity for professional crypto traders.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/37.png",
    link: "https://www.bitfinex.com/sign-up?refcode=YOUR_REF",
  },
  {
    name: "Gemini",
    desc: "A SOC 2-certified exchange built with institutional-grade security and compliance.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/151.png",
    link: "https://www.gemini.com/share/YOUR_REF",
  },
  {
    name: "Phemex",
    desc: "High-speed derivatives and spot trading with zero fees on select pairs.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/524.png",
    link: "https://phemex.com/register?referralCode=YOUR_REF",
  },
  {
    name: "Poloniex",
    desc: "A seasoned exchange offering margin trading and a wide selection of altcoins.",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/22.png",
    link: "https://poloniex.com/signup?c=YOUR_REF",
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────

function ExchangeCard({ exchange }: { exchange: Exchange }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={exchange.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex flex-col justify-between
        w-full h-[276px] p-6 rounded-[10px]
        bg-[#0E172F] border border-[#182138]
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:border-[#2E4278]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]
        no-underline
      "
    >
      {/* Top content */}
      <div className="flex flex-col">
        {/* Logo */}
        <div
          className="
            w-[52px] h-[52px] rounded-[14px] mb-[18px] shrink-0
            flex items-center justify-center
            bg-[#131E38] border border-[#1E2E4A] overflow-hidden
          "
        >
          {imgError ? (
            <span className="text-xl font-bold text-white">
              {exchange.name[0]}
            </span>
          ) : (
            <img
              src={exchange.logo}
              alt={`${exchange.name} logo`}
              width={36}
              height={36}
              className="object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Name */}
        <p className="text-[16px] font-semibold text-[#E8EDF7] mb-2 tracking-tight">
          {exchange.name}
        </p>

        {/* Description */}
        <p className="text-[12.5px] text-[#5A7099] leading-[1.65]">
          {exchange.desc}
        </p>
      </div>

      {/* CTA Button */}
      <span
        className="
          flex items-center justify-center w-full py-[11px] mt-4
          rounded-lg text-[13px] font-medium text-[#C8D6F0]
          bg-[#111D35] border border-[#1E2E50]
          transition-all duration-150
          group-hover:bg-[#1A2D52] group-hover:border-[#2E4478] group-hover:text-white
        "
      >
        Create Account
      </span>
    </a>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ExchangePartners() {
  return (
    <section className="bg-[#060D1F] w-full px-5 sm:px-8 lg:px-10 py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto">

        {/* Badge */}
        <span
          className="
            inline-block mb-5 px-3.5 py-1
            text-[11px] tracking-[0.12em] uppercase text-[#8A9BBE]
            border border-[#2A3A5C] rounded-full
          "
        >
          Exchange Partners
        </span>

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-10 mb-2">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-white leading-tight tracking-tight">
            Supported Crypto<br />Exchanges
          </h2>
          <p className="sm:max-w-[380px] text-[#8A9BBE] text-[13px] sm:text-[13.5px] leading-relaxed italic sm:pt-1 shrink-0">
            "If you don't have a crypto account, you can sign up using our
            supported exchange partners"
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-[#4E6080] text-[13px] mb-10 lg:mb-11">
          Our platform is connected with 15 different exchanges
        </p>

        {/* Grid */}
        <div
          className="
            grid gap-[25px]
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {exchanges.map((exchange) => (
            <ExchangeCard key={exchange.name} exchange={exchange} />
          ))}
        </div>

        {/* Explore More */}
        <div className="flex justify-center mt-12">
          <button
            className="
              px-9 py-3 rounded-full text-[14px] text-[#8A9BBE]
              border border-[#2A3A5C] bg-transparent
              transition-all duration-200
              hover:border-[#4A6AA0] hover:text-white hover:bg-[#0E172F]
              cursor-pointer
            "
          >
            Explore More
          </button>
        </div>

      </div>
    </section>
  );
}