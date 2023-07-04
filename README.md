## Aplicación

-  La aplicación es una prueba en la que se toca principalmente autenticación, control de estados, testing, componetización y websockets.

-  Se encuentra en desarrollo y le queda una actualización antes de ser realmente usable

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

## Como apunte, para probar la aplicación rápidamente y ver su funcionamiento, recomiendo lo siguiente.

-  Ejecutar el servidor de Laravel, la api. En la raíz del proyecto ejecutando "php artisan serve" (no mediante Xampp)

-  Ejecutar el servicio de websockets. En la raiz del proyecto ejecutando "php artisan websockets:serve"

-  Ejecutar la parte front. En el fichero "react" ejecutando "npm run dev"

-  Registrar dos usuarios y loguearse en dos navegadores distintos o en el mismo en privado y en público.

-  Crear manualmente una sala de chat (importante que el ID sea 1, ya que es la que se usa en la demo por ahora por defecto)

-  En la tabla "chat_user", crear dos registros, uno para cada usuario, de manera que en cada registro el "chat_id" sea 1, y el "user_id" corresponda a cada usuario en su registro respectivo

-  Con todo esto, acceder con los usuarios logueados a la ruta .../chat de la app y empezar a chatear
