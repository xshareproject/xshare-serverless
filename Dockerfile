#For building image for xshare-backend 

FROM node:latest
# App Directory
WORKDIR /code

# Dependancies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["npm", "start"]