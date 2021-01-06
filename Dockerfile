from node:14
WORKDIR /app
COPY package*.json ./
COPY .env .
COPY key.json .
RUN npm install
COPY index.js .
CMD [ "node", "index.js" ]
