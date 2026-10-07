# Real Time Bus Tracking System (AI Smart Transit Assistant)

A full-stack smart public transportation system that helps passengers search routes, find buses, track buses in real time, check ETA, use an AI travel assistant, report crowd levels, and provide feedback.

## Features

- Passenger, Driver and Admin roles
- JWT authentication and role-based authorization
- Passenger registration and login
- Bus and route search
- Real-time bus tracking
- Browser/device GPS for driver location
- WebSocket and STOMP for live location updates
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
- Passenger dashboard
- Driver dashboard
- Admin dashboard
- Trip management
- User, bus and route management

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

### Database and APIs

- MySQL
- OpenStreetMap
- OSRM
- Nominatim
- AI API

### Testing and Tools

- JUnit
- Mockito
- Postman
- Git
- GitHub

## System Architecture

```text
React Frontend
      |
      | REST API / WebSocket
      |
Spring Boot Backend
      |
      +------ MySQL
      |
      +------ AI API
      |
      +------ OpenStreetMap
      |
      +------ OSRM
      |
      +------ Nominatim
```

## Real-Time Bus Tracking

The system uses the driver's browser or device location. No separate GPS hardware is required for the basic implementation.

```text
Driver Device
      |
Browser GPS
      |
Latitude and Longitude
      |
WebSocket / STOMP
      |
Spring Boot Backend
      |
Live Location Broadcast
      |
Passenger React Application
      |
Leaflet Map
```

The driver starts a trip and shares the current location. The backend receives the location and broadcasts it to passengers using WebSocket.

## User Roles

### Passenger

- Register and login
- Search source and destination
- Search available buses
- View routes
- Track buses in real time
- View ETA
- View delay information
- Report crowd level
- Submit feedback
- Use AI travel assistant
- Use voice search
- Change language
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

## Authentication and Security

The application uses Spring Security and JWT authentication.

Security features:

- JWT authentication
- BCrypt password hashing
- Role-based authorization
- Protected REST APIs
- Secure driver and admin endpoints
- CORS configuration
- Environment variables for sensitive data

Roles:

```text
PASSENGER
DRIVER
ADMIN
```

## Application Flow

```text
Home Page
    |
Register
    |
Login
    |
Enter Source and Destination
    |
Search Routes and Buses
    |
View Route Details
    |
Track Bus
    |
View ETA and Delay
    |
AI Assistant / Crowd Report / Feedback
```

## AI Travel Assistant

The AI assistant provides transportation-related support.

Features include:

- Route assistance
- Travel suggestions
- Bus information
- ETA-related queries
- General transportation assistance
- Passenger support
- Feedback sentiment analysis

## Maps and Routing

### OpenStreetMap

Used for map data and map visualization.

### Leaflet

Used to display interactive maps in the React frontend.

### OSRM

Used for route calculation and road-based distance information.

### Nominatim

Used for location search and geocoding.

## Multi-Language Support

The application supports:

- English
- Hindi
- Marathi

Internationalization is implemented using `react-i18next`.

Language files:

```text
i18n/
├── en.json
├── hi.json
└── mr.json
```

## Project Structure

```text
AI-Smart-Transit-Assistant-Real-Time-Bus-Tracking-System/
|
├── transit-frontend/
|   |
|   ├── public/
|   ├── src/
|   |   ├── api/
|   |   ├── components/
|   |   ├── context/
|   |   ├── hooks/
|   |   ├── pages/
|   |   ├── i18n/
|   |   ├── utils/
|   |   ├── websocket/
|   |   ├── App.jsx
|   |   ├── index.css
|   |   └── main.jsx
|   |
|   ├── package.json
|   ├── vite.config.js
|   └── .env.example
|
├── transit-backend/
|   |
|   ├── src/
|   |   ├── main/
|   |   |   ├── java/com/transit/
|   |   |   └── resources/
|   |   └── test/
|   |
|   ├── pom.xml
|   └── .env.example
|
├── README.md
├── .gitignore
└── .env.example
```

## Backend Structure

```text
com.transit
|
├── config
├── security
├── controller
├── service
|   └── impl
├── repository
├── entity
├── enums
├── dto
|   ├── request
|   └── response
├── websocket
├── exception
└── util
```

## Main Controllers

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

## Main Services

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

## Repositories

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

Main entities:

```text
User
Route
Bus
Trip
Feedback
CrowdReport
```

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Health Check

```text
GET /api/health
```

### Passenger APIs

```text
/api/passenger/**
```

### Driver APIs

```text
/api/driver/**
```

### Admin APIs

```text
/api/admin/**
```

### WebSocket

```text
/topic/trip/{tripId}
```

## Environment Variables

Create environment files locally.

Do not commit real passwords or API keys.

Frontend example:

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

## Installation

### Prerequisites

Install:

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

Open the backend:

```bash
cd transit-backend
```

Configure MySQL and environment variables.

Build the project:

```bash
mvn clean install
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend URL:

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

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Testing

### Backend Testing

```bash
mvn test
```

Testing tools:

- JUnit
- Mockito

### API Testing

Postman can be used to test:

- Authentication APIs
- User APIs
- Route APIs
- Bus APIs
- Trip APIs
- Driver APIs
- Admin APIs

## Security

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

Use `.env.example` to show the required configuration.

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

**Real-time bus tracking using browser GPS, WebSocket/STOMP, Spring Boot, React and Leaflet.**

## Author

**Divya Ingale**

Java Developer | Full Stack Developer

**Technologies:** Java, Spring Boot, React, MySQL, REST APIs, JWT, Hibernate, WebSocket
