import { StockDiscordBot } from './services/discordBotService';

// Initialize the Discord bot with your bot token
const bot = new StockDiscordBot(process.env.DISCORD_BOT_TOKEN || '');

// Start the bot
bot.start().catch(error => {
  console.error('Failed to start Discord bot:', error);
  process.exit(1);
}); 