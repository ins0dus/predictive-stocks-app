import { StockDiscordBot } from './services/discordBotService';

console.log('Starting Discord bot initialization...');

// Initialize the Discord bot with your bot token
const bot = new StockDiscordBot(process.env.DISCORD_BOT_TOKEN || '');

// Start the bot
console.log('Attempting to start Discord bot...');
bot.start().then(() => {
  console.log('Discord bot started successfully!');
}).catch(error => {
  console.error('Failed to start Discord bot:', error);
  console.error('Error details:', {
    message: error.message,
    stack: error.stack,
    code: error.code
  });
  process.exit(1);
}); 