FROM maven:3.9.6-eclipse-temurin-20-alpine AS builder
WORKDIR /app
COPY pom.xml /app/pom.xml
COPY aura-agent-core/pom.xml /app/aura-agent-core/pom.xml
COPY aura-agent-core/src /app/aura-agent-core/src

WORKDIR /app/aura-agent-core
RUN mvn clean package -DskipTests

FROM eclipse-temurin:20-jre-alpine
WORKDIR /app
COPY --from=builder /app/aura-agent-core/target/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
