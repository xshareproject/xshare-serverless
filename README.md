Project Dependancies
=============== 
	- Frontend
		○ React & React Native
		○ ExpoJS
		○ Additional library: React Navigation, React Native Element
		○ To install: run npm i on swish Root folder

	- Backend
		○ ExpressJS
		○ PostgreSQL
		○ Sequelize ORM
		○ To install: run npm i on swish-frontend folder

Development
=============== 
<<<<<<< HEAD
	- Development for backend and frontend are separated on diffirent branches, currently only frontend-dev exists
	- Never push to master directly, push changes to appropriate branches and do a merge
	- Frontend and backend can run independantly from each other, so in development only need to start one of them unless we are doing integration
	- For backend running, Postgres installation are required and setup credentials (I will add instructions in here later)
	- I will also add the setup script for database (initializing all tables and mockup data) 
=======
	- Frontend and backend can run independantly from each other, so in development only need to start one of them unless we are doing integration
	- For backend running, Postgres installation are required and setup credentials (I will add instructions in here later)
	- I will also add the setup script for database (initializing all tables and mockup data) 
	
	- To start both: npm start at root folder

	- Frontend:
		○ cd swish-frontend && npm start
		○ Or npm run frontend at root folder

	- Backend:
		○ cd server && npm run dev 
		○ Or npm run backend
>>>>>>> f37cda6a68fa4aa5be70ab28683a80d47b146302

	- To start both: npm start at root folder

	- Frontend:
		○ cd swish-frontend && npm start
		○ Or npm run frontend at root folder

	- Backend:
		○ cd server && npm run dev 
		○ Or npm run backend
