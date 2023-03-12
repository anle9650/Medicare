# Stage1: UI Build
FROM node:14-slim AS client-build
WORKDIR /usr/src
COPY client/ ./client/
RUN cd client && npm install && npm run build

# Stage2: API Build
FROM node:14-slim AS server-build
WORKDIR /usr/src
COPY server/ ./server/
RUN cd server && npm install && ENVIRONMENT=production npm run build
RUN ls

# Stage3: Packaging the app
FROM node:14-slim
WORKDIR /root/
COPY --from=client-build /usr/src/client/dist ./client/dist
COPY --from=server-build /usr/src/server/dist .
RUN ls

EXPOSE 80

CMD ["node", "server.bundle.js"]