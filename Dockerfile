FROM node:16

WORKDIR /app

COPY . .
RUN npm install 
RUN npm run dev
CMD [ "npm", "run", "dev" ]