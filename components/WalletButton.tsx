import React from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import { WalletInfo } from '../types';

interface WalletButtonProps {
  wallet: WalletInfo;
  onConnect: () => void;
  isLoading: boolean;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ wallet, onConnect, isLoading }) => {
  if (wallet.isConnected && wallet.address) {
    return (
      <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 shadow-lg shadow-iota/5 ring-1 ring-white/5">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Đã kết nối</span>
          <span className="text-sm font-mono text-iota-light font-bold">
            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
          </span>
        </div>
        <div className="h-8 w-px bg-zinc-800 mx-1"></div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-white text-lg">{wallet.balance}</span>
          <span className="text-[10px] font-bold text-iota bg-iota/10 px-1.5 py-0.5 rounded">MI</span>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={isLoading}
      className="group relative flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 px-6 py-2.5 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4 text-iota" />}
      <span>{isLoading ? 'Đang kết nối...' : 'Kết nối Ví'}</span>
    </button>
  );
};