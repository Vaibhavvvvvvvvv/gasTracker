// GasPriceChart.jsx
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useGasStore } from '../store/gasStore'; // ✅ Make sure this is the correct path

const ChartSection = ({ title, data }) => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const candleSeriesRef = useRef(null);

  useEffect(() => {
    // Clean up previous chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#000000',
      },
      grid: {
        vertLines: { color: '#e0e0e0' },
        horzLines: { color: '#e0e0e0' },
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    chartInstanceRef.current = chart;
    candleSeriesRef.current = series;

    if (data && data.length > 0) {
      series.setData(data.slice(-50)); // Only latest 50 points
    }

    return () => chart.remove();
  }, []);

  useEffect(() => {
    if (candleSeriesRef.current && data && data.length > 0) {
      candleSeriesRef.current.setData(data.slice(-50));
    }
  }, [data]);

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default function GasPriceChart() {
  const chains = useGasStore((state) => state.chains);

  return (
    <div>
      <ChartSection title="Ethereum Gas Price" data={chains.ethereum.history} />
      <ChartSection title="Polygon Gas Price" data={chains.polygon.history} />
      <ChartSection title="Arbitrum Gas Price" data={chains.arbitrum.history} />
    </div>
  );
}
