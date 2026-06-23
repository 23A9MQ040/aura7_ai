FROM maven:3.9.6-eclipse-temurin-20-alpine AS builder
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY aura-learning-agent/pom.xml /app/aura-learning-agent/pom.xml
COPY aura-learning-agent/src /app/aura-learning-agent/src

WORKDIR /app/aura-learning-agent
RUN mvn clean package -DskipTests

FROM eclipse-temurin:20-jre-alpine
WORKDIR /app
COPY --from=builder /app/aura-learning-agent/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
