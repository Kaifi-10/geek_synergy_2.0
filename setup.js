// setup.js
const sqlite3 = require('sqlite3').verbose();

// Create employees table
const employeesDb = new sqlite3.Database('./employees_db.sqlite');
employeesDb.serialize(() => {
  employeesDb.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL
  )`);

  employeesDb.run(`INSERT INTO employees (name, position) VALUES 
    ('Alice', 'Manager'),
    ('Bob', 'Engineer')
  `);
});
employeesDb.close();

// Create products table
const productsDb = new sqlite3.Database('./products_db.sqlite');
productsDb.serialize(() => {
  productsDb.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )`);

  productsDb.run(`INSERT INTO products (name, price) VALUES 
    ('Laptop', 1200.00),
    ('Mouse', 25.50)
  `);
});
productsDb.close();

console.log("Databases and tables created successfully.");
