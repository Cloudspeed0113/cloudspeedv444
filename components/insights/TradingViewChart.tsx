"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

type TradingViewChartProps = {
  symbol?: string;
  interval?: string;
  theme?: "light" | "dark";
  height?: number;
};

export default function TradingViewChart({
  symbol = "OANDA:XAUUSD",
  interval = "60",
  theme = "dark",
  height = 420,
}: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol,
          interval,
          theme,
          timezone: "Etc/UTC",
          style: "1",
          locale: "en",
          toolbar_bg: "#000000",
          enable_publishing: false,
          hide_legend: false,
          container_id: "tradingview_container",
        });
      }
    };

    container.current.appendChild(script);

    return () => {
      container.current!.innerHTML = "";
    };
  }, [symbol, interval, theme]);

  return (
    <div
      id="tradingview_container"
      ref={container}
      style={{ width: "100%", height }}
    />
  );
}
