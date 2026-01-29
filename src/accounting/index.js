// Node.js implementation of the legacy COBOL student account management system
// Preserves business logic, data integrity, and menu options

const readline = require('readline');
const fs = require('fs');
const DATA_FILE = 'account.json';

// Data structure for student account
let account = {
  id: '0001',
  name: 'John Doe',
  balance: 1000.0,
  status: 'active'
};

// Load account data from file if exists
function loadAccount() {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    account = JSON.parse(data);
  }
}

// Save account data to file
function saveAccount() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(account, null, 2));
}

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function viewBalance() {
  console.log(`Current balance: ${account.balance.toFixed(2)}`);
}

function creditAccount(rl) {
  rl.question('Enter credit amount: ', (input) => {
    const amount = parseFloat(input);
    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount.');
      mainMenu(rl);
      return;
    }
    account.balance += amount;
    saveAccount();
    console.log(`Amount credited. New balance: ${account.balance.toFixed(2)}`);
    mainMenu(rl);
  });
}

function debitAccount(rl) {
  rl.question('Enter debit amount: ', (input) => {
    const amount = parseFloat(input);
    if (isNaN(amount) || amount <= 0) {
      console.log('Invalid amount.');
      mainMenu(rl);
      return;
    }
    if (amount > account.balance) {
      console.log('Insufficient funds.');
      mainMenu(rl);
      return;
    }
    account.balance -= amount;
    saveAccount();
    console.log(`Amount debited. New balance: ${account.balance.toFixed(2)}`);
    mainMenu(rl);
  });
}

function mainMenu(rl) {
  displayMenu();
  rl.question('Enter your choice (1-4): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        viewBalance();
        mainMenu(rl);
        break;
      case '2':
        creditAccount(rl);
        break;
      case '3':
        debitAccount(rl);
        break;
      case '4':
        console.log('Exiting the program. Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid option.');
        mainMenu(rl);
    }
  });
}

function main() {
  loadAccount();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  mainMenu(rl);
}

if (require.main === module) {
  main();
}
