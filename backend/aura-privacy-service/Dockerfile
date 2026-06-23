FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY aura-privacy-service/pom.xml /app/aura-privacy-service/pom.xml
COPY aura-privacy-service/src /app/aura-privacy-service/src

WORKDIR /app/aura-privacy-service
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/aura-privacy-service/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
