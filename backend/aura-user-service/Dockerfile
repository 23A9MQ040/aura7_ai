FROM maven:3.9.6-eclipse-temurin-20-alpine AS builder
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY aura-user-service/pom.xml /app/aura-user-service/pom.xml
COPY aura-user-service/src /app/aura-user-service/src

WORKDIR /app/aura-user-service
RUN mvn clean package -DskipTests

FROM eclipse-temurin:20-jre-alpine
WORKDIR /app
COPY --from=builder /app/aura-user-service/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
