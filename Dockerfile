from node:14
WORKDIR /app
COPY package*.json ./
COPY .env .
RUN npm install
COPY index.js .
CMD [ "node", "index.js" ]
