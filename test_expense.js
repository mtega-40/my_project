import pool from './src/database/config.js';

const testExpense = async () => {
  try {
    const result = await pool.query(
      `INSERT INTO expenses (farm_id, category, description, amount, date, recorded_by) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [1, 'test', 'Test expense', 100.00, '2024-01-01', 1]
    );
    console.log('Expense created successfully:', result.rows[0]);
  } catch (error) {
    console.error('Expense creation error:', error);
  } finally {
    await pool.end();
  }
};

testExpense();