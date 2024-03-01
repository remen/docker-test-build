# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
#EXPOSE 3000

FROM base as build
ENV NODE_ENV test
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .
RUN npm run test
RUN npm run build

FROM base as app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
USER node
COPY --from=build /usr/src/app/dist /usr/src/app/dist
CMD node dist/index.js

