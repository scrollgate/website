
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_REACT_APP_BASE_NAME
ARG VITE_REACT_APP_BASE_API_URL
ENV TZ=Asia/Ho_Chi_Minh
RUN npm run build
RUN npm install -g serve
CMD serve -s dist -p 3200
EXPOSE 3200
