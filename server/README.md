# Synapse Calyx — Backend Server

Production-ready Node.js API for managing client orders.

## Quick Start

```bash
# 1. Install dependencies
cd server
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, SMTP credentials, and admin key

# 3. Start the server
npm run dev     # development (auto-restart on changes)
npm start       # production
```

> You need MongoDB running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string.

## API Endpoints

| Method   | Endpoint             | Auth       | Description            |
|----------|----------------------|------------|------------------------|
| `POST`   | `/api/orders`        | Public     | Submit a new order     |
| `GET`    | `/api/orders`        | Admin key  | List all orders        |
| `GET`    | `/api/orders/stats`  | Admin key  | Order statistics       |
| `GET`    | `/api/orders/:id`    | Admin key  | Get single order       |
| `PATCH`  | `/api/orders/:id`    | Admin key  | Update status/notes    |
| `DELETE` | `/api/orders/:id`    | Admin key  | Delete order           |
| `GET`    | `/api/health`        | Public     | Health check           |

### Admin Authentication

Admin endpoints require the `x-admin-key` header:

```bash
curl -H "x-admin-key: your-secret-key" http://localhost:5000/api/orders
```

### Submit Order Example

```bash
# JSON only
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555-0123",
    "company": "Acme Inc",
    "serviceType": "Web Development",
    "budget": "$2,500 - $5,000",
    "message": "We need a modern landing page for our SaaS product."
  }'

# With file attachments (multipart/form-data)
curl -X POST http://localhost:5000/api/orders \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "serviceType=Graphic Design" \
  -F "message=Need a brand refresh" \
  -F "attachments=@./brief.pdf" \
  -F "attachments=@./logo.png"
```

### Filter & Search Orders

```bash
# Filter by status
GET /api/orders?status=new

# Filter by service type
GET /api/orders?serviceType=Web Development

# Search by name/email/company
GET /api/orders?search=john

# Pagination
GET /api/orders?page=2&limit=10
```

## Service Types

`Video Editing` · `Motion Graphics` · `Web Development` · `Graphic Design` · `Automation` · `Advertising` · `Other`

## Email Notifications

When a client submits an order:
1. **Admin** receives a detailed notification email
2. **Client** receives a confirmation email

Configure SMTP in `.env`. Without SMTP config, emails are logged to console (dev mode).

## File Structure

```
server/
├── server.js              # Entry point
├── package.json
├── .env.example
├── models/
│   └── Order.js           # MongoDB schema
├── controllers/
│   └── orderController.js # Business logic
├── routes/
│   └── orders.js          # API routes
├── middleware/
│   ├── auth.js            # Admin API key check
│   ├── errorHandler.js    # Error handling
│   ├── upload.js          # Multer file upload
│   └── validate.js        # Input validation
├── utils/
│   └── emailService.js    # Email notifications
└── uploads/               # Uploaded files (gitignored)
```
