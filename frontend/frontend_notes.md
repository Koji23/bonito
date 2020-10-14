<!-- --all will list nonrunning containers too -->

docker ps
docker ps --all

<!-- docker run is equivalent to create + start. But docker start won't give logs by default so we add the -a flag. 'docker start' can be used to restart stopped container however it cannot override the default run command (even the docker run can override that command) -->

docker create IMAGE_ID
docker start -a CONTAINER_ID

<!-- removing stopped containers. This also clears the cache so images downloaded from dockerhub will need a minute to be redownloaded next time they are used -->

docker system prune

<!-- grab logs without rerunning or restarting a container -->

docker logs CONTAINER_ID

<!-- stopping containers, will issue a hardware signal SIGTERM aka "terminate signal" to the primary running process inside the container. SIGTERM will give the process a little bit of time to clean up and shutdown ie. saveing some files or emitting some messages. Docker by default will allow 10 seconds for the process to shutdown before it will issue a docker kill command behind the scenes for you -->

docker stop CONTAINER_ID

<!-- issues a SIGKILL command to the container's process which will stop the process without allowing it to do any additional work. Only use 'docker kill' when it seems like the container has locked up and won't respond -->

docker kill CONTAINER_ID

<!-- executing additional commands inside of running multi command containers. The -it flag allows us to provide input into the container ie. redis-cli or sh or bash or even zsh. It is a combination of the individual -i and -t flags. -i means attach to STDIN and -t means means to nicely format STDOUT and STDERR.  -->

docker exec -it CONTAINER_ID command-to-execute

<!-- starting a container with a shell (without a default process running) this is just for poking around the container -->

docker run -it CONTAINER_ID sh

<!-- build the container, don't forget the '.' or build context. The build context is the set of files and folders that belong to the project -->
<!-- tagging conventions => DOCKER_ID/PROJECT_NAME:VERSION -->
<!-- when running an image by its tag, the version can be ommitted and "latest" will be assumed -->
<!-- Note: Building images can be slow if node_modules exist locally since it will be included when sending the build context to the Docker Daemon. You may want to delete node_modules before doing this. However you may also want to keep node_modules around so your editor will be able to autosuggest exports from npm packages. Your call... -->

docker build -f Dockerfile.dev -t koji23/frontend:latest .

<!-- manually run container with port mapping local port:container port -->
<!--  -->

docker run -it -p 3000:3000 IMAGE_ID

<!-- Manual version of docker compose volumes
 1.) "-v $(pwd):/usr/app" means map the local present working directory into the /usr/app folder on the container
 2.) "-v /usr/app/node_modules" the local node_modules at pwd is completely irrelevant, might not exist, and is otherwise just confusing to have. By omitting the "$(pwd):" and just putting the container directory, we are essentially placing a boomark on the volume and saying to docker not to map node_modules up to any local directory -->

docker run -it -p 3000:3000 -v /usr/app/node_modules -v \$(pwd):/usr/app IMAGE_ID

<!-- Manually run tests by overriding the default run command. Changes to the repo will not be observed so the interactive container must be stopped and rerun to pick up changes. We should prefer the below option instead -->

docker run -it IMAGE_ID npm run test

<!-- If we 'docker-compose up' first, we can grab the CONTAINER_ID from 'docker ps' and execute the test command inside the container that already has volumes mounted to the file system. This will allow for automatically updating tests. But grabbing the ID is a bit laborious. Still this is the best option if we want to use CRA's test suite commands -->

docker exec -it CONTAINER_ID npm run test

<!--  -->

docker exec -it CONTAINER_ID sh

<!-- attach to the stdin, stdout, & stderr of the primary process of a container -->

docker attach CONTAINER_ID
