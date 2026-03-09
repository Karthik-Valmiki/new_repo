#  Notes Management API

> A production-ready RESTful API for managing personal notes with **JWT authentication** and **Role-Based Access Control**.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

##  Setup

### 1. Install Docker

Download and install Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop). It takes under a minute — no other dependencies needed.
Make sure you docker engine is running

### 2. Clone the repository

```bash
git clone https://github.com/Karthik-Valmiki/Notes_Management_API.git
cd Notes_Management_API
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
DATABASE_URL=postgresql://postgres:yourpassword@db:5432/notes_db
SECRET_KEY=your_long_hex_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_SECRET=your_admin_bootstrap_secret
```

#### About `SECRET_KEY`

`SECRET_KEY` is the server-side key used to **sign and verify JWT tokens**. Every token issued by the API is signed with this key — if it changes, all existing tokens become invalid and every logged-in user gets logged out.

- Must be a long, random hex string — never a simple word or phrase
- Must stay consistent across restarts — do not auto-generate it on startup
- Must never be committed to GitHub

Generate one with:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Paste the output directly into your `.env` as the `SECRET_KEY` value.

---

##  Running the Application

```bash
docker compose up --build
```

| | URL |
|-|-----|
| **API** | `http://localhost:8000` |
| **Swagger UI** | `http://localhost:8000/docs` |

> The database starts first — Docker's healthcheck ensures the API only comes up once PostgreSQL is fully ready.

---

##  Authentication

### Register

```bash
curl -X POST http://localhost:8000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username": "karthik", "password": "secret123"}'
```

### Login

```bash
curl -X POST http://localhost:8000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "karthik", "password": "secret123"}'
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

> Use this token as `Authorization: Bearer <your_token>` in all requests below.

---

##  Creating Notes

```bash
curl -X POST http://localhost:8000/notes \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Meeting Notes", "content": "Discuss project milestones."}'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Meeting Notes",
    "content": "Discuss project milestones.",
    "owner_id": 1
  }
}
```

---

##  Managing Notes

### Get All Notes

```bash
curl http://localhost:8000/notes \
  -H "Authorization: Bearer <your_token>"
```

### Search & Pagination

```bash
curl "http://localhost:8000/notes?page=1&size=10&title=meeting" \
  -H "Authorization: Bearer <your_token>"
```

| Param | Type | Description |
|-------|------|-------------|
| `page` | int | Page number *(default: 1)* |
| `size` | int | Results per page *(default: 10)* |
| `title` | string | Filter by title keyword |

### Get Note by ID

```bash
curl http://localhost:8000/notes/1 \
  -H "Authorization: Bearer <your_token>"
```

### Update a Note

```bash
curl -X PUT http://localhost:8000/notes/1 \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "content": "Updated content."}'
```

---

##  Deleting Notes

```bash
curl -X DELETE http://localhost:8000/notes/1 \
  -H "Authorization: Bearer <your_token>"
```

**Response:**

```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

> Users can only delete their **own** notes. Attempting to delete another user's note returns `403 Forbidden`.

---

##  Admin Role

### Capabilities

| Action | User | Admin |
|--------|------|-------|
| CRUD on own notes | ✅ | ✅ |
| View all users' notes | ❌ | ✅ |
| Delete any note | ❌ | ✅ |
| Manage users | ❌ | ✅ |

### Setting Up an Admin Account

Admin registration is intentionally protected — it cannot be done through the normal register flow.

**Step 1** — Set `ADMIN_SECRET` in your `.env`

**Step 2** — Register admin with the secret in the header:

```bash
curl -X POST http://localhost:8000/users/register-admin \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your_admin_bootstrap_secret" \
  -d '{"username": "admin", "password": "adminpass123"}'
```

**Step 3** — Login normally. The token returned carries admin privileges automatically.

---

##  Edge Cases

| Scenario | Error | Fix |
|----------|-------|-----|
| Wrong credentials | `401 Invalid username or password` | Check username and password — both are case-sensitive |
| Missing token | `401 Not authenticated` | Add `Authorization: Bearer <your_token>` header |
| Expired token | `401 Token has expired` | Login again to get a fresh token |
| Accessing another user's note | `403 Not authorized` | Users can only access their own notes |
| Wrong admin secret | `403 Invalid admin secret` | Value in `x-admin-secret` must match `ADMIN_SECRET` in `.env` |
| `DATABASE_URL` is None on startup | `ArgumentError: Expected string or URL` | Run `cp .env.example .env` and fill in your credentials |

---

##  Author

**Karthik Valmiki** — [GitHub](https://github.com/Karthik-Valmiki)