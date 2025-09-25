# CarAuctions

A full-stack microservices-based car auction platform. This repository contains multiple services and a modern web frontend for managing, bidding, and searching car auctions.

## Solution Structure

- `frontend/web-app/` — Next.js 14 (App Router) frontend with NextAuth, React Query, and TypeScript
- `src/AuctionService/` — .NET 9 microservice for managing auctions (REST + gRPC)
- `src/BiddingService/` — .NET 9 microservice for handling bids, communicates with AuctionService via gRPC
- `src/IdentityService/` — .NET 9 IdentityServer (Duende) for authentication/authorization
- `src/SearchService/` — .NET 9 microservice for search/indexing
- `src/Contracts/` — Shared message contracts (MassTransit, gRPC, etc.)
- `docker-compose.yml` — Orchestrates all services and dependencies (Postgres, RabbitMQ, etc.)

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
   docker-compose up -d
   ```
3. **Build and run backend services:**
   ```sh
   # Example for AuctionService
   cd src/AuctionService
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
docker-compose up --build
```

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
