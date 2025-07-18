import { ethers } from 'ethers';

const UNISWAP_POOL = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640';
const SWAP_EVENT_SIG = ethers.id("Swap(address,address,int256,int256,uint160,uint128,int24)");

export async function getEthUsdPrice(provider) {
  const latestBlock = await provider.getBlockNumber();
  const logs = await provider.getLogs({
    address: UNISWAP_POOL,
    fromBlock: latestBlock - 5,
    toBlock: latestBlock,
    topics: [SWAP_EVENT_SIG],
  });

  if (logs.length === 0) {
    return null;
  }

  const lastLog = logs[logs.length - 1];
  const iface = new ethers.Interface([
    "event Swap(address sender, address recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)"
  ]);
  const decoded = iface.parseLog(lastLog);

  const sqrtPriceX96 = decoded.args.sqrtPriceX96;
  const price = (sqrtPriceX96 ** 2n * 10n ** 12n) / (2n ** 192n);
  return Number(price) / 1e6;
}
