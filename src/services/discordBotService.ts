import { Client, IntentsBitField, Message, TextChannel, DMChannel, NewsChannel, ThreadChannel, VoiceChannel } from 'discord.js';
import { StockData } from '../types/stock';
import { getStockQuote, YahooQuote } from './yahooFinanceService';
import { StockAnalyzer } from './stockAnalyzer';

function convertYahooToStockData(yahooQuote: YahooQuote): StockData {
  return {
    symbol: yahooQuote.symbol,
    name: yahooQuote.longName || yahooQuote.shortName || yahooQuote.symbol,
    price: yahooQuote.regularMarketPrice,
    change: yahooQuote.regularMarketChange,
    changePercent: yahooQuote.regularMarketChangePercent,
    dailyHigh: yahooQuote.regularMarketDayHigh,
    dailyLow: yahooQuote.regularMarketDayLow,
    volume: yahooQuote.regularMarketVolume,
    marketCap: yahooQuote.marketCap,
    peRatio: yahooQuote.trailingPE,
    dividendYield: yahooQuote.dividendYield,
    lastUpdated: new Date(yahooQuote.regularMarketTime * 1000).toISOString()
  };
}

export class StockDiscordBot {
  private client: Client;
  private stockAnalyzer: StockAnalyzer;
  private token: string;

  constructor(token: string) {
    console.log('Creating new Discord bot instance...');
    console.log('Initializing Discord client with token length:', token.length);
    
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
      console.log('Bot presence:', this.client.user?.presence);
    });

    this.client.on('error', (error) => {
      console.error('Discord client error:', error);
      console.error('Error stack:', error.stack);
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

          await this.handleStockCommand(channel, symbol);
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
    console.log('Starting Discord bot connection...');
    try {
      await this.client.login(this.token);
      console.log('Discord bot login successful');
    } catch (error) {
      console.error('Failed to login to Discord:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error;
    }
  }

  private formatStockMessage(quote: StockData): string {
    return this.stockAnalyzer.getQuoteMessage(quote);
  }

  private formatPicksMessage(picks: string[]): string {
    return `Daily Stock Picks: ${picks.join(', ')}`;
  }

  private async handleStockCommand(channel: TextChannel | DMChannel | NewsChannel | ThreadChannel | VoiceChannel, symbol: string) {
    try {
      console.log(`Fetching stock data for ${symbol}...`);
      const yahooQuote = await getStockQuote(symbol);
      const stockData = convertYahooToStockData(yahooQuote);
      await this.sendMessage(channel, this.formatStockMessage(stockData));
    } catch (error) {
      console.error('Error fetching stock data:', error);
      await this.sendMessage(channel, `Error fetching stock data for ${symbol}`);
    }
  }
} 