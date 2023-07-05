## Aplicación

-  La aplicación es una prueba en la que se toca principalmente autenticación, control de estados, testing, componetización y websockets.

-  Hay tres Screens principales: Autenticación (login, signup), Dashboard (listado de usuarios para chatear) y Chat (chat privado)

## == TODO: Exponer planificación y razonamiento del proceso ==

## Requisitos hacer funcionar la aplicación - Laravel

-  Instalar PHP v8.2.4 ⇒ Una forma de hacerlo es a trabés del pack de Xampp: https://www.apachefriends.org/download.html

-  Instalar Composer ⇒ https://getcomposer.org/download/

-  Instalar Dependencias ⇒ “composer install” “npm install”

-  Copiar el .env-example en el mismo lugar, pero con el nombre .env

-  Generar app key => app key ⇒ php artisan key:generate

-  Ejecutar las migraciones y “Rellenar” la base de datos ⇒ “php artisan migrate”

-  Tener iniciado un servicio de base de datos. Si instalaste Xampp, con inicial el panel de control y activar únicamente la parte de MySQL (en el puerto 3306), debería valer.

-  Recomendable tener instalado un gestor de bases de datos o similar (Como TablePlus), asegurarse de que las especificaciones con las mismas que las del fichero .env y ver si las trablas generadas con el comando migrate anterior se generaron correctamente.

## Requisitos hacer funcionar la aplicación - React

-  Instar Node => https://nodejs.org

-  Instalar dependecias ⇒ “npm install”

-  Inicia la app ⇒ “npm run dev”

## Para probar la aplicación rápidamente y ver su funcionamiento

-  Ejecutar el servidor de Laravel, la api. En la raíz del proyecto ejecutando "php artisan serve" (no mediante Xampp)

-  Ejecutar el servicio de websockets. En la raiz del proyecto ejecutando "php artisan websockets:serve"

-  Ejecutar la parte front. En el fichero "react" ejecutando "npm run dev"

-  Registrar al menos par de usuarios, uno de tipo "Client" y otro de tipo "Professional" y loguearse en dos navegadores distintos o en el mismo en privado y en público.

-  En el dashboard de cada usuario, iniciar chat con el otro usuario creado y empezar a chatear
