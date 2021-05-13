Project Dependancies
=============== 
- ExpressJS
- PostgreSQL
- Sequelize ORM
- Docker
- To install packages: run npm i on top level folder

Development
=============== 
- Run npm install on root folder 
- To build docker backend image: Run docker build -t xshare-backend:latest . (the . is required, specifying current directory)
- To run container: docker-compose up
- If need to re-initialize database: Delete postgres container and volume, then run docker-compose up 
(This is due to if docker detect existing container and volume, it would skip over initialization step, which include database initialization. There's probably a smarter way to do this)