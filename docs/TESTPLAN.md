# Test Plan for Student Account Management System

This test plan covers the business logic implemented in the COBOL application for student account management. It is designed to be validated with business stakeholders and later used for developing automated tests in a Node.js application.

| Test Case ID | Test Case Description                | Pre-conditions                | Test Steps                                                                 | Expected Results                                      | Actual Results | Status | Comments |
|--------------|--------------------------------------|-------------------------------|----------------------------------------------------------------------------|-------------------------------------------------------|---------------|--------|----------|
| TC-01        | View current account balance         | Account exists with balance   | 1. Start app<br>2. Select 'View Balance'                                   | Current balance is displayed correctly                |               |        |          |
| TC-02        | Credit account with valid amount     | Account exists                | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter valid amount        | Amount is added to balance; new balance is correct    |               |        |          |
| TC-03        | Debit account with valid amount      | Account exists, sufficient funds | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter valid amount      | Amount is subtracted; new balance is correct          |               |        |          |
| TC-04        | Debit account with insufficient funds| Account exists, insufficient funds | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter amount > balance | Transaction is rejected; balance remains unchanged    |               |        |          |
| TC-05        | Credit account with invalid amount   | Account exists                | 1. Start app<br>2. Select 'Credit Account'<br>3. Enter negative/invalid amount | Transaction is rejected; balance remains unchanged |               |        |          |
| TC-06        | Debit account with invalid amount    | Account exists                | 1. Start app<br>2. Select 'Debit Account'<br>3. Enter negative/invalid amount | Transaction is rejected; balance remains unchanged |               |        |          |
| TC-07        | Exit application                     | Application running           | 1. Start app<br>2. Select 'Exit'                                            | Application exits gracefully                          |               |        |          |
| TC-08        | Handle invalid menu selection        | Application running           | 1. Start app<br>2. Enter invalid menu option                                | Error message shown; menu is re-displayed             |               |        |          |

> **Note:** Fill in 'Actual Results', 'Status', and 'Comments' during test execution.
