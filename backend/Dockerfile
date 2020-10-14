FROM node:12.18-alpine As development

WORKDIR /usr/src/app

# copy only package.json and package-lock.json (if it exists)
# By first copying only package*.json files, we are telling Docker that it should
# run npm install and all the commands appearing afterwards only when either 
# package.json or package-lock.json files change.
COPY package*.json ./

# install only devDependencies due to the container being used as a “builder” 
RUN npm install

COPY . .

# we make sure the app is built in the /dist folder. Since our application uses
# TypeScript and other build-time dependencies, we have to execute this command
# in the development image.
RUN npm run build

# By using the FROM statement again, we are telling Docker that it should create a new,
# fresh image without any connection to the previous one. This time we are naming it production.
FROM node:12.18-alpine as production

# Here we are using the ARG statement to define the default value for NODE_ENV, even though the 
# default value is only available during the build time (not when we start the application).
# Then we use the ENV statement to set it to either the default value or the user-set value.
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# this time, we are making sure that we install only dependencies defined in dependencies
# in package.json by using the --only=production argument. This way we don’t install packages
# such as TypeScript that would cause our final image to increase in size.
COPY package*.json ./

RUN npm install --only=production

COPY . .

# Here we copy the built /dist folder from the development image.
# This way we are only getting the /dist directory, without the devDependencies,
# installed in our final image.
COPY --from=development /usr/src/app/dist ./dist

# Here we define the default command to execute when the image is run.
# since @nestjs/cli is a devDependency we use the same command that 'npm run start:prod' would otherwise
CMD ["node", "dist/main"]