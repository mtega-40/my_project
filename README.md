# Farm Management System

A complete farm management platform built with Node.js, PostgreSQL, and React. This application helps farmers manage all aspects of their farm operations including farms, crops, livestock, inventory, workers, finances, and tasks.

## Tech Stack

- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: React 18, Vite, Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS, Lucide React icons

## Features

- User authentication and authorization (Owner, Manager, Admin, Worker roles)
- Farm management with location, area, and ownership
- Crop field management with soil types and planting dates
- Livestock tracking with health status, weight, and breeding info
- Inventory management with low-stock alerts
- Worker/staff management with positions and salaries
- Finance tracking (income, expenses, profit summaries)
- Task assignment and completion tracking
- Responsive web interface with modern UI

## Project Structure

```
project-4/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── database/
│       │   ├── config.js
│       │   └── migrate.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Farm.js
│       │   ├── Field.js
│       │   ├── Livestock.js
│       │   ├── Inventory.js
│       │   ├── Worker.js
│       │   ├── Finance.js
│       │   └── Task.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── farmController.js
│       │   ├── fieldController.js
│       │   ├── livestockController.js
│       │   ├── inventoryController.js
│       │   ├── workerController.js
│       │   ├── financeController.js
│       │   └── taskController.js
│       ├── routes/
│       │   ├── auth.js
│       │   ├── farm.js
│       │   ├── field.js
│       │   ├── livestock.js
│       │   ├── inventory.js
│       │   ├── worker.js
│       │   ├── finance.js
│       │   └── task.js
│       └── utils/
│           ├── logger.js
│           └── auth.js
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── App.js
        ├── main.js
        ├── index.css
        ├── api/
        │   └── index.js
        ├── components/
        │   ├── Layout.js
        │   ├── LoginForm.js
        │   └── RegisterForm.js
        ├── contexts/
        │   └── AuthContext.js
        └── pages/
            ├── Dashboard.js
            ├── Farms.js
            ├── FarmDetail.js
            ├── FarmForm.js
            ├── Livestock.js
            ├── Inventory.js
            ├── Workers.js
            ├── Finance.js
            ├── Tasks.js
            └── Settings.js
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database credentials and secret keys.

4. Create the database and run migrations:
   ```bash
   npm run migrate
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

### Database Setup

Create a PostgreSQL database and user with the credentials specified in your `.env` file:

```sql
CREATE DATABASE farm_management;
CREATE USER farm_user WITH PASSWORD 'farm_password';
GRANT ALL PRIVILEGES ON DATABASE farm_management TO farm_user;
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

### Farms
- `POST /api/farms` - Create a new farm
- `GET /api/farms` - Get all farms for current user
- `GET /api/farms/:id` - Get farm by ID
- `PUT /api/farms/:id` - Update farm
- `DELETE /api/farms/:id` - Delete farm

### Fields (nested under farms)
- `POST /api/farms/:farmId/fields` - Create field
- `GET /api/farms/:farmId/fields` - Get all fields
- `PUT /api/farms/:farmId/fields/:id` - Update field
- `DELETE /api/farms/:farmId/fields/:id` - Delete field

### Livestock (nested under farms)
- `POST /api/farms/:farmId/livestock` - Create livestock entry
- `GET /api/farms/:farmId/livestock` - Get all livestock
- `PUT /api/farms/:farmId/livestock/:id` - Update livestock
- `DELETE /api/farms/:farmId/livestock/:id` - Delete livestock

### Inventory (nested under farms)
- `POST /api/farms/:farmId/inventory` - Create inventory item
- `GET /api/farms/:farmId/inventory` - Get all inventory
- `GET /api/farms/:farmId/inventory/low-stock` - Get low stock items
- `PUT /api/farms/:farmId/inventory/:id` - Update item
- `DELETE /api/farms/:farmId/inventory/:id` - Delete item

### Workers (nested under farms)
- `POST /api/farms/:farmId/workers` - Create worker
- `GET /api/farms/:farmId/workers` - Get all workers
- `PUT /api/farms/:farmId/workers/:id` - Update worker
- `DELETE /api/farms/:farmId/workers/:id` - Delete worker

### Finance (nested under farms)
- `POST /api/farms/:farmId/finance/expense` - Create expense
- `POST /api/farms/:farmId/finance/income` - Create income
- `GET /api/farms/:farmId/finance/expenses` - Get expenses
- `GET /api/farms/:farmId/finance/income` - Get income
- `GET /api/farms/:farmId/finance/summary` - Get financial summary

### Tasks (nested under farms)
- `POST /api/farms/:farmId/tasks` - Create task
- `GET /api/farms/:farmId/tasks` - Get all tasks
- `PUT /api/farms/:farmId/tasks/:id` - Update task
- `POST /api/farms/:farmId/tasks/:id/complete` - Mark task as complete
- `DELETE /api/farms/:farmId/tasks/:id` - Delete task

## Default Admin Account

After running the migration, you can register a new account through the frontend. The first user you register will have access to create farms and manage all aspects of the system.

## License

ISC