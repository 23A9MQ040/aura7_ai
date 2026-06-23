FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY aura-career-agent/pom.xml /app/aura-career-agent/pom.xml
COPY aura-career-agent/src /app/aura-career-agent/src

WORKDIR /app/aura-career-agent
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/aura-career-agent/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
