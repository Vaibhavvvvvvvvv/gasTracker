import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { ethereumProvider, polygonProvider, arbitrumProvider } from './utils/rpcProviders';
import { getEthUsdPrice } from './utils/uniswapPriceFetcher';
import { useGasStore } from './store/gasStore';
import ModeSwitcher from './components/ModeSwitcher';
import UserInputForm from './components/UserInputForm';
import GasPriceChart from './components/GasPriceChart';

export default function App() {
  const updateChainData = useGasStore((s) => s.updateChainData);
  const setUsdPrice = useGasStore((s) => s.setUsdPrice);
  const addHistoryPoint = useGasStore((s) => s.addHistoryPoint);

  useEffect(() => {
    // Fetch gas data
    const setupProvider = (name, provider) => {
      provider.on('block', async (blockNumber) => {
        const block = await provider.getBlock(blockNumber);
        const base = Number(ethers.formatUnits(block.baseFeePerGas, 'gwei'));
        updateChainData(name, { baseFee: base, priorityFee: 2 });

        addHistoryPoint(name, {
          time: Math.floor(Date.now() / 1000),
          open: base,
          high: base + 5,
          low: base - 5,
          close: base
        });
      });
    };

    setupProvider('ethereum', ethereumProvider);
    setupProvider('polygon', polygonProvider);
    setupProvider('arbitrum', arbitrumProvider);

    // Price polling
    const priceInterval = setInterval(async () => {
      const price = await getEthUsdPrice(ethereumProvider);
      if (price) setUsdPrice(price);
    }, 10000);

    return () => clearInterval(priceInterval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>⛽ Real-Time Cross-Chain Gas Tracker</h1>
      <ModeSwitcher />
      <UserInputForm />
      <GasPriceChart />
    </div>
  );
}
