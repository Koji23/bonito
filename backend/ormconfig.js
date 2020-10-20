module.exports = {
  type: 'postgres',
  host: 'postgres-db',
  port: 5432,
  username: 'postgres',
  password: 'abc123',
  database: 'bonito',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};