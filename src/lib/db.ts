import { Pool, type QueryResult, type QueryResultRow } from 'pg';

// Create a connection pool to Neon database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection on initialization
pool.on('connect', () => {
  console.log('Connected to Neon database');
});

pool.on('error', (err: Error) => {
  console.error('Unexpected database error:', err);
});

export default pool;

// Helper function to execute queries
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: ReadonlyArray<unknown>
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const values: unknown[] | undefined = params ? [...params] : undefined;
    const res = await pool.query<T>(text, values as unknown[] | undefined);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper function to get a client from the pool
export async function getClient() {
  const client = await pool.connect();
  const release = client.release.bind(client);
  
  // Set a timeout of 5 seconds, after which we will log a warning
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
  }, 5000);
  
  // Monkey patch the release method to clear the timeout
  client.release = () => {
    clearTimeout(timeout);
    return release();
  };
  
  return client;
}

