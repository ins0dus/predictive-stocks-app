import { Client, Events, GatewayIntentBits } from 'discord.js';
import { StockData } from '../types/stock';
import { getStockDetails } from './stockService';

export class StockAnalyzer {
  private lastAnalysis: Date = new Date();
  private analysisInterval: number = 24 * 60 * 60 * 1000; // 24 hours

  async getDailyPicks(): Promise<string[]> {
    const now = new Date();
    if (now.getTime() - this.lastAnalysis.getTime() >= this.analysisInterval) {
      // Implement stock analysis logic here
      this.lastAnalysis = now;
    }
    return ['AAPL', 'GOOGL', 'MSFT']; // Placeholder
  }

  getStats(): string {
    return 'Performance statistics will be implemented soon';
  }

  getQuoteMessage(quote: StockData): string {
    return `${quote.symbol} Quote:
Price: $${quote.price}
Change: ${quote.change > 0 ? '+' : ''}${quote.change} (${quote.changePercent}%)
High: $${quote.dailyHigh}
Low: $${quote.dailyLow}
Volume: ${quote.volume}
Market Cap: $${quote.marketCap}
PE Ratio: ${quote.peRatio}
Last Updated: ${quote.lastUpdated}`;
  }
}

export class StockDiscordBot {
  private client: Client;
  private analyzer: StockAnalyzer;
  private token: string;

  constructor(token: string) {
    this.token = token;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.analyzer = new StockAnalyzer();
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.client.once(Events.ClientReady, () => {
      console.log('Discord bot is ready!');
    });

    this.client.on(Events.MessageCreate, async (message) => {
      if (message.author.bot) return;

      const content = message.content.toLowerCase();
      if (content.startsWith('!stock')) {
        const args = content.split(' ');
        if (args.length < 2) {
          await message.reply('Please provide a stock symbol. Example: !stock AAPL');
          return;
        }

        const symbol = args[1].toUpperCase();
        try {
          const quote = await getStockDetails(symbol);
          await message.reply(this.analyzer.getQuoteMessage(quote));
        } catch (error) {
          await message.reply(`Error fetching stock data for ${symbol}`);
        }
      }
    });
  }

  async start() {
    try {
      await this.client.login(this.token);
    } catch (error) {
      console.error('Failed to start Discord bot:', error);
      throw error;
    }
  }
} 