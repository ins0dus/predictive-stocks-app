import { Client, GatewayIntentBits, TextChannel, Message, DMChannel, NewsChannel, ThreadChannel, VoiceChannel, BaseChannel } from 'discord.js';
import { getYahooQuote } from './yahooFinanceService';

interface StockPick {
  symbol: string;
  reason: string;
  price: number;
  score: number;
  volume: number;
}

class StockAnalyzer {
  private picks: StockPick[] = [];

  async getDailyPicks(): Promise<StockPick[]> {
    // TODO: Implement stock picking logic
    return [
      {
        symbol: 'SNDL',
        reason: 'Strong volume and momentum',
        price: 1.36,
        score: 85,
        volume: 500000
      }
    ];
  }

  async analyzeStock(symbol: string): Promise<string> {
    const quote = await getYahooQuote(symbol);
    return `Analysis for ${symbol}:
Price: $${quote.regularMarketPrice}
Change: ${quote.regularMarketChange} (${quote.regularMarketChangePercent}%)
Volume: ${quote.regularMarketVolume}
Market Cap: $${quote.marketCap}
PE Ratio: ${quote.trailingPE}
Dividend Yield: ${quote.dividendYield}%`;
  }

  getStats(): string {
    return 'Performance statistics will be implemented soon';
  }
}

class StockDiscordBot {
  private client: Client;
  private analyzer: StockAnalyzer;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });
    this.analyzer = new StockAnalyzer();

    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user?.tag}`);
    });

    this.client.on('messageCreate', async (message: Message) => {
      if (message.author.bot) return;
      if (!message.channel.isTextBased()) return;

      const channel = message.channel;
      if (!channel) return;

      // Only proceed if the channel is a type that supports sending messages
      if (!(channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel || channel instanceof ThreadChannel)) {
        return;
      }

      // Type guard to ensure channel has send method
      if (!('send' in channel)) {
        return;
      }

      if (message.content.startsWith('!pick')) {
        const picks = await this.analyzer.getDailyPicks();
        const response = picks.map(pick => 
          `${pick.symbol}: $${pick.price} (Score: ${pick.score})\nReason: ${pick.reason}`
        ).join('\n\n');
        await channel.send(response);
      }

      if (message.content.startsWith('!analyze')) {
        const symbol = message.content.split(' ')[1]?.toUpperCase();
        if (!symbol) {
          await channel.send('Please provide a stock symbol. Usage: !analyze SYMBOL');
          return;
        }
        const analysis = await this.analyzer.analyzeStock(symbol);
        await channel.send(analysis);
      }

      if (message.content.startsWith('!stats')) {
        const stats = this.analyzer.getStats();
        await channel.send(stats);
      }
    });
  }

  async login(token: string) {
    await this.client.login(token);
  }
}

export const bot = new StockDiscordBot(); 