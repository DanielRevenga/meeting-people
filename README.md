## Aplicación

### La aplicación es una prueba en la que se toca principalmente autenticación, control de estados, testing, componetización y websockets.

### Se encuentra en desarrollo y le queda una actualización antes de ser realmente usable

## == TODO: Exponer planificación y razonamiento del proceso ==

## Requisitos hacer funcionar la aplicación - Laravel

### Instalar PHP v8.2.4 ⇒ https://www.php.net/downloads.php

### instalar Composer ⇒ https://getcomposer.org/download/

### Instalar Dependencias ⇒ “composer install” “npm install”

### copia el .env-example en el mismo lugar, pero con el nombre .env ejecuta los comandos siguientes por si no se aplicase la configuración del fichero .env ⇒ “php artisan config:cache” “php artisan optimize”

### Generar app key => app key ⇒ php artisan key:generate

### Tener iniciado un servidor local para la base de datos, como Xampp.

### Recomendable tener instalado un gestor de bases de datos y levantar BD mysql con las credenciales del .env (DB_CONECCTION, DB_DATABASE, etc.).

### Ejecutar las migraciones y “Rellenar” la base de datos ⇒ “php artisan migrate”

### Inicia la app ⇒ “php artisan serve”

### Levantar servicio websockets ⇒ "php artisan websockets:serve"

## Requisitos hacer funcionar la aplicación - React

### Instar Node => https://nodejs.org

### Instalar dependecias ⇒ “npm install”

### Inicia la app ⇒ “npm run dev”
