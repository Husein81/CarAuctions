FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY services/GatewayService/GatewayService.csproj ./services/GatewayService/

RUN dotnet restore ./services/GatewayService/GatewayService.csproj

COPY . .
RUN dotnet publish ./services/GatewayService/GatewayService.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "GatewayService.dll"]