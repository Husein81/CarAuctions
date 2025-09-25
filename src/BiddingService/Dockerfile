FROM mrc.microsoft.com/dotnet/sdk:9.0 as build
WORKDIR /app

COPY src/BiddingService/BiddingService.csproj ./src/BiddingService/
COPY src/Contracts/Contracts.csproj ./src/Contracts/

RUN dotnet restore ./src/BiddingService/BiddingService.csproj

COPY . .

RUN dotnet publish ./src/BiddingService/BiddingService.csproj -c Release -o /app/publish

FROM mrc.microsoft.com/dotnet/aspnet:9.0 as runtime
WORKDIR /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT [ "dotnet", "BiddingService.dll" ]