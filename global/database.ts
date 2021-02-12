import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tienda',
    password: 'DanteDebeMorir#1',
    port: 5432,
});