import { Client, IntentsBitField, Message, TextChannel, DMChannel, NewsChannel, ThreadChannel, VoiceChannel } from 'discord.js';
import { StockData } from '../types/stock';
import { getStockDetails } from './stockService';
import { StockAnalyzer } from './stockAnalyzer';
import { getStockQuote } from './yahooFinanceService';

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
  private stockAnalyzer: StockAnalyzer;
  private token: string;

  constructor(token: string) {
    console.log('Creating new Discord bot instance...');
    this.token = token;
    this.client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    });
    this.stockAnalyzer = new StockAnalyzer();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    console.log('Setting up Discord bot event listeners...');
    
    this.client.on('ready', () => {
      console.log(`Bot is ready! Logged in as ${this.client.user?.tag}`);
      console.log(`Bot is in ${this.client.guilds.cache.size} servers`);
    });

    this.client.on('error', (error) => {
      console.error('Discord client error:', error);
    });

    this.client.on('warn', (info) => {
      console.warn('Discord client warning:', info);
    });

    this.client.on('debug', (info) => {
      console.debug('Discord client debug:', info);
    });

    this.client.on('messageCreate', async (message: Message) => {
      console.log(`Received message: ${message.content}`);
      if (message.author.bot) return;

      const channel = message.channel;
      if (!this.isValidChannel(channel)) {
        console.log('Message received in invalid channel type');
        return;
      }

      try {
        if (message.content.startsWith('!stock')) {
          const symbol = message.content.split(' ')[1];
          if (!symbol) {
            await this.sendMessage(channel, 'Please provide a stock symbol. Usage: !stock AAPL');
            return;
          }

          console.log(`Fetching stock data for ${symbol}...`);
          const quote = await getStockQuote(symbol);
          await this.sendMessage(channel, this.formatStockMessage(quote));
        } else if (message.content === '!picks') {
          console.log('Fetching daily stock picks...');
          const picks = await this.stockAnalyzer.getDailyPicks();
          await this.sendMessage(channel, this.formatPicksMessage(picks));
        }
      } catch (error) {
        console.error('Error processing message:', error);
        await this.sendMessage(channel, 'Sorry, I encountered an error processing your request.');
      }
    });
  }

  private isValidChannel(channel: any): channel is TextChannel | DMChannel | NewsChannel | ThreadChannel | VoiceChannel {
    return (
      channel instanceof TextChannel ||
      channel instanceof DMChannel ||
      channel instanceof NewsChannel ||
      channel instanceof ThreadChannel ||
      channel instanceof VoiceChannel
    );
  }

  private async sendMessage(channel: TextChannel | DMChannel | NewsChannel | ThreadChannel | VoiceChannel, content: string) {
    try {
      console.log(`Sending message to channel ${channel.id}: ${content}`);
      await channel.send(content);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async start() {
    try {
      await this.client.login(this.token);
    } catch (error) {
      console.error('Failed to start Discord bot:', error);
      throw error;
    }
  }

  private formatStockMessage(quote: StockData): string {
    return this.stockAnalyzer.getQuoteMessage(quote);
  }

  private formatPicksMessage(picks: string[]): string {
    return `Daily Stock Picks: ${picks.join(', ')}`;
  }
} 