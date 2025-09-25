FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY services/IdentityService/IdentityService.csproj ./services/IdentityService/

RUN dotnet restore ./services/IdentityService/IdentityService.csproj

COPY . .
RUN dotnet publish ./services/IdentityService/IdentityService.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "IdentityService.dll"]