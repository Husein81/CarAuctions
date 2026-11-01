# CarAuctions

A full-stack microservices-based car auction platform. This repository contains multiple services and a modern web frontend for managing, bidding, and searching car auctions.

## Solution Structure

- `frontend/web-app/` — Next.js 15 (App Router) frontend with NextAuth, React Query, and TypeScript
- `services/AuctionService/` — .NET 9 microservice for managing auctions (REST + gRPC)
- `services/BiddingService/` — .NET 9 microservice for handling bids, communicates with AuctionService via gRPC
- `services/IdentityService/` — .NET 8 IdentityServer (Duende) for authentication/authorization
- `services/SearchService/` — .NET 9 microservice for search/indexing
- `services/NotificationService/` — .NET 9 SignalR hub that pushes auction/bid events to browsers
- `services/GatewayService/` — .NET 9 YARP reverse proxy; the single public entry point for the API
- `services/Contracts/` — Shared message contracts (MassTransit, gRPC, etc.)
- `docker-compose.yml` — Orchestrates all services and dependencies (Postgres, MongoDB, RabbitMQ, etc.)
- `infra/K8S/` — Kubernetes manifests for the same stack

## Key Technologies
- **Frontend:** Next.js, React 19, NextAuth, TanStack React Query, TypeScript
- **Backend:** .NET 9, Entity Framework Core, MassTransit (RabbitMQ), gRPC, MongoDB, PostgreSQL
- **Auth:** Duende IdentityServer, JWT, OAuth2/OpenID Connect
- **Messaging:** MassTransit, RabbitMQ
- **Containerization:** Docker, Docker Compose

## Getting Started

### Prerequisites
- .NET 9 SDK
- Node.js 20+ and pnpm (or npm/yarn)
- Docker & Docker Compose

### Local Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Husein81/CarAuctions.git
   cd CarAuctions
   ```
2. **Start infrastructure:**
   ```sh
   docker compose up -d postgres mongodb rabbitmq
   ```
3. **Build and run backend services:**
   ```sh
   # Example for AuctionService
   cd services/AuctionService
   dotnet build
   dotnet run
   # Repeat for BiddingService, IdentityService, SearchService
   ```
4. **Start the frontend:**
   ```sh
   cd frontend/web-app
   pnpm install
   pnpm dev
   # or npm install && npm run dev
   ```

### Environment Variables
- See `.env` and `.env.local` files in each service for configuration (connection strings, secrets, URLs).

### Building & Running with Docker Compose
```sh
docker compose up --build
```
Search and Bidding use the `mongodb` container by default. To point them at a hosted
cluster instead, set `SEARCH_MONGO_CONNECTION` / `BID_MONGO_CONNECTION` in an untracked
`.env` file next to `docker-compose.yml`.

The frontend's `NEXT_PUBLIC_*` values are compiled into the image, so they are build args
(see `web-app` in `docker-compose.yml`), not container environment variables.

### Running on Kubernetes (local, Docker Desktop)
The manifests in `infra/K8S/` use `imagePullPolicy: Never`, so the images must exist in the
local Docker image store first:
```sh
docker compose build                 # tags trycatchlearn/<service>:latest
kubectl apply -f infra/K8S           # secrets, databases, RabbitMQ, services, web app
kubectl get pods -w
```
Service names match docker-compose (`auction-svc`, `identity-svc`, ...), so the same app
configuration works in both. The web app, identity service and gateway are published on
`localhost:3000`, `:5003` and `:7001` as `LoadBalancer` services; Postgres is on
`localhost:30001` and the RabbitMQ UI on `localhost:30002`.
`infra/K8S/secrets.yml` holds local-dev values only - do not reuse it for a real cluster.

## Project Highlights
- Modern authentication with NextAuth and Duende IdentityServer
- Secure, token-based API access (JWT, OAuth2)
- Real-time auction updates via MassTransit and RabbitMQ
- gRPC inter-service communication
- Background workers for auction finalization
- Fully containerized for local and cloud deployment

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss major changes.

## License
MIT or as specified in each service.
