FROM node:18

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-found --loglevel=error

EXPOSE 3222

CMD ["npm", "run", "start"]
