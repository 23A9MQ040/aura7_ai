FROM maven:3.9.6-eclipse-temurin-20-alpine AS builder
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY aura-memory-service/pom.xml /app/aura-memory-service/pom.xml
COPY aura-memory-service/src /app/aura-memory-service/src

WORKDIR /app/aura-memory-service
RUN mvn clean package -DskipTests

FROM eclipse-temurin:20-jre-alpine
WORKDIR /app
COPY --from=builder /app/aura-memory-service/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
