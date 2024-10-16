FROM node:18.20.4-alpine3.19 as production
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
