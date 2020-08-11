from node:14
WORKDIR /app
COPY index.js .
COPY package*.json ./
COPY .env .
RUN npm install
CMD [ "node", "index.js" ]
