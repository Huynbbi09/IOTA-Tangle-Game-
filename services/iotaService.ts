import { GameResult, TangleMessage } from '../types';

// Mock simulation of IOTA SDK interactions
// In a real app, this would import { ClientBuilder } from '@iota/client'

const DELAY_MS = 1500; // Simulate network latency

export const connectIotaWallet = async (): Promise<{ address: string; balance: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a fake IOTA address
      resolve({
        address: 'iota1qprx5w3a7j5s9q2z1x4c8v6b3n7m9l0k2j4h6g8f5d3s1a-dev',
        balance: 1500 // Fake 1500 MIOTA
      });
    }, 1000);
  });
};

export const executeSmartContract = async (
  betAmount: number,
  userGuess: number
): Promise<GameResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Smart Contract Logic: Generate Random Number 1-100
      const actualNumber = Math.floor(Math.random() * 100) + 1;
      
      // Determine Win/Loss (Exact match for high reward, or close range logic)
      // For this game: Simple exact match is too hard, let's say +/- 5 wins small, exact wins big.
      // We will simplify: Match within 5 units wins.
      
      const diff = Math.abs(userGuess - actualNumber);
      const won = diff <= 5;
      const reward = won ? betAmount * 2 : 0;

      // Simulate Message ID generation (The "Record" on Tangle)
      const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const messageId = `0x${randomHex}`;

      resolve({
        id: messageId,
        playerGuess: userGuess,
        actualNumber: actualNumber,
        timestamp: Date.now(),
        won: won,
        betAmount: betAmount,
        reward: reward
      });
    }, DELAY_MS);
  });
};

export const fetchTangleHistory = async (): Promise<GameResult[]> => {
    // Simulate fetching past events from the Tangle Node
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '0x1a2b3c...',
                    playerGuess: 50,
                    actualNumber: 52,
                    timestamp: Date.now() - 100000,
                    won: true,
                    betAmount: 10,
                    reward: 20
                },
                {
                    id: '0x9z8y7x...',
                    playerGuess: 12,
                    actualNumber: 88,
                    timestamp: Date.now() - 500000,
                    won: false,
                    betAmount: 50,
                    reward: 0
                }
            ]);
        }, 800);
    });
}
