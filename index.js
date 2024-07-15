class Database {
    constructor() {
      this.data = {};
      this.transactions = [];
    }
  
    // Start a new transaction
    begin() {
      this.transactions.push({});
    }
  
    // Commit the current transaction
    commit() {
      if (this.transactions.length === 0) {
        throw new Error("No transaction to commit");
      }
      const currentTransaction = this.transactions.pop();
      if (this.transactions.length > 0) {
        // Merge with the parent transaction
        const parentTransaction = this.transactions[this.transactions.length - 1];
        for (const [key, value] of Object.entries(currentTransaction)) {
          parentTransaction[key] = value;
        }
      } else {
        // Apply to the main data store
        for (const [key, value] of Object.entries(currentTransaction)) {
          this.data[key] = value;
        }
      }
    }
  
    // Rollback the current transaction
    rollback() {
      if (this.transactions.length === 0) {
        throw new Error("No transaction to rollback");
      }
      this.transactions.pop();
    }
  
    // Set a value in the database
    set(key, value) {
      if (this.transactions.length > 0) {
        this.transactions[this.transactions.length - 1][key] = value;
      } else {
        this.data[key] = value;
      }
    }
  
    // Get a value from the database
    get(key) {
      for (let i = this.transactions.length - 1; i >= 0; i--) {
        if (key in this.transactions[i]) {
          return this.transactions[i][key];
        }
      }
      return this.data[key];
    }
  
    // Delete a value from the database
    delete(key) {
      if (this.transactions.length > 0) {
        this.transactions[this.transactions.length - 1][key] = undefined;
      } else {
        delete this.data[key];
      }
    }
  
    // Print the current state of the database (for debugging)
    print() {
      console.log("Data:", this.data);
      console.log("Transactions:", this.transactions);
    }
  }
  
  // Example usage
  const db = new Database();
  
  db.set("a", 1);
  db.set("b", 2);
  db.print(); // Data: { a: 1, b: 2 }, Transactions: []
  
  db.begin();
  db.set("a", 10);
  db.set("c", 30);
  db.print(); // Data: { a: 1, b: 2 }, Transactions: [ { a: 10, c: 30 } ]
  
  db.begin();
  db.set("a", 100);
  db.set("d", 40);
  db.print(); // Data: { a: 1, b: 2 }, Transactions: [ { a: 10, c: 30 }, { a: 100, d: 40 } ]
  
  db.commit();
  db.print(); // Data: { a: 1, b: 2 }, Transactions: [ { a: 100, d: 40, c: 30 } ]
  console.log(db.get("a")); // Output: 100
  console.log(db.get("b")); // Output: 2
  console.log(db.get("c")); // Output: 30
  console.log(db.get("d")); // Output: 40
  
  db.rollback();
  db.print(); // Data: { a: 1, b: 2 }, Transactions: []
  
  console.log(db.get("a")); // Output: 1
  console.log(db.get("b")); // Output: 2
  console.log(db.get("c")); // Output: undefined
  console.log(db.get("d")); // Output: undefined
  