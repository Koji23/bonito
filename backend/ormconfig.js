module.exports = {
  type: 'postgres',
  // since migrations are easier to run locally using npx, we are specifying localhost here.
  // If the migration is to be run after exec'ing into a container, then replace this with the
  // name of the postgres container "postgres-db"
  // see https://docs.docker.com/compose/networking/
  host: 'localhost',
  // 4004 is the localport assigned to the postgres container. Use the container's port 5432
  // when running the migration from inside the container
  port: 4004,
  username: 'postgres',
  password: 'abc123',
  database: 'bonito',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};