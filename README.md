# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker  compose up -d
```

2. Renombrar  el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el SEED  para [crear la base de datos local](http://localhost:3000/api/seed)
5. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```

## NOTA: usuario por defecto
usuario: test1@google.com
password: 123

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage