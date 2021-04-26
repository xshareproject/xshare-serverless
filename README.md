Project Dependancies
	- Backend
		○ ExpressJS
		○ PostgreSQL
		○ Sequelize ORM
		○ To Docker

Development
=============== 
	- Run npm install on root folder 
	- To build docker backend image: Run docker build -t xshare-backend:latest . (the . is required, specifying current directory)
	- To run container: docker-compose up
	- If need to re-initialize database: Delete postgres container and volume, then run docker-compose up 
=======
