# Budget Stocks App - Complete Setup Guide

This guide will help you set up and run the Budget Stocks App, including both the backend API and mobile frontend.

## Prerequisites

### Backend Requirements
- Python 3.8 or higher
- pip (Python package manager)

### Frontend Requirements
- Node.js 14 or higher
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android emulator) or Xcode (for iOS simulator)
- Expo Go app on your physical device (optional)

## Step 1: Clone/Download the Repository

Make sure you have the complete project folder with both `backend` and `mobile` directories.

## Step 2: Backend Setup

1. **Create a Python virtual environment (recommended)**:
   ```bash
   cd budget_stocks_app/backend
   python -m venv venv
   
   # Activate on Windows
   venv\Scripts\activate
   
   # OR Activate on macOS/Linux
   source venv/bin/activate
   ```

2. **Install backend dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Test run the backend server**:
   ```bash
   python app.py
   ```

   You should see output indicating the server is running on http://localhost:5000.
   You can test it by opening http://localhost:5000/health in your browser.

## Step 3: Frontend Setup

1. **Install frontend dependencies**:
   ```bash
   cd budget_stocks_app/mobile
   npm install
   ```

2. **Add image assets**:
   
   You need to add the following image files to `mobile/assets/img/`:
   - icon.png
   - adaptive-icon.png
   - splash.png
   - notification-icon.png
   - favicon.png
   
   See the README in the assets/img directory for instructions on generating these files.

3. **Test run the mobile app**:
   ```bash
   npm start
   ```

   This will start the Expo development server.

## Step 4: Run the Complete App

### Option 1: Run both servers with the provided script

On Windows:
```bash
cd budget_stocks_app
start-dev.bat
```

On macOS/Linux:
```bash
cd budget_stocks_app
bash start-dev.sh
```

### Option 2: Run the servers manually

1. Start the backend server:
   ```bash
   cd budget_stocks_app/backend
   python app.py
   ```

2. In a different terminal, start the frontend server:
   ```bash
   cd budget_stocks_app/mobile
   npm start
   ```

## Step 5: Run on a Device/Emulator

After starting the Expo server:

- Press `a` in the terminal to open on an Android emulator
- Press `i` in the terminal to open on an iOS simulator
- Scan the QR code with the Expo Go app on your physical device

## Troubleshooting

### Backend Issues

1. **Package installation errors**:
   - Try installing packages individually
   - If TensorFlow fails, try installing an older version or CPU-only version

2. **API not responding**:
   - Check that the backend server is running
   - Verify the API URL in `mobile/api/stocksApi.js` matches your backend URL

### Frontend Issues

1. **Expo dependency issues**:
   - Try running `npm install --force` to resolve conflicts
   - Make sure Expo CLI is up to date: `npm install -g expo-cli`

2. **Assets missing**:
   - Generate or add the required image files to `mobile/assets/img/`
   - Make sure the paths match those in `app.json`

3. **Emulator connection issues**:
   - Make sure your emulator/simulator is running before starting the app
   - Try using `expo start --tunnel` for network issues

## Advanced: Environment Configuration

### Backend Environment Variables
- `USE_ENSEMBLE_MODEL`: Set to 'TRUE' to use ensemble prediction (default: False)
- `USE_LSTM`: Set to 'TRUE' to use LSTM neural networks (default: False)
- `DEBUG`: Set to 'TRUE' for debug mode (default: False)

### Frontend Environment Configuration
The API URL can be configured in `mobile/api/stocksApi.js` based on whether you're running in development or production. 