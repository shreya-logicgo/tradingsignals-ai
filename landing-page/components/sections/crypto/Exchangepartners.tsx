"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/utils/animations";
import Container from "@/components/common/container/Container";
import { useRouter } from "next/navigation";

interface Exchange {
  name: string;
  descKey: string;
  logo: string;
  link: string;
  pageLink?: string;
}

const exchanges: Exchange[] = [
  {
    name: "Binance",
    descKey: "exchangePartners.exchanges.binance",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png",
    link: "https://accounts.binance.com/en/register?ref=38024889",
    pageLink: "/how-it-works/binance",
  },
  // {
  //   name: "Binance Futures",
  //   descKey: "exchangePartners.exchanges.binanceFutures",
  //   logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png",
  //   link: "https://accounts.binance.com/en/register?ref=38024889",
  // },
  {
    name: "Bybit UTA",
    descKey: "exchangePartners.exchanges.bybitUta",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/521.png",
    link: "https://www.bybit.com",
    pageLink: "/how-it-works/bybit",
  },
  {
    name: "Bitget Spot",
    descKey: "exchangePartners.exchanges.bitgetSpot",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/513.png",
    link: "https://www.bitget.com/",
  },
  {
    name: "Bitget Futures",
    descKey: "exchangePartners.exchanges.bitgetFutures",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/513.png",
    link: "https://www.bitget.com/",
  },
  {
    name: "MEXC",
    descKey: "exchangePartners.exchanges.mexc",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/544.png",
    link: "https://www.mexc.com/",
  },
  {
    name: "OKX",
    descKey: "exchangePartners.exchanges.okx",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png",
    link: "https://www.okx.com/join/1839944",
  },
  {
    name: "KuCoin",
    descKey: "exchangePartners.exchanges.kucoin",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/311.png",
    link: "https://www.kucoin.com/ucenter/signup?rcode=rBBECG6",
  },
  {
    name: "HTX",
    descKey: "exchangePartners.exchanges.htx",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/102.png",
    link: "https://www.htx.com/en-us/",
  },
  {
    name: "Blofin Futures",
    descKey: "exchangePartners.exchanges.blofin",
    logo: "/blofin.svg",
    link: "https://www.blofin.com/",
  },
  {
    name: "Bitfinex",
    descKey: "exchangePartners.exchanges.bitfinex",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/37.png",
    link: "https://bitfinex.com/?refcode=TxQqcB-OY",
  },
  {
    name: "Kraken",
    descKey: "exchangePartners.exchanges.kraken",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/24.png",
    link: "https://www.kraken.com/en-us",
  },
  {
    name: "Gate.io",
    descKey: "exchangePartners.exchanges.gate",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/302.png",
    link: "https://www.gate.io/signup/2794924",
  },
  {
    name: "Exmo",
    descKey: "exchangePartners.exchanges.exmo",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/50.png",
    link: "https://exmo.com/?ref=1719109",
  },
  {
    name: "XT",
    descKey: "exchangePartners.exchanges.xt",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/525.png",
    link: "https://www.xt.com/en/accounts/register?ref=HSI5J2",
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────

function ExchangeCard({ exchange }: { exchange: Exchange }) {
  const [imgError, setImgError] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <motion.div
      variants={fadeUpVariant}
      // href={exchange.link}
      // target="_blank"
      // rel="noopener noreferrer"
      className="
        group
        flex flex-col justify-between gap-6
        w-full  p-6 rounded-[10px]
        bg-[#0E172F] border border-[#182138]
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:border-[#182853]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]
        no-underline  font-hoves z-1
      "
    >
      {/* Top content */}
      <div className="flex flex-col gap-4">
        {/* Logo */}
        <div
          className="
            w-[50px] h-[50px] rounded-full mb-[10px] shrink-0
            flex items-center justify-center
            bg-[#000000] overflow-hidden
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
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">

          <div className="text-[19px] text-white font-hoves mb-1 ">
            {exchange.name}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm  text-[#C7CCD2] font-hoves leading-5 sm:h-min-12 max-h-14 overflow-clip">
            {t(exchange.descKey)}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
  onClick={() =>
    router.push(exchange.pageLink || exchange.link)
  }
  className="
    flex items-center justify-center w-full py-3 
    text-sm md:text-base lg:text-lg text-white
    bg-[#010B24] border border-white/10
    transition-all duration-150 rounded-full
    hover:opacity-90 cursor-pointer
  "
>
  {t("exchangePartners.cta")}
</button>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ExchangePartners() {
  const { t } = useTranslation();

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="section-pt section-pb bg-[linear-gradient(0deg,_#0012B8%,_#0012B8_75%,_#0012B8_100%)]"
    >
      <Container>

        {/* Badge */}
        <motion.span
          variants={fadeUpVariant}
          className="
            inline-block mb-3  pb-1  
            text-[15px] tracking-widest uppercase text-vivid-cyan lg:text-start w-fit text-center
            rounded-full font-mono
          "
        >
          {t("exchangePartners.badge")}
        </motion.span>

        {/* Header row */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-8 mb-2"
        >
          <h2 className="text-[30px] max-w-80 font-hoves sm:text-[34px] lg:text-[40px] text-white leading-tight tracking-tight">
            {t("exchangePartners.title")}
          </h2>
          <p className="sm:max-w-[480px] text-[#C7CCD2] font-hoves text-[13px] sm:text-[18px]  ">
            {t("exchangePartners.desc")}
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariant}
          className="text-[#C7CCD2]  text-[13px] sm:text-[18px] mb-10 lg:mb-11 font-hoves "
        >
          {t("exchangePartners.subtitle")}
        </motion.p>

        {/* Grid */}
        <div
          className="
            grid gap-4 3xl:gap-5
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

      </Container>
    </motion.section>
  );
}