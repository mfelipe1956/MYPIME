import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const databaseName = 'MYPIME.db';

const db = SQLite.openDatabase({ name: databaseName, location: 'default' }, () => {
  console.log('Database opened');
}, (err) => {
  console.log(err);
});

const createTables = async () => {
  await db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        description TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        description TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS bank_accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_number TEXT NOT NULL,
        balance REAL NOT NULL,
        bank_name TEXT,
        account_type TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS payroll (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_name TEXT NOT NULL,
        salary REAL NOT NULL,
        taxes REAL NOT NULL,
        vacation REAL NOT NULL,
        net_salary REAL NOT NULL,
        payment_date TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS tax_payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        period TEXT NOT NULL,
        amount REAL NOT NULL,
        due_date TEXT,
        paid BOOLEAN DEFAULT 0
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS bank_transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (account_id) REFERENCES bank_accounts(id)
      );
    `);
  });
};

createTables();

export default db;