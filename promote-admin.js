import pool from './src/database/config.js';
import { logger } from './src/utils/logger.js';

const email = process.argv[2];

const run = async () => {
  if (!email) {
    logger.error('Usage: node promote-admin.js <email>');
    process.exit(1);
  }

  const result = await pool.query(
    `UPDATE users SET role = 'admin', updated_at = CURRENT_TIMESTAMP
     WHERE email = $1
     RETURNING id, name, email, role`,
    [email]
  );

  if (result.rows.length === 0) {
    logger.error(`No user found with email: ${email}`);
    process.exit(1);
  }

  logger.info(`Promoted to admin: ${JSON.stringify(result.rows[0])}`);
  await pool.end();
};

run().catch(async (error) => {
  logger.error('Failed to promote user:', error.message);
  await pool.end();
  process.exit(1);
});
