"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

type TradingViewChartProps = {
  /** TradingView 符号，例如 "OANDA:XAUUSD"、"ICMARKETS:EURUSD" 等 */
  symbol?: string;
  /** K 线周期，单位分钟，60=1H，240=4H，D=日线 */
  interval?: string;
  /** 主题：light / dark */
  theme?: "light" | "dark";
  /** 图表高度，默认 420px */
  height?: number;
};

export function TradingViewChart({
  symbol = "OANDA:XAUUSD",
  interval = "60",
  theme = "light",
  height = 420,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 清空容器，避免重复注入
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (!window.TradingView) return;

      const containerId = "tv_chart_container";

      // 创建一个内部 div 作为 chart 容器
      const chartContainer = document.createElement("div");
      chartContainer.id = containerId;
      chartContainer.style.width = "100%";
      chartContainer.style.height = `${height}px`;
      containerRef.current?.appendChild(chartContainer);

      // 初始化 TradingView 小组件
      // 文档：https://www.tradingview.com/widget/advanced-chart/
      /* eslint-disable */
      new window.TradingView.widget({
        container_id: containerId,
        symbol,
        interval,
        autosize: true,
        theme,
        style: "1",
        locale: "en", // 需要的话可以后面做多语言映射
        timezone: "Etc/UTC",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        hide_legend: false,
        hide_top_toolbar: false,
      });
      /* eslint-enable */
    };

    containerRef.current.appendChild(script);

    // 卸载时清理
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, interval, theme, height]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height,
        borderRadius: 16,
        overflow: "hidden",
      }}
    />
  );
}
