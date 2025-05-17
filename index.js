const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Helper to fetch employees
const getEmployees = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./employees_db.sqlite');
    db.all("SELECT * FROM employees", [], (err, rows) => {
      if (err) {
        db.close();
        reject(err);
      } else {
        db.close(() => {
          resolve(rows);
        });
      }
    });
  });
};

// Helper to fetch products
const getProducts = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./products_db.sqlite');
    db.all("SELECT * FROM products", [], (err, rows) => {
      if (err) {
        db.close();
        reject(err);
      } else {
        db.close(() => {
          resolve(rows);
        });
      }
    });
  });
};

// Combined endpoint
app.get('/combined-data', async (req, res) => {
  try {
    const employees = await getEmployees();
    const products = await getProducts();
    res.json({ employees, products });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
