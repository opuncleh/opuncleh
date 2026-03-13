#!/bin/bash
# 🦞 Opuncleh Installer
# Werks evrywher. Instalz evrything. Ur welcum.

set -e

echo "🦞 Installing Opuncleh..."
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js nawt fownd. Installing via nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install --lts
fi

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
fi

# Clone and install
echo "Cloning Opuncleh..."
git clone https://github.com/opuncleh/opuncleh.git ~/.opuncleh-src
cd ~/.opuncleh-src

echo "Installing dependenseez..."
pnpm install

echo "Bilding..."
pnpm build

# Create symlink
echo "Creating opuncleh command..."
sudo ln -sf ~/.opuncleh-src/opuncleh.mjs /usr/local/bin/opuncleh

echo ""
echo "🦞 Opuncleh installed!"
echo ""
echo "Run: opuncleh setup"
echo ""
echo "Dey r nawt bugz, dey r featurs. 🦞"
