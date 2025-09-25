FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY services/AuctionService/AuctionService.csproj ./services/AuctionService/
COPY services/Contracts/Contracts.csproj ./services/Contracts/

RUN dotnet restore ./services/AuctionService/AuctionService.csproj

COPY . .
RUN dotnet publish ./services/AuctionService/AuctionService.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AuctionService.dll"]
