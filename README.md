# Patient Registration System

A full-stack application for patient registration built with Laravel and React.

## Tech Stack

**Backend:** Laravel 11, PHP 8.4, PostgreSQL 16  
**Frontend:** React 19, TypeScript, Vite  
**Infrastructure:** Docker, Docker Compose

## Prerequisites

- Docker Desktop installed and running
- Ports 5173, 8000, and 5432 available

## Getting Started

### 1. Clone and navigate to the project

```bash
git clone <repository-url>
cd patient-registration
```

### 2. Start all services

```bash
docker-compose up --build
```

Wait until you see all containers running. First build may take a few minutes.

### 3. Run database migrations

In a new terminal:

```bash
docker-compose exec backend php artisan migrate
```

### 4. Create storage symbolic link

```bash
docker-compose exec backend php artisan storage:link
```

This allows uploaded photos to be publicly accessible.

### 5. Access the application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api/patients

## Project Structure

```
patient-registration/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Requests/    # Form validation
│   │   ├── Models/
│   │   └── Notifications/   # Email notifications
│   ├── database/migrations/
│   ├── routes/api.php
│   └── Dockerfile
├── frontend/                # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Reusable UI components
│   │   │   └── ...          # Feature components
│   │   ├── services/        # API calls
│   │   └── types/           # TypeScript interfaces
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Docker Services

| Service  | Port | Description                    |
|----------|------|--------------------------------|
| frontend | 5173 | React development server       |
| backend  | 8000 | Laravel API server             |
| db       | 5432 | PostgreSQL database            |
| queue    | -    | Background job processor       |

## API Endpoints

### GET /api/patients

Returns all registered patients.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "full_name": "John Doe",
      "email": "john@gmail.com",
      "phone_country_code": "+1",
      "phone_number": "5551234567",
      "document_photo_url": "http://localhost:8000/storage/documents/abc123.jpg",
      "created_at": "2024-01-10T12:00:00.000000Z",
      "updated_at": "2024-01-10T12:00:00.000000Z"
    }
  ]
}
```

### POST /api/patients

Creates a new patient. Requires `multipart/form-data`.

**Request body:**

| Field              | Type   | Rules                                    |
|--------------------|--------|------------------------------------------|
| full_name          | string | Required, letters and spaces only        |
| email              | string | Required, unique, must be @gmail.com     |
| phone_country_code | string | Required, must start with +              |
| phone_number       | string | Required, numbers only                   |
| document_photo     | file   | Required, JPG only, max 2MB              |

**Success response (201):**
```json
{
  "data": { ... },
  "message": "Patient created successfully"
}
```

**Validation error (422):**
```json
{
  "message": "The email has already been taken.",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
```

## Email Notifications

When a patient is created, a confirmation email is sent asynchronously via Laravel Queue.

**For development**, configure Mailtrap credentials in `docker-compose.yml`:

```yaml
MAIL_USERNAME: your_mailtrap_username
MAIL_PASSWORD: your_mailtrap_password
```

## Common Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Run migrations
docker-compose exec backend php artisan migrate

# Fresh migration (drops all tables)
docker-compose exec backend php artisan migrate:fresh

# Access backend container shell
docker-compose exec backend bash

# Restart a specific service
docker-compose restart backend
```

## Troubleshooting

**Port already in use:**
```bash
# Check what's using the port
lsof -i :8000
# Kill the process or change the port in docker-compose.yml
```

**Frontend not updating:**
```bash
docker-compose restart frontend
```

**Database connection issues:**
```bash
# Ensure db container is healthy
docker-compose ps
# Restart if needed
docker-compose restart db backend
```

