import { create } from 'zustand';

export const useGasStore = create((set) => ({
  mode: 'live',
  usdPrice: 3000,   // Default fallback
  chains: {
    ethereum: {
      baseFee: 0,
      priorityFee: 2,
      history: [], // array of { time, open, high, low, close }
    },
    polygon: {
      baseFee: 0,
      priorityFee: 2,
      history: [],
    },
    arbitrum: {
      baseFee: 0,
      priorityFee: 2,
      history: [],
    },
  },
  setMode: (mode) => set({ mode }),
  setUsdPrice: (price) => set({ usdPrice: price }),
  updateChainData: (chain, data) =>
    set((state) => {
      const prev = state.chains[chain];
      return {
        chains: {
          ...state.chains,
          [chain]: { ...prev, ...data },
        },
      };
    }),
  addHistoryPoint: (chain, point) =>
    set((state) => {
      const prev = state.chains[chain].history;
      return {
        chains: {
          ...state.chains,
          [chain]: {
            ...state.chains[chain],
            history: [...prev, point],
          },
        },
      };
    }),
}));
