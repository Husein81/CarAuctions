FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY services/NotificationService/NotificationService.csproj ./services/NotificationService/
COPY services/Contracts/Contracts.csproj ./services/Contracts/

RUN dotnet restore ./services/NotificationService/NotificationService.csproj

COPY . .
RUN dotnet publish ./services/NotificationService/NotificationService.csproj -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "NotificationService.dll"]