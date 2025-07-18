import React from 'react';
import { useGasStore } from '../store/gasStore';

export default function ModeSwitcher() {
  const mode = useGasStore((s) => s.mode);
  const setMode = useGasStore((s) => s.setMode);

  return (
    <div style={{ margin: '10px 0' }}>
      <button onClick={() => setMode('live')} disabled={mode === 'live'}>
        Live Mode
      </button>
      <button onClick={() => setMode('simulation')} disabled={mode === 'simulation'}>
        Simulation Mode
      </button>
    </div>
  );
}
