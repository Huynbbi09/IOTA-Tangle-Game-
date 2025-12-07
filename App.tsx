import React, { useState, useEffect } from 'react';
import { GameStatus, WalletInfo, GameResult } from './types';
import { connectIotaWallet, executeSmartContract, fetchTangleHistory } from './services/iotaService';
import { getGameCommentary } from './services/geminiService';
import { WalletButton } from './components/WalletButton';
import { HistoryList } from './components/HistoryList';
import { Dice5, Cpu, Database, Activity, Sparkles } from 'lucide-react';

const CONTRACT_ADDRESS = "rms1pr...contract...addr"; // Fake Smart Contract Address

export default function App() {
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [wallet, setWallet] = useState<WalletInfo>({ address: null, balance: 0, isConnected: false });
  const [guess, setGuess] = useState<number>(50);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [history, setHistory] = useState<GameResult[]>([]);
  const [lastResult, setLastResult] = useState<GameResult | null>(null);

  // Initial fetch of history
  useEffect(() => {
    fetchTangleHistory().then(setHistory);
  }, []);

  const handleConnectWallet = async () => {
    setStatus(GameStatus.CONNECTING_WALLET);
    try {
      const data = await connectIotaWallet();
      setWallet({
        address: data.address,
        balance: data.balance,
        isConnected: true
      });
      setStatus(GameStatus.IDLE);
    } catch (e) {
      console.error(e);
      setStatus(GameStatus.ERROR);
    }
  };

  const handlePlayGame = async () => {
    if (!wallet.isConnected) return;
    if (wallet.balance < betAmount) {
      alert("Số dư không đủ!");
      return;
    }

    setStatus(GameStatus.PLAYING);
    setLastResult(null);

    try {
      // 1. Execute Smart Contract (Simulated)
      const result = await executeSmartContract(betAmount, guess);

      // 2. Update Balance (Optimistic UI)
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - betAmount + (result.reward || 0)
      }));

      // 3. Get AI Commentary
      const comment = await getGameCommentary(result.won, result.playerGuess, result.actualNumber);
      result.commentary = comment;

      // 4. Update State
      setLastResult(result);
      setHistory(prev => [result, ...prev]);
      setStatus(result.won ? GameStatus.WON : GameStatus.LOST);

    } catch (e) {
      console.error(e);
      setStatus(GameStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-iota selection:text-white pb-20">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-iota-dark to-iota p-2 rounded-lg shadow-lg shadow-iota/20">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white flex items-center gap-1">
                IOTA <span className="text-iota bg-clip-text text-transparent bg-gradient-to-r from-iota to-iota-accent">GAME</span>
              </h1>
              <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Powered by Tangle</p>
            </div>
          </div>
          <WalletButton wallet={wallet} onConnect={handleConnectWallet} isLoading={status === GameStatus.CONNECTING_WALLET} />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Game Interface */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Game Card */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-iota/20 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-iota-accent/20 blur-[60px] rounded-full pointer-events-none mix-blend-screen"></div>
            
            <div className="mb-6 relative">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 text-white">
                <Dice5 className="text-iota" />
                Dự đoán Số May Mắn
              </h2>
              <p className="text-zinc-400 text-sm">
                Chọn một số từ 1 đến 100. Nếu kết quả thực tế nằm trong khoảng <span className="text-iota font-bold">±5</span> so với số của bạn, bạn thắng!
              </p>
            </div>

            {/* Smart Contract Info Box */}
            <div className="bg-zinc-950/50 rounded-lg p-3 mb-6 border border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Cpu className="w-4 h-4 text-zinc-500" />
                <span className="font-mono">Smart Contract:</span>
              </div>
              <div className="font-mono text-xs text-iota-accent truncate max-w-[200px]">
                {CONTRACT_ADDRESS}
              </div>
            </div>

            {/* Game Controls */}
            <div className="space-y-8 relative">
              {/* Slider Input */}
              <div className="bg-zinc-950/30 p-4 rounded-xl border border-zinc-800/50">
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-semibold text-zinc-300">Con số của bạn</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-iota" />
                    <span className="text-3xl font-bold text-white font-mono drop-shadow-lg shadow-iota/50">{guess}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={guess}
                  onChange={(e) => setGuess(parseInt(e.target.value))}
                  disabled={status === GameStatus.PLAYING || !wallet.isConnected}
                  className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-iota hover:accent-iota-accent transition-all ring-offset-2 ring-offset-zinc-900 focus:outline-none focus:ring-2 focus:ring-iota"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                  <span>1</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>

              {/* Bet Amount */}
              <div className="space-y-2">
                <label className="text-xs uppercase text-zinc-500 font-bold tracking-wider">Mức cược (MIOTA)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 50, 100, 200].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      disabled={status === GameStatus.PLAYING || !wallet.isConnected}
                      className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                        betAmount === amount
                          ? 'bg-iota text-white border-iota shadow-[0_0_15px_rgba(217,70,239,0.4)]'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handlePlayGame}
                disabled={!wallet.isConnected || status === GameStatus.PLAYING}
                className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wide shadow-xl transition-all relative overflow-hidden group ${
                  !wallet.isConnected 
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                    : status === GameStatus.PLAYING
                      ? 'bg-zinc-800 text-zinc-300 cursor-wait border border-iota/30'
                      : 'bg-gradient-to-r from-iota via-purple-500 to-iota-accent text-white shadow-iota/20 hover:shadow-iota/40 hover:scale-[1.01]'
                }`}
              >
                {status === GameStatus.PLAYING && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                )}
                {!wallet.isConnected 
                  ? 'Vui lòng kết nối ví' 
                  : status === GameStatus.PLAYING 
                    ? 'Đang xử lý trên Tangle...' 
                    : <span className="flex items-center justify-center gap-2">Đặt cược <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" /></span>
                }
              </button>
            </div>
          </div>

          {/* Live Result Display */}
          {lastResult && (
            <div className={`p-6 rounded-2xl border animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-md ${
              lastResult.won 
                ? 'bg-emerald-950/40 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                : 'bg-rose-950/40 border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.1)]'
            }`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h3 className={`text-2xl font-bold mb-1 ${lastResult.won ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {lastResult.won ? 'CHIẾN THẮNG!' : 'RẤT TIẾC!'}
                  </h3>
                  <p className="text-zinc-300 text-sm italic">"{lastResult.commentary}"</p>
                </div>
                <div className="flex items-center gap-8 bg-black/20 p-4 rounded-xl border border-white/5">
                  <div className="text-center">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Bạn chọn</div>
                    <div className="text-xl font-mono font-bold text-white">{lastResult.playerGuess}</div>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Kết quả</div>
                    <div className={`text-3xl font-mono font-bold ${lastResult.won ? 'text-emerald-400' : 'text-rose-400'} drop-shadow-md`}>
                      {lastResult.actualNumber}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-zinc-500 font-mono">
                <span>ID: {lastResult.id.substring(0, 16)}...</span>
                <span className="text-iota flex items-center gap-1">
                   Đã xác thực <CheckMarkIcon className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Tangle History */}
        <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Database className="text-iota w-5 h-5" />
                    <h2 className="text-lg font-bold text-white">Lịch sử Tangle</h2>
                </div>
                <p className="text-xs text-zinc-400 mb-4">
                    Tất cả các lượt chơi được lưu trữ phi tập trung và minh bạch trên IOTA Tangle.
                </p>
                <HistoryList history={history} />
            </div>
        </div>
      </main>
    </div>
  );
}

// Simple icon component helper
function CheckMarkIcon({className}: {className?: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
