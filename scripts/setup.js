/**
 * Budget Stocks App Setup Script
 * 
 * This script helps set up the Budget Stocks app environment
 * by checking dependencies, creating necessary files, and providing
 * guidance for missing components.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper function to print colored messages
function print(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Helper function to print a header
function printHeader(message) {
  console.log("\n" + "=".repeat(60));
  console.log(`${colors.cyan}${colors.bright} ${message}${colors.reset}`);
  console.log("=".repeat(60) + "\n");
}

// Helper function to execute commands and handle errors
function execute(command, errorMessage) {
  try {
    print('cyan', `Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    print('red', `Error: ${errorMessage}`);
    print('yellow', error.message);
    return false;
  }
}

// Check if Python is installed
function checkPython() {
  try {
    const version = execSync('python --version').toString().trim();
    print('green', `✓ Python is installed: ${version}`);
    return true;
  } catch (error) {
    print('red', '✗ Python is not installed or not in the PATH');
    print('yellow', 'Please install Python 3.8 or higher from https://www.python.org/downloads/');
    return false;
  }
}

// Check if Node.js is installed
function checkNode() {
  try {
    const version = execSync('node --version').toString().trim();
    print('green', `✓ Node.js is installed: ${version}`);
    return true;
  } catch (error) {
    print('red', '✗ Node.js is not installed or not in the PATH');
    print('yellow', 'Please install Node.js from https://nodejs.org/');
    return false;
  }
}

// Check if a directory exists
function dirExists(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch (error) {
    return false;
  }
}

// Create placeholder image files
function createPlaceholderImages() {
  const imgDir = path.join(__dirname, 'mobile', 'assets', 'img');
  
  if (!dirExists(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
    print('green', `Created directory: ${imgDir}`);
  }
  
  const images = [
    { name: 'icon.png', size: '1024x1024px' },
    { name: 'adaptive-icon.png', size: '1024x1024px' },
    { name: 'splash.png', size: '1242x2436px' },
    { name: 'notification-icon.png', size: '96x96px' },
    { name: 'favicon.png', size: '64x64px' }
  ];
  
  let created = 0;
  
  // Create placeholder text files
  for (const img of images) {
    const imgPath = path.join(imgDir, img.name);
    const placeholderPath = path.join(imgDir, `${img.name}.placeholder`);
    
    if (!fs.existsSync(imgPath) && fs.existsSync(placeholderPath)) {
      // Copy placeholder file to image file
      fs.copyFileSync(placeholderPath, imgPath);
      print('yellow', `Created placeholder: ${img.name}`);
      created++;
    } else if (!fs.existsSync(imgPath)) {
      // Create a simple text file
      const content = `This is a placeholder for ${img.name} (${img.size}).\nPlease replace with a real image.`;
      fs.writeFileSync(imgPath, content);
      print('yellow', `Created placeholder: ${img.name}`);
      created++;
    }
  }
  
  if (created > 0) {
    print('yellow', `Warning: ${created} placeholder image(s) were created. Replace them with real images before building for production.`);
  }
}

// Setup backend environment
async function setupBackend() {
  printHeader('Setting up Backend');
  
  const backendDir = path.join(__dirname, 'backend');
  
  if (!dirExists(backendDir)) {
    print('red', `✗ Backend directory not found: ${backendDir}`);
    return false;
  }
  
  // Change to backend directory
  process.chdir(backendDir);
  
  // Check if virtual environment exists
  const venvDir = path.join(backendDir, 'venv');
  let venvExists = dirExists(venvDir);
  
  if (!venvExists) {
    print('yellow', 'Creating Python virtual environment...');
    if (!execute('python -m venv venv', 'Failed to create virtual environment')) {
      return false;
    }
    venvExists = true;
  }
  
  // Activate virtual environment and install dependencies
  print('yellow', 'Installing Python dependencies...');
  
  if (process.platform === 'win32') {
    // Windows
    execute('venv\\Scripts\\activate && pip install -r requirements.txt', 'Failed to install Python dependencies');
  } else {
    // macOS/Linux
    execute('. venv/bin/activate && pip install -r requirements.txt', 'Failed to install Python dependencies');
  }
  
  print('green', '✓ Backend setup completed');
  
  // Return to the project root
  process.chdir(__dirname);
  return true;
}

// Setup frontend environment
async function setupFrontend() {
  printHeader('Setting up Frontend');
  
  const mobileDir = path.join(__dirname, 'mobile');
  
  if (!dirExists(mobileDir)) {
    print('red', `✗ Mobile directory not found: ${mobileDir}`);
    return false;
  }
  
  // Change to mobile directory
  process.chdir(mobileDir);
  
  // Check if node_modules exists
  const nodeModulesDir = path.join(mobileDir, 'node_modules');
  const nodeModulesExists = dirExists(nodeModulesDir);
  
  if (!nodeModulesExists) {
    print('yellow', 'Installing Node.js dependencies...');
    if (!execute('npm install', 'Failed to install Node.js dependencies')) {
      return false;
    }
  }
  
  // Create placeholder images
  createPlaceholderImages();
  
  print('green', '✓ Frontend setup completed');
  
  // Return to the project root
  process.chdir(__dirname);
  return true;
}

// Main function to run the setup
async function main() {
  printHeader('Budget Stocks App Setup');
  
  // Check prerequisites
  const pythonInstalled = checkPython();
  const nodeInstalled = checkNode();
  
  if (!pythonInstalled || !nodeInstalled) {
    print('red', '✗ Missing prerequisites. Please install them and run the setup again.');
    rl.close();
    return;
  }
  
  // Setup backend
  await setupBackend();
  
  // Setup frontend
  await setupFrontend();
  
  printHeader('Setup Complete');
  
  print('green', 'You can now start the application using:');
  print('cyan', '');
  if (process.platform === 'win32') {
    print('cyan', '  start-dev.bat');
  } else {
    print('cyan', '  bash start-dev.sh');
  }
  print('cyan', '');
  print('yellow', 'Make sure to replace the placeholder images with real ones before publishing the app.');
  
  rl.close();
}

// Run the main function
main().catch(error => {
  print('red', 'An error occurred during setup:');
  console.error(error);
  rl.close();
}); 