FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY aura-auth-service/pom.xml /app/aura-auth-service/pom.xml
COPY aura-auth-service/src /app/aura-auth-service/src

WORKDIR /app/aura-auth-service
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/aura-auth-service/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
