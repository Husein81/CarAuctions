FROM mrc.microsoft.com/dotnet/sdk:9.0 as build
WORKDIR /app

COPY services/BiddingService/BiddingService.csproj ./services/BiddingService/
COPY services/Contracts/Contracts.csproj ./services/Contracts/

RUN dotnet restore ./services/BiddingService/BiddingService.csproj

COPY . .

RUN dotnet publish ./services/BiddingService/BiddingService.csproj -c Release -o /app/publish

FROM mrc.microsoft.com/dotnet/aspnet:9.0 as runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT [ "dotnet", "BiddingService.dll" ]