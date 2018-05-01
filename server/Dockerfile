FROM node:9-alpine
RUN mkdir /app
WORKDIR "/app"
ADD package.json package-lock.json /app/
RUN npm install
ADD . /app
CMD ["npm", "start"]