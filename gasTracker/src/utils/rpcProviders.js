import { WebSocketProvider } from 'ethers';

const ALCHEMY_KEY = 'XYXwc_4T688Q_PnQNk5w8y1rQPJQQbFL';

export const ethereumProvider = new WebSocketProvider(
  `wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
);
export const polygonProvider = new WebSocketProvider(
  `wss://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
);
export const arbitrumProvider = new WebSocketProvider(
  `wss://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
);
