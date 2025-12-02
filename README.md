# Backend Test MCM - Project Documentation

A Node.js/Express backend API for managing cinema operations including studios, films, showtimes, and tickets.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Environment Management**: dotenv

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm**
- **Local MySQL** (v5.7 or higher)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend-test-mcm
```

### 2. Install Dependencies

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with your database configuration:

```env
# Database Configuration
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=mcm_development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mysql

# Node Environment
NODE_ENV=development
```

**Important Notes:**
- Replace `your_password` with your actual MySQL password
- Default username is `root` (adjust if your MySQL user is different)
- `DB_HOST` can be `localhost` or `127.0.0.1`
- `DB_PORT` is typically `3306` for MySQL

## Database Setup

### 1. Create the Database

```bash
npm run db:create
```

This creates the `mcm_development` database specified in your `.env` file.

### 2. Run Migrations

```bash
npm run db:migrate
```

This creates all necessary tables:
- `studios` - Cinema studios/theaters
- `films` - Movie information
- `showtimes` - Film showtimes
- `tickets` - Ticket bookings

### 3. Seed Sample Data (Optional)

```bash
npm run db:seed
```

This populates the database with sample data for studios, films, showtimes, and tickets for testing.

## Running the Server

### Start the Development Server

```bash
npm start
```

The server will start on **http://localhost:3000** (or the port specified in `bin/www`).

You should see:
```
Database connection has been established successfully.
Server is running on port 3000
```

## Project Structure

```
backend-test-mcm/
├── bin/
│   └── www                          # Server entry point
├── config/
│   └── config.js                    # Database configuration
├── controllers/                     # Request handlers
│   ├── filmController.js
│   ├── showtimeController.js
│   ├── studioController.js
│   └── ticketController.js
├── models/                          # Sequelize models & database connection
│   ├── film.js
│   ├── showtime.js
│   ├── studio.js
│   ├── ticket.js
│   └── index.js
├── routes/                          # API route definitions
│   ├── films.js
│   ├── showtimes.js
│   ├── studios.js
│   └── tickets.js
├── migrations/                      # Database migrations
│   ├── 20251202104414-create-studio.js
│   ├── 20251202111120-create-film.js
│   ├── 20251202113000-create-showtime.js
│   └── 20251202114000-create-ticket.js
├── seeders/                         # Sample data seeds
│   ├── 20251202104518-demo-studios.js
│   ├── 20251202111306-demo-films.js
│   ├── 20251202113030-demo-showtimes.js
│   └── 20251202114030-demo-tickets.js
├── validators/                      # Input validation
│   ├── filmValidator.js
│   ├── showtimeValidator.js
│   ├── studioValidator.js
│   └── ticketValidator.js
├── services/                        # Business logic
│   ├── filmService.js
│   ├── showtimeService.js
│   ├── studioService.js
│   └── ticketService.js
├── .env                             # Environment variables (not in version control)
├── .sequelizerc                     # Sequelize CLI configuration
├── app.js                           # Express app setup
├── package.json                     # Project dependencies
└── readme.md                        # This file
```

## API Endpoints

The server provides REST API endpoints for:

### Studios
- `GET /studios` - Get all studios
- `POST /studios` - Create a new studio
- `GET /studios/:id` - Get studio details
- `PUT /studios/:id` - Update a studio
- `DELETE /studios/:id` - Delete a studio

### Films
- `GET /films` - Get all films
- `POST /films` - Create a new film
- `GET /films/:id` - Get film details
- `PUT /films/:id` - Update a film
- `DELETE /films/:id` - Delete a film

### Showtimes
- `GET /showtimes` - Get all showtimes
- `POST /showtimes` - Create a new showtime
- `GET /showtimes/:id` - Get showtime details
- `PUT /showtimes/:id` - Update a showtime
- `DELETE /showtimes/:id` - Delete a showtime

### Tickets
- `GET /tickets` - Get all tickets
- `POST /tickets` - Create a new ticket
- `GET /tickets/:id` - Get ticket details
- `PUT /tickets/:id` - Update a ticket
- `DELETE /tickets/:id` - Delete a ticket

## API Documentation

### Postman Collection

You can view and test all API endpoints using our Postman collection:

[![Postman Collection](https://run.pstmn.io/button.svg)](https://www.postman.com/telecoms-astronaut-92713614/workspace/cinemas-system-mcm-test/collection/19274182-7da9f789-0796-4d78-8525-d5ee2b70d792?action=share&creator=19274182)

Or access it directly: [Cinemas System MCM Test Collection](https://www.postman.com/telecoms-astronaut-92713614/workspace/cinemas-system-mcm-test/collection/19274182-7da9f789-0796-4d78-8525-d5ee2b70d792?action=share&creator=19274182)