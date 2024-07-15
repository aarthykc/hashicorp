class Database {
    constructor() {
        this.data = {};
        this.transactions = [];
    }
}

Database.prototype.begin = function() {
    return this.transactions.push({})
}

Database.prototype.commit = function() {
    if (this.transactions.length === 0) {
        throw new Error("No transaction to commit");
    }
    const currentTransaction = this.transactions.pop();
    if (this.transactions.length > 0) {
        const parentTransaction = this.transactions[this.transactions.length - 1];

        for (let [key, value] of Object.entries(currentTransaction)) {
            if (!parentTransaction) {
                parentTransaction[key] = value;
            }
        }
    } else {
        for (let [key, value] of Object.entries(currentTransaction)) {
            this.data[key] = value;
        }
    }
    
}

Database.prototype.rollback = function() {
    if (this.length.length === 0) {
        throw new Error("No transaction to commit");
    }

    return this.transactions.pop();
}

Database.prototype.set = function(key, value) {
    if (this.transactions.length > 0) {
        this.transactions[this.transactions.length - 1][key] = value;
    } else {
        this.data[key] = value;
    }
}

Database.prototype.get = function(key) {
    for (let i = this.transactions.length - 1; i >= 0; i--) {
        if (key in this.transactions[i]) {
            return this.transactions[i][key];
        }
    }
    return this.data[key];
}

Database.prototype.delete = function(key) {
    delete this.data[key];
}

Database.prototype.print = function() {
    console.log(this.transactions);
    console.log(this.data);
}



const db = new Database();
db.begin();
db.set('a', 1);
db.set('b', 2);
db.commit();
db.print();
db.begin();
db.set('a', 5);
db.commit();
db.print();
db.begin();
db.set('a', 3);
db.set('b', 4);
db.commit();
db.print();
db.begin();
db.delete('a');
db.commit();
db.print();
db.begin();
db.set('b', 7);
db.commit();
db.print();
db.begin();
db.delete('b');
db.commit();
db.print();