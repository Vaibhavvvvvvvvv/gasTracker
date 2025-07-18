import React, { useState } from 'react';
import { useGasStore } from '../store/gasStore';

export default function UserInputForm() {
  const [amount, setAmount] = useState(0.5);
  const { chains, usdPrice, mode } = useGasStore();

  if (mode !== 'simulation') return null;

  const calcUSD = (baseFee, priorityFee) =>
    (baseFee + priorityFee) * 21000 * usdPrice / 1e9 * amount;

  return (
    <div>
      <h2>Simulation Mode</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Chain</th>
            <th>BaseFee (GWEI)</th>
            <th>PriorityFee (GWEI)</th>
            <th>USD Cost</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(chains).map(([chain, data]) => (
            <tr key={chain}>
              <td>{chain}</td>
              <td>{data.baseFee}</td>
              <td>{data.priorityFee}</td>
              <td>${calcUSD(data.baseFee, data.priorityFee).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
