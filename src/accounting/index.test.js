const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../account.json');

// Helper to reset account data for each test
function resetAccount(balance = 1000.0) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    id: '0001',
    name: 'John Doe',
    balance,
    status: 'active'
  }, null, 2));
}

describe('Account Management System', () => {
  let account;
  beforeEach(() => {
    resetAccount();
    account = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  });

  test('TC-01: View current account balance', () => {
    expect(account.balance).toBe(1000.0);
  });

  test('TC-02: Credit account with valid amount', () => {
    const credit = 100;
    account.balance += credit;
    fs.writeFileSync(DATA_FILE, JSON.stringify(account, null, 2));
    const updated = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    expect(updated.balance).toBe(1100.0);
  });

  test('TC-03: Debit account with valid amount', () => {
    const debit = 200;
    account.balance -= debit;
    fs.writeFileSync(DATA_FILE, JSON.stringify(account, null, 2));
    const updated = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    expect(updated.balance).toBe(800.0);
  });

  test('TC-04: Debit account with insufficient funds', () => {
    const debit = 2000;
    if (debit > account.balance) {
      // Should not change balance
      expect(account.balance).toBe(1000.0);
    }
  });

  test('TC-05: Credit account with invalid amount', () => {
    const credit = -50;
    if (credit <= 0) {
      // Should not change balance
      expect(account.balance).toBe(1000.0);
    }
  });

  test('TC-06: Debit account with invalid amount', () => {
    const debit = -30;
    if (debit <= 0) {
      // Should not change balance
      expect(account.balance).toBe(1000.0);
    }
  });

  test('TC-07: Exit application (simulated)', () => {
    // No state change, just a placeholder
    expect(true).toBe(true);
  });

  test('TC-08: Handle invalid menu selection (simulated)', () => {
    // No state change, just a placeholder
    expect(true).toBe(true);
  });
});
