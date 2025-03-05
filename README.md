## Запуск проекта

### Продакшен
```sh
docker-compose -f docker-compose.prod.yml up --build
```

### Локальная разработка
```sh
docker-compose -f docker-compose.dev.yml up --build
```

#### Запуск вручную:
```sh
cd backend && npm run start:dev
cd frontend && npm run dev
```

