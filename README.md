# Proyecto Spring Boot con PostgreSQL Dockerizada

Este proyecto utiliza Spring Boot y una base de datos PostgreSQL, que se ejecuta en un contenedor Docker. A continuación, se detallan las instrucciones para clonar el repositorio y configurar el entorno local.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Clonación del Repositorio

1. Clona el repositorio:
   ```bash
   git clone https://github.com/SlavikBlxt4/framing.git
   cd framing/demo
## Montar el Contenedor Docker

    Ejecuta el siguiente comando para levantar el contenedor:
    docker-compose up -d

Esto creará y ejecutará un contenedor PostgreSQL con las siguientes credenciales:

    Usuario: slavik
    Contraseña: mipassword
    Base de datos: framing

## Acceso a la Base de Datos

    Puedes acceder a la base de datos PostgreSQL en localhost:5432 usando las credenciales proporcionadas.

## Detener el Contenedor Docker

    Para detener el contenedor, puedes usar el siguiente comando:
    docker-compose down
