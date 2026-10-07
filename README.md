# Real Time Bus Tracking System (AI Smart Transit Assistant)

A full-stack smart public transportation system that helps passengers search routes, find buses, track buses in real time, check ETA, use an AI travel assistant, report crowd levels, and provide feedback.

## Features

- Passenger, Driver and Admin roles
- JWT authentication and role-based authorization
- Passenger registration and login
- Bus and route search
- Real-time bus tracking
- Browser/device GPS for driver location
- WebSocket + STOMP for live location updates
- ETA calculation
- Delay prediction
- AI travel assistant
- Voice search
- Crowd reporting
- Feedback and sentiment analysis
- Interactive maps using Leaflet and OpenStreetMap
- Route calculation using OSRM
- Location search using Nominatim
- English, Hindi and Marathi language support
- Admin dashboard
- Driver dashboard
- Passenger dashboard
- Trip management
- User, bus and route management

![Uploading HomePage.png…]()

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Bootstrap
- Axios
- React Router
- Leaflet
- React Leaflet
- STOMP
- SockJS
- react-i18next
- Browser Geolocation API
- Web Speech API

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- BCrypt
- Spring Data JPA
- Hibernate
- REST APIs
- WebSocket
- STOMP
- SockJS
- Maven

### Database & External APIs

- MySQL
- OpenStreetMap
- OSRM
- Nominatim
- AI API

### Testing & Development

- JUnit
- Mockito
- Postman
- Git
- GitHub

## System Architecture

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │ Passenger / Driver  │
                    │       / Admin       │
                    └──────────┬──────────┘
                               │
                    REST API / WebSocket
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    │                     │
                    │ Security / Services │
                    │ Controllers / JPA   │
                    └──────┬───────┬──────┘
                           │       │
                    ┌──────▼───┐   │
                    │  MySQL   │   │
                    └──────────┘   │
                                   │
                    ┌──────────────▼────────────┐
                    │ External Services         │
                    │                            │
                    │ AI API                     │
                    │ OpenStreetMap              │
                    │ OSRM                       │
                    │ Nominatim                  │
                    └────────────────────────────┘
```

## Real-Time Bus Tracking

The system uses the driver's browser/device location instead of requiring separate GPS hardware.

```text
Driver Device
     ↓
Browser GPS
     ↓
Latitude + Longitude
     ↓
WebSocket / STOMP
     ↓
Spring Boot Backend
     ↓
Live Location Broadcast
     ↓
Passenger React Application
     ↓
Leaflet Map
```

The driver starts a trip and shares the current latitude and longitude. The backend receives the location and broadcasts it to subscribed passengers through WebSocket.

## User Roles

### Passenger

- Register and login
- Search source and destination
- Find available routes
- Search buses
- View route information
- Track buses in real time
- View estimated arrival time
- View delay information
- Report crowd level
- Submit feedback
- Use AI travel assistant
- Use voice search
- Change application language
- View trip information

### Driver

- Login securely
- View assigned bus
- View assigned route
- Start trip
- End trip
- Share live location
- Update trip status
- Send location updates through WebSocket

### Admin

- Manage users
- Manage drivers
- Manage buses
- Manage routes
- Manage trips
- Monitor feedback
- Monitor crowd reports
- View active buses
- Manage transportation data

## Authentication & Security

The application uses Spring Security and JWT authentication.

Security features include:

- JWT-based authentication
- BCrypt password hashing
- Role-based authorization
- Protected REST APIs
- Secure driver and admin endpoints
- Environment variables for sensitive configuration
- CORS configuration
- Token-based frontend authentication

Example roles:

```text
PASSENGER
DRIVER
ADMIN
```

## Main Application Flow

```text
Home Page
    ↓
Register
    ↓
Login
    ↓
Enter Source & Destination
    ↓
Search Available Routes/Buses
    ↓
View Route Details
    ↓
Track Bus
    ↓
View ETA / Delay
    ↓
