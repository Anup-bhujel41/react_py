FROM node:14-alpine

ENV PORT=3001

WORKDIR /Fashionfit

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]