Spell Book Project
==================

This project consists of two parts:

1.  **Frontend** --- the user interface, available at: <https://github.com/breznovic/spell-book>.

2.  **Backend** --- the API for data handling, available at: <https://github.com/breznovic/spell_book_api>.

The project is containerized using Docker and Docker Compose.

* * * * *

Prerequisites
-------------

Before starting, ensure you have the following installed:

-   [Docker](https://docs.docker.com/get-docker/)

-   [Docker Compose](https://docs.docker.com/compose/install/)

* * * * *

Setup and Running the Project
-----------------------------

1.  **Clone the Repositories**:\
    Open your terminal and run the following commands to clone both repositories:

    bash

    Copy

    git clone https://github.com/breznovic/spell-book.git
    git clone https://github.com/breznovic/spell_book_api.git

2.  **Navigate to the Project Directory**:\
    Move into the directory where both repositories are located. For example:

    bash

    Copy

    cd path/to/your/project

3.  **Create file `docker-compose.yml` with text**:\

version: '3.8'

services:
  backend:
    build:
      context: ./backend
    ports:
      - "8001:8000"
    volumes:
      - ./backend:/app
    restart: always

  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"  
      
    command: /bin/bash -c \
      "pnpm start"	
      
    depends_on:
      - backend
    restart: always

4.  **Build and Run the Containers**:\
    In the root directory of the project (where the `docker-compose.yml` file is located), run the following command:

    bash

    Copy

    docker-compose up --build

    This command will:

    -   Build the Docker images for the frontend and backend.

    -   Start the containers.

5.  **Access the Application**:\
    After a successful launch:

    -   The frontend will be available at: [http://localhost:3000](http://localhost:3000/).

    -   The backend will be available at: [http://localhost:8001](http://localhost:8001/) (or another port if you modified it).

* * * * *

Stopping the Project
--------------------

To stop the containers, run the following command:

bash

Copy

docker-compose down

* * * * *

Additional Configuration
------------------------

If you need to change ports or other settings, edit the `docker-compose.yml` file before running the project.

* * * * *

Support
-------

If you have any questions or issues, please create an issue in the corresponding repository:

-   [Frontend Issues](https://github.com/breznovic/spell-book/issues)

-   [Backend Issues](https://github.com/breznovic/spell_book_api/issues)