Use AI Assistant / Crowd Report / Feedback
```

## AI Travel Assistant

The AI assistant helps passengers with transportation-related queries.

Possible use cases:

- Route assistance
- Travel suggestions
- Bus information
- ETA-related questions
- General transportation queries
- Passenger support

The system can also use AI-based sentiment analysis for passenger feedback.

## Maps & Routing

The application uses open-source mapping services.

### OpenStreetMap

Used for map data and visualization.

### Leaflet

Used to display interactive maps in the React application.

### OSRM

Used for route calculation and road-based distance/direction information.

### Nominatim

Used for geocoding and location search.

## Multi-Language Support

The frontend supports:

- English
- Hindi
- Marathi

Internationalization is implemented using:

```text
react-i18next
```

Language resources are maintained separately:

```text
i18n/
├── en.json
├── hi.json
└── mr.json
```

## Project Structure

```text
AI-Smart-Transit-Assistant-Real-Time-Bus-Tracking-System/
│
├── transit-frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── map/
│   │   │   ├── assistant/
│   │   │   ├── passenger/
│   │   │   ├── driver/
│   │   │   └── admin/
│   │   │
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── i18n/
│   │   ├── utils/
│   │   ├── websocket/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── transit-backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/transit/
│   │   │   │
│   │   │   └── resources/
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   └── .env.example
│
├── README.md
├── .gitignore
└── .env.example
```

## Backend Package Structure

```text
com.transit
│
├── config
├── security
├── controller
├── service
│   └── impl
├── repository
├── entity
├── enums
├── dto
│   ├── request
│   └── response
├── websocket
├── exception
└── util
```

## Important Backend Components

### Controllers

Handle REST API requests.

```text
AuthController
UserController
RouteController
BusController
TripController
ETAController
AssistantController
FeedbackController
CrowdReportController
DriverController
AdminController
```

### Services

Contain the main business logic.

```text
AuthService
UserService
RouteService
BusService
TripService
BusTrackingService
ETAService
AIAssistantService
FeedbackService
CrowdReportService
DriverService
AdminService
```

### Repositories

Spring Data JPA repositories are used to communicate with MySQL.

```text
UserRepository
RouteRepository
BusRepository
TripRepository
FeedbackRepository
CrowdReportRepository
```

## Database

The application uses MySQL.

Main entities include:

```text
User
Route
Bus
Trip
Feedback
CrowdReport
```

The database stores users, transportation information, trips, feedback and crowd reports.

## Important API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Health

```text
GET /api/health
```

### Passenger

```text
/api/passenger/**
```

### Driver

```text
/api/driver/**
```

### Admin

```text
/api/admin/**
```

### WebSocket

```text
/topic/trip/{tripId}
```

## Environment Variables

Create environment files locally and never commit real secrets.

Example:

```env
VITE_API_URL=http://localhost:8080/api
```

Backend example:

```env
DB_URL=your_database_url
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

## Installation & Setup

### Prerequisites

Install the following:

- Java 17
- Maven
- Node.js
- npm
- MySQL
- Git

## Backend Setup

Clone the repository:

```bash
git clone https://github.com/divyaingaledev/AI-Smart-Transit-Assistant-Real-Time-Bus-Tracking-System.git
```

Go to backend:

```bash
cd transit-backend
```

Configure MySQL and environment variables.

Build the project:

```bash
mvn clean install
```

Run Spring Boot:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

## Frontend Setup

Open another terminal:

```bash
cd transit-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Testing

### Backend

Run tests using:

```bash
mvn test
```

Testing technologies:

- JUnit
- Mockito

### API Testing

Postman can be used to test:

- Authentication
- User APIs
- Route APIs
- Bus APIs
- Trip APIs
- Admin APIs
- Driver APIs

## GitHub

Repository:

**AI Smart Transit Assistant / Real Time Bus Tracking System**

The project demonstrates:

- Full-stack development
- REST API development
- JWT authentication
- Role-based security
- Real-time communication
- WebSocket implementation
- Database integration
- Interactive maps
- AI integration
- Responsive React UI

## Security Note

Never upload sensitive information to GitHub.

Do not commit:

```text
.env
Database passwords
JWT secrets
AI API keys
Cloud credentials
Private tokens
```

Use `.env.example` to show the required configuration without exposing real credentials.

## Future Enhancements

- Machine-learning based ETA prediction
- Advanced traffic-based delay prediction
- Push notifications
- Mobile application
- Advanced transportation analytics
- AI-based route optimization
- Driver performance analytics
- Predictive crowd analysis
- Smart transport recommendations

## Project Highlight

**Real-time bus tracking using browser GPS, WebSocket/STOMP, Spring Boot and interactive Leaflet maps.**

## Author

**Divya Ingale**

Java Developer | Full Stack Developer

Technologies: Java, Spring Boot, React, MySQL, REST APIs, JWT, Hibernate, WebSocket
