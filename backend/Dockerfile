# Utiliza una imagen base de Maven para compilar el proyecto
FROM maven:3.8.5-openjdk-17 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de Maven y descarga las dependencias
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copia el resto del código fuente del backend
COPY backend/src ./src

# Compila el proyecto y genera el archivo JAR
RUN mvn package -DskipTests

# Segunda etapa: crea una imagen ligera
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el JAR desde la etapa de compilación
COPY --from=build /app/target/*.jar app.jar

# Expone el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
