import { StockDiscordBot } from './services/discordBotService';

const botToken = process.env.DISCORD_BOT_TOKEN;

if (!botToken) {
  console.error('DISCORD_BOT_TOKEN is not set in environment variables');
  process.exit(1);
}

console.log('Starting Discord bot...');
console.log('Bot token length:', botToken.length);
console.log('Bot token prefix:', botToken.substring(0, 10) + '...');

const bot = new StockDiscordBot(botToken);

bot.start().catch((error) => {
  console.error('Failed to start bot:', error);
  process.exit(1);
}); 