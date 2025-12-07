import React from 'react';
import { GameResult } from '../types';
import { ExternalLink, CheckCircle2, XCircle } from 'lucide-react';

interface HistoryListProps {
  history: GameResult[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) {
    return <div className="text-center text-zinc-500 py-8 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">Chưa có dữ liệu trên Tangle.</div>;
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm">
      <div className="grid grid-cols-12 gap-2 p-3 bg-zinc-900/80 text-[10px] uppercase tracking-wider text-zinc-500 font-bold border-b border-zinc-800">
        <div className="col-span-2">Trạng thái</div>
        <div className="col-span-2 text-center">Đoán/Thực</div>
        <div className="col-span-3 text-center">Cược/Thưởng</div>
        <div className="col-span-5 text-right">Tangle ID</div>
      </div>
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {history.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 p-3 border-b border-zinc-800/50 hover:bg-zinc-800/40 transition-colors items-center group">
            <div className="col-span-2 flex items-center gap-1.5">
              {item.won ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-500" />
              )}
              <span className={`text-[10px] font-bold ${item.won ? 'text-emerald-500' : 'text-rose-500'}`}>
                {item.won ? 'THẮNG' : 'THUA'}
              </span>
            </div>
            <div className="col-span-2 text-center text-sm font-mono text-zinc-300">
              <span className="text-zinc-500">{item.playerGuess}</span>
              <span className="mx-1 text-zinc-700">/</span>
              <span className={item.won ? "text-white font-bold" : "text-zinc-400"}>{item.actualNumber}</span>
            </div>
            <div className="col-span-3 text-center text-xs">
              <div className="text-zinc-500">{item.betAmount}</div>
              {item.won && <div className="text-iota font-bold text-[10px] mt-0.5">+{item.reward}</div>}
            </div>
            <div className="col-span-5 flex items-center justify-end gap-2">
              <span className="font-mono text-[10px] text-zinc-600 hidden sm:block truncate max-w-[80px] group-hover:text-zinc-400 transition-colors">
                {item.id}
              </span>
              <a href={`#tangle/${item.id}`} className="text-zinc-600 hover:text-iota transition-colors p-1 hover:bg-iota/10 rounded" title="View on Tangle Explorer">
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            {item.commentary && (
                <div className="col-span-12 mt-2 text-[11px] italic text-zinc-400 border-l-2 border-zinc-800 pl-2 py-0.5 group-hover:border-iota/50 transition-colors">
                    <span className="text-iota-accent not-italic font-bold mr-1">AI:</span> {item.commentary}
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};