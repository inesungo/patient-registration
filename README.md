# Patient Registration System

Sistema de registro de pacientes con Laravel API + React Frontend.

## Stack Tecnológico

### Backend
- Laravel 11
- PHP 8.3
- PostgreSQL 16
- Laravel Queue (database driver)
- Laravel Notifications

### Frontend
- React 18
- TypeScript
- Vite
- CSS personalizado

### Infraestructura
- Docker & Docker Compose

## Estructura del Proyecto

```
/patient-registration
├── backend/          # Laravel API
├── frontend/         # React + TypeScript + Vite
├── docker-compose.yml
├── README.md
└── .gitignore
```

## Requisitos

- Docker
- Docker Compose

## Inicio Rápido

> Las instrucciones completas se agregarán una vez finalizada la implementación.

```bash
# Clonar el repositorio
git clone <repo-url>
cd patient-registration

# Levantar el entorno
docker-compose up --build
```

## Servicios

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| frontend | 5173   | React + Vite |
| backend  | 8000   | Laravel API |
| db       | 5432   | PostgreSQL |
| queue    | -      | Queue Worker |

## Variables de Entorno

> Se documentarán las variables necesarias en la fase final.

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /api/patients | Lista de pacientes |
| POST   | /api/patients | Crear paciente |

## Licencia

MIT


# Levantar todo
docker-compose up --build

# Ejecutar migraciones
docker-compose exec backend php artisan migrate

# Ver logs
docker-compose logs -f

# Parar todo
docker-compose down