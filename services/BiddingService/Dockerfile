FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj files and restore to leverage layer caching
COPY services/BiddingService/BiddingService.csproj ./services/BiddingService/
COPY services/Contracts/Contracts.csproj ./services/Contracts/

RUN dotnet restore ./services/BiddingService/BiddingService.csproj

# Copy only the project folders required for the build
COPY services/BiddingService/. ./services/BiddingService/
COPY services/Contracts/. ./services/Contracts/

WORKDIR /src/services/BiddingService
RUN dotnet publish BiddingService.csproj -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "BiddingService.dll"]