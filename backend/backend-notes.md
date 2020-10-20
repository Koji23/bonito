<!-- Rather than installing the Nest CLI globally on the local machine we can use npx -p @nestjs/cli
this uses the -p or pacakge flag to specify the nest-cli since nest doesn't support npx by default like CRA does -->

npx -p @nestjs/cli nest new backend

npx -p @nestjs/cli nest generate controller CONTROLLER_NAME 
npx -p @nestjs/cli nest g co CONTROLLER_NAME  <!-- shorthand -->
npx -p @nestjs/cli nest g co --no-sepc CONTROLLER_NAME <!-- omit test file -->
npx -p @nestjs/cli nest g co CONTROLLER_NAME  <!-- shorthand -->
npx -p @nestjs/cli nest g co modules/CONTROLLER_NAME <!-- put the controller in the modules folder.  -->
npx -p @nestjs/cli nest g co modules/CONTROLLER_NAME --dry-run <!-- dry run will simulate the output of the command without actually creating anything -->

<!-- Service -->
npx -p @nestjs/cli nest generate service
npx -p @nestjs/cli nest g s

<!-- Module -->
npx -p @nestjs/cli nest generate module
npx -p @nestjs/cli nest g module MODULE_NAME

<!-- DTO -->
npx -p @nestjs/cli nest g class movements/dto/create-movements.dto --no-spec
npx -p @nestjs/cli nest g class common/dto/pagination-query.dto --no-spec


<!-- Entities -->
npx -p @nestjs/cli nest g class movements/entities/equipment.entity --no-spec

<!-- Writing Migrations -->
npx typeorm migration:create -n MovementRefactor

<!-- Running Migrations
Remember 💡 You must BUILD your Nest project (so that everything is output to the `/dist/` folder, before a Migration can run, it needs compilated files. -->

  <!-- Step 1: Compile project first  -->
  npm run build

  <!-- Step 2: Exec into backend container  -->
  docker exec -it bonito_backend_dev_1 sh

  <!-- Step 3: Run migration(s)  -->
  npx typeorm migration:run

  <!-- REVERT migration(s) -->
  npx typeorm migration:revert

  <!-- Let TypeOrm generate migrations (for you) -->
  <!-- Step 1: Edit and entity file -->
  <!-- Step 2: -->
    npx typeorm migration:generate -n SchemaSync