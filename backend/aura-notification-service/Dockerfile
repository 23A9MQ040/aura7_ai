FROM maven:3.9.6-eclipse-temurin-20-alpine AS builder
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY aura-notification-service/pom.xml /app/aura-notification-service/pom.xml
COPY aura-notification-service/src /app/aura-notification-service/src

WORKDIR /app/aura-notification-service
RUN mvn clean package -DskipTests

FROM eclipse-temurin:20-jre-alpine
WORKDIR /app
COPY --from=builder /app/aura-notification-service/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
