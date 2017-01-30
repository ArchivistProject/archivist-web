# archivist-web

## Installation

Follow the steps for setting up Docker [here](https://github.com/ArchivistProject/archivist-docker).

To start the projects, run:

    docker-compose up --build

If the frontend started successfully, you should then see:

    webpack: bundle is now VALID.

If you go to [localhost:8080](http://localhost:8080), the website should be running.

## Updating modules

If new node modules are added to the project, run:

    docker-compose stop
    docker-compose down
    docker-compose up --build
