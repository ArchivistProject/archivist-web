FROM node:5.6

ENV INSTALL_PATH /archivist-web

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

CMD npm start
