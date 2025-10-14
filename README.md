# Decentralized Pharmaceutical Supply Chain (Angular + Hardhat + Node.js)

Pharmanet is a full-stack **Web3 dApp** demonstrating **smart contract development, blockchain integration, and frontend interaction with Ethereum**. It is built using **Angular 14**, **Node.js**, **Ethers.js**, and **Hardhat** for local smart contract deployment and testing.

This project showcases **end-to-end dApp development**, including writing, compiling, deploying, and interacting with smart contracts on a local blockchain network.

---

## ✅ Tech Stack

| Layer            | Technology Used                         |
|------------------|-----------------------------------------|
| Frontend         | Angular 14, TypeScript                  |
| Smart Contracts  | Solidity (Hardhat framework)           |
| Blockchain Tools | Hardhat, Ethers.js, Local Test Network |
| Backend Scripts  | Node.js                                |
| Package Manager  | npm                                    |

---

## 🔧 Prerequisites

Before running this project, ensure the following are installed:

- **Node.js v16 or higher** → https://nodejs.org
- **npm** (comes with Node.js)
- **Git** → https://git-scm.com
- **VS Code recommended** → https://code.visualstudio.com

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd Pharmanet

2. Install Dependencies

From the Pharmanet project root:

npm install


✅ Make sure your Node version is 16+ (node -v to verify)

3. Start Local Blockchain with Hardhat

In a terminal, while inside the Pharmanet folder:

npx hardhat node


This launches a local Ethereum test blockchain on http://127.0.0.1:8545 and gives you test accounts and private keys.

4. Deploy Smart Contract Locally

Open a new terminal window (keep Hardhat node running), then run:

npx hardhat run scripts/deploy.js --network localhost


After deployment, Hardhat will print a contract address to console, similar to:

Contract deployed to: 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707


✅ Copy this address — you will need it in the next step.

5. Update Contract Address in Angular App

In VS Code:

Click the Search icon

Search for:

resourceAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";


Replace the address with the new deployment address from step 4

Click Replace All

⚠️ This ensures the frontend points to your freshly deployed contract.

6. Start Angular Frontend

Launch the Angular app:

npm start


This builds and serves the frontend locally at:

http://localhost:4200/


Your dApp is now live and connected to your local blockchain 👍

📂 Project Structure
Pharmanet/
├── contracts/              # Smart contracts (.sol)
├── scripts/                # Deployment scripts
├── src/app/                # Angular frontend code
├── hardhat.config.js       # Hardhat settings
├── package.json            # Dependencies & scripts
└── README.md               # Project documentation

🧪 Development Workflow
Task	Command
Compile contracts	npx hardhat compile
Run local blockchain	npx hardhat node
Deploy contracts locally	npx hardhat run scripts/deploy.js --network localhost
Run Angular app	npm start
✅ Features Demonstrated

✔ Solidity Smart Contract Programming
✔ Deployment with Hardhat
✔ Local Ethereum Blockchain Development
✔ Angular Web3 UI Integration
✔ Ethers.js Contract Interaction
✔ Realistic Fullstack dApp Architecture

📜 License

This project is for educational and portfolio demonstration purposes.

👨🏾‍💻 Author

Chris Nabors
Full Stack Blockchain Developer
Portfolio: https://multiplexconcepts.org

GitHub: https://github.com/cnabo001
