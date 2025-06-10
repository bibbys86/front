FROM node:20-alpine AS builder
WORKDIR /app

# 의존성만 먼저 복사하여 캐시 활용
COPY package*.json ./
RUN npm ci --prefer-offline

# 소스코드 복사 및 빌드
COPY . .
RUN npm run build

# Nginx에서 정적 파일 서빙 + JSON 로그 출력
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]