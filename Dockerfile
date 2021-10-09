
FROM node:16-alpine
RUN yarn global add serve
COPY ./build /jsonFormApp
# CMD ["serve","-s","/app"]
CMD ["serve","-s","-p","3001","/app"]