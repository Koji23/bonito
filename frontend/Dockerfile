# using "as" here will designate everything under the FROM command as part of the 
# "builder" phase. This phase is dedicated to installing dependencies required to build
# the static assets that the production frontend service will serve.
FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
# We will not use volumes here since the production code is not changing so this step
# is necessary this time
COPY . .
# 'npm run build' will output a /build directory inside of the container's /app dir
RUN npm run build

# By adding a second FROM statement, docker will infer the end of the previous phase
FROM nginx
# below we are copying the contents of '/app/build' from the "builder" phase into the
# '/usr/share/nginx/html' folder of the final run phase. Nginx docs specify that 
# '/usr/share/nginx/html' is where to host simple static content from
COPY --from=builder /app/build /usr/share/nginx/html
# the default command is already provided by the ngnix image