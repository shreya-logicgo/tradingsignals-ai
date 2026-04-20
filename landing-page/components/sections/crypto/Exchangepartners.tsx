"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/utils/animations";

interface Exchange {
  name: string;
  descKey: string;
  logo: string;
  link: string;
}

const exchanges: Exchange[] = [
  {
    name: "Binance",
    descKey: "exchangePartners.exchanges.binance",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png",
    link: "https://accounts.binance.com/en/register?ref=38024889",
  },
  {
    name: "Binance Futures",
    descKey: "exchangePartners.exchanges.binanceFutures",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png",
    link: "https://accounts.binance.com/en/register?ref=38024889",
  },
  {
    name: "Bybit UTA",
    descKey: "exchangePartners.exchanges.bybitUta",
    logo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/521.png",
    link: "https://www.bybit.com",
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

  return (
    <motion.a
      variants={fadeUpVariant}
      href={exchange.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex flex-col justify-between
        w-full h-[276px] p-6 rounded-[10px]
        bg-[#0E172F] border border-[#182138]
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:border-[#182853]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]
        no-underline  font-hoves
      "
    >
      {/* Top content */}
      <div className="flex flex-col">
        {/* Logo */}
        <div
          className="
            w-[52px] h-[52px] rounded-full mb-[18px] shrink-0
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
        <div className="text-[20px] font-semibold text-white font-hoves mb-2 tracking-tight">
          {exchange.name}
        </div>

        {/* Description */}
        <p className="text-[16px] text-[#C7CCD2] font-hoves tracking-tighter leading-5 sm:h-min-16 max-h-16 overflow-clip">
          {t(exchange.descKey)}
        </p>
      </div>

      {/* CTA Button */}
      <span
        className="
          flex items-center justify-center w-full py-[11px] mt-2 mb-1
         text-[18px] font-medium text-[#FFFFFF]
          bg-[#010B24] border border-[#FFFFFF1A]
          transition-all duration-150 rounded-full  "
      >
        {t("exchangePartners.cta")}
      </span>
    </motion.a>
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
      className=" max-w-[1250px] mx-auto px-5 sm:px-8 lg:px-10 py-8 md:py-10 sm:mb-24"
    >
      <div className=" mx-auto">

        {/* Badge */}
        <motion.span
          variants={fadeUpVariant}
          className="
            inline-block mb-5  pb-1 
            text-[15px] tracking-[0.12em] uppercase text-vivid-cyan lg:text-start w-fit text-center
            rounded-full font-mono
          "
        >
          {t("exchangePartners.badge")}
        </motion.span>

        {/* Header row */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-10 mb-2"
        >
          <h2 className="text-[30px] max-w-80 font-hoves sm:text-[34px] lg:text-[38px] font-bold text-white leading-tight tracking-tight">
            {t("exchangePartners.title")}
          </h2>
          <p className="sm:max-w-[480px] text-[#C7CCD2] font-hoves text-[13px] sm:text-[20px] tracking-tight ">
            {t("exchangePartners.desc")}
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariant}
          className="text-[#C7CCD2]  text-[13px] sm:text-[20px] mb-10 lg:mb-11 font-hoves tracking-tighter"
        >
          {t("exchangePartners.subtitle")}
        </motion.p>

        {/* Grid */}
        <div
          className="
            grid gap-[13px]
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

      </div>
    </motion.section>
  );
}