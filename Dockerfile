FROM node:16

WORKDIR /usr/app

RUN npm i -g pm2

RUN apt-get update && apt-get install -yq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV NODE_ENV production

EXPOSE 3000

USER node

CMD [ "pm2-runtime", "start", "ecosystem.config.cjs", "--env", "production" ]


# disable multi stage build for now because of caching issue

# build
# FROM node:16-alpine

# WORKDIR /usr/app

# COPY ./package.json ./
# COPY ./yarn.lock ./

# RUN yarn install

# COPY . .

# RUN yarn build

# run
# FROM node:16-alpine

# ENV NODE_ENV production

# WORKDIR /usr/app

# COPY --from=builder /usr/app/package.json .
# COPY --from=builder /usr/app/ecosystem.config.cjs .
# COPY --from=builder /usr/app/dist ./dist

# RUN npm i --only=prod

# RUN npm i -g pm2

# EXPOSE 3000

# USER node

# CMD [ "pm2-runtime", "start", "ecosystem.config.cjs", "--env", "production" ]