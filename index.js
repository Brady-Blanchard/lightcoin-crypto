class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance () {
    let totalBalance = 0;
    for (const transaction of this.transactions) {
      totalBalance += transaction.value;
    }
    return totalBalance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
  }

}
class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }

  isAllowed() {
    return true
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Withdrawal(50.00, myAccount);
console.log('Withdrawal:', t1.amount);
console.log('Account Balance:', myAccount.balance);

const t2 = new Deposit(120.00, myAccount);
t2.commit();
console.log('Deposit:', t2.amount);
console.log('Account Balance:', myAccount.balance);

const t3 = new Withdrawal(50.00, myAccount);
t3.commit();
console.log('Withdrawal:', t3.amount);
console.log('Ending Balance:', myAccount.balance);
console.log('Transaction History:', myAccount.transactions);