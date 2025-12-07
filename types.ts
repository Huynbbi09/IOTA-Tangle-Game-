export enum GameStatus {
  IDLE = 'IDLE',
  CONNECTING_WALLET = 'CONNECTING_WALLET',
  PLAYING = 'PLAYING', // Sending to Tangle
  WON = 'WON',
  LOST = 'LOST',
  ERROR = 'ERROR'
}

export interface WalletInfo {
  address: string | null;
  balance: number; // MIOTA
  isConnected: boolean;
}

export interface GameResult {
  id: string; // Tangle Message ID
  playerGuess: number;
  actualNumber: number;
  timestamp: number;
  won: boolean;
  betAmount: number;
  reward: number;
  commentary?: string; // From Gemini
}

export interface TangleMessage {
  messageId: string;
  payload: string;
}
