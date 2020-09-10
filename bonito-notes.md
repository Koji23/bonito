
<!-- ESlint Typescript-->
Open VScode inside ./backend or other subfolder in order to avoid errors 
such as "Parsing Error: cannot read file .../tsconfig.json when viewing 
typescript files inside VSCode

<!-- Docker Compose -->
docker-compose up

docker-compose down

<!-- If a new service was added to docker-compose add the --build flag -->
docker-compose up --build

<!-- remember these commands need to be run from the same directory as the yml file -->
docker-compose ps



<!-- Creating Services: -->

backend
npx -p @nestjs/cli nest new backend
rm -rf .git
rm -rf node_modules

frontend
npx create-react-app frontend
rm -rf .git
rm -rf node_modules