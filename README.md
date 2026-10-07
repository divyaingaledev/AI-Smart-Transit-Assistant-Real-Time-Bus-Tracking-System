# Real Time Bus Tracking System (AI Smart Transit Assistant)

A full-stack smart public transportation platform built using React, Spring Boot, MySQL, WebSocket, JWT, Leaflet, OpenStreetMap, OSRM, Nominatim and AI services.

The system helps passengers search routes, find buses, track buses in real time, estimate arrival times, interact with an AI travel assistant, report crowd levels and provide feedback.

---

## 1. Project Overview

**Real Time Bus Tracking System (AI Smart Transit Assistant)** is a full-stack web application designed to provide smart and real-time public transportation services.

The application provides separate functionality for:

- Passenger
- Driver
- Admin

The project uses:

- React for frontend development
- Spring Boot for backend development
- MySQL for database management
- JWT and Spring Security for authentication
- WebSocket/STOMP for real-time communication
- Leaflet and OpenStreetMap for maps
- OSRM for road routing
- Nominatim for geocoding
- AI API for travel assistance and sentiment analysis

The basic live tracking implementation uses the driver's browser/device location instead of requiring separate GPS hardware.

---

# 2. Main Objective

The main objective is to provide a single platform where passengers can find and monitor public transportation easily.

Main passenger flow:

```text
Open Home Page
      ↓
Register
      ↓
Login
      ↓
Enter Source
      ↓
Enter Destination
      ↓
Search Route
      ↓
View Available Bus
      ↓
View Route Details
      ↓
Track Bus
      ↓
View Live Location
      ↓
Check ETA
      ↓
Ask AI Assistant
      ↓
Check Crowd Level
      ↓
Travel
      ↓
Submit Feedback
```

---

# 3. Problems Addressed

Traditional public transportation users may face several difficulties:

- Finding the correct bus
- Finding a suitable route
- Knowing the current bus location
- Estimating bus arrival time
- Knowing the current crowd level
- Getting route information
- Receiving real-time transportation updates
- Getting multilingual assistance
- Communicating travel questions naturally

This project attempts to solve these problems through a centralized web-based transportation platform.

---

# 4. Main User Roles

The application contains three primary roles.

## Passenger

Passengers can:

- Register
- Login
- Search routes
- Search buses
- View bus details
- Track buses
- View live bus location
- Check ETA
- Ask the AI travel assistant
- Use voice search
- Report crowd levels
- Submit feedback
- Manage profile
- Save favorite routes
- View trip history
- Manage notification preferences
- Change application language

## Driver

Drivers can:

- Login
- View assigned bus
- View assigned route
- Start trip
- End trip
- Update trip status
- Share live location
- View basic trip information

## Admin

Admins can:

- Manage users
- Manage drivers
- Manage buses
- Manage routes
- Manage trips
- View feedback
- View crowd reports
- Monitor active buses
- View system information and analytics

---

# 5. Major Features

The project includes or is designed to support the following modules:

1. Authentication
2. Authorization
3. Passenger Management
4. Driver Management
5. Admin Management
6. Route Management
7. Bus Management
8. Trip Management
9. Live Bus Tracking
10. Browser GPS Location
11. ETA Calculation
12. Delay Prediction
13. AI Travel Assistant
14. Voice Search
15. Crowd Reporting
16. Feedback Management
17. Sentiment Analysis
18. Map Integration
19. Route Calculation
20. Geocoding
21. WebSocket Communication
22. Multilingual Support
23. Notification Management
24. Passenger Dashboard
25. Driver Dashboard
26. Admin Dashboard
27. REST APIs
28. Database Management
29. Exception Handling
30. Testing
31. Deployment

---

# 6. Technology Stack

## Frontend

- React
- JavaScript
- Vite
- React Router
- Axios
- Tailwind CSS
- Bootstrap
- React Leaflet
- Leaflet
- OpenStreetMap
- react-i18next
- STOMP
- SockJS
- Browser Geolocation API
- Browser Speech Recognition API

## Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Security
- JWT
- BCrypt
- Spring Data JPA
- Hibernate
- WebSocket
- STOMP
- SockJS
- Maven

## Database

- MySQL

## External Services

- OpenStreetMap
- OSRM
- Nominatim
- AI API

## Development Tools

- Git
- GitHub
- VS Code
- Eclipse / IntelliJ IDEA
- Postman
- MySQL Workbench

---

# 7. System Architecture

```text
                    ┌─────────────────────┐
                    │     Passenger       │
                    │   React Frontend    │
                    └──────────┬──────────┘
                               │
                               │ REST / WebSocket
                               ▼
                    ┌─────────────────────┐
                    │    Spring Boot      │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌────────────┐      ┌──────────────┐      ┌─────────────┐
   │   MySQL    │      │ External APIs│      │ WebSocket   │
   │  Database  │      │ AI/OSRM/etc. │      │  Messaging  │
   └────────────┘      └──────────────┘      └─────────────┘
                               ▲
                               │
                    ┌──────────┴──────────┐
                    │       Driver        │
                    │ Browser / Device GPS│
                    └─────────────────────┘
```

---

# 8. Authentication Flow

Registration:

```text
Passenger
    ↓
Register Page
    ↓
POST /api/auth/register
    ↓
AuthController
    ↓
AuthService
    ↓
BCrypt Password Hash
    ↓
UserRepository
    ↓
MySQL
```

Login:

```text
Email + Password
       ↓
Login API
       ↓
Spring Security
       ↓
Verify Credentials
       ↓
Generate JWT
       ↓
Return Token
       ↓
React Frontend
       ↓
Store Token
```

Protected requests:

```text
React
  ↓
Authorization: Bearer JWT
  ↓
JwtAuthFilter
  ↓
Validate Token
  ↓
Identify User
  ↓
Role Authorization
  ↓
Controller
```

---

# 9. Security

The backend uses:

- Spring Security
- JWT
- BCrypt
- Role-based authorization
- Protected REST APIs
- CORS configuration

Roles:

```text
PASSENGER
DRIVER
ADMIN
```

Typical authorization structure:

```text
PASSENGER
    ↓
Passenger APIs

DRIVER
    ↓
Driver APIs

ADMIN
    ↓
Admin APIs
```

Passwords are stored as BCrypt hashes instead of plain text.

---

# 10. Passenger Module

The passenger module provides the main transportation features.

Passenger dashboard can contain:

```text
Passenger Dashboard
│
├── Route Search
├── Bus Search
├── Live Tracking
├── ETA
├── AI Assistant
├── Crowd Information
├── Favorite Routes
├── Trip History
├── Feedback
├── Profile
├── Notifications
└── Language Selection
```

---

# 11. Driver Module

Driver dashboard can contain:

```text
Driver Dashboard
│
├── Driver Profile
├── Assigned Bus
├── Assigned Route
├── Current Trip
├── Start Trip
├── End Trip
├── Trip Status
└── Live Location
```

Driver workflow:

```text
Driver Login
      ↓
Driver Dashboard
      ↓
View Assigned Bus
      ↓
View Assigned Route
      ↓
Start Trip
      ↓
Allow Browser Location
      ↓
Get Latitude + Longitude
      ↓
Send Location
      ↓
Spring Boot
      ↓
WebSocket
      ↓
Passenger
      ↓
Leaflet Map
```

---

# 12. Admin Module

The Admin Dashboard provides management functionality.

## User Management

Admin can manage:

- Users
- Account status
- User information
- Passenger accounts

## Driver Management

Admin can manage:

- Drivers
- Driver accounts
- Driver status
- Driver assignments

## Bus Management

Admin can manage:

- Bus number
- Bus details
- Bus status
- Route assignment
- Driver assignment

## Route Management

Admin can manage:

- Route name
- Source
- Destination
- Stops
- Distance
- Estimated duration

## Trip Management

Admin can:

- Create trips
- View trips
- Monitor trips
- Update trip status

## Feedback Management

Admin can:

- View feedback
- View ratings
- View comments
- View sentiment

---

# 13. Route Module

A route represents a public transportation path.

Example:

```text
Aundh
   ↓
Shivajinagar
   ↓
Pune Station
```

Route information can contain:

```text
Route ID
Route Name
Source
Destination
Stops
Distance
Estimated Duration
```

Passengers can search routes using source and destination.

---

# 14. Route Search

Passenger enters:

```text
Source:
Aundh

Destination:
Pune Station
```

The application searches available routes.

Possible result:

```text
Bus Number
Route Name
Source
Destination
Departure Time
Estimated Arrival
Current Status
```

Flow:

```text
Source + Destination
        ↓
Route API
        ↓
Route Controller
        ↓
Route Service
        ↓
Route Repository
        ↓
MySQL
        ↓
Available Routes
        ↓
React UI
```

---

# 15. Bus Module

Bus information can contain:

```text
Bus ID
Bus Number
Bus Name
Route
Driver
Status
Current Latitude
Current Longitude
Departure Time
Arrival Time
```

Possible bus statuses:

```text
NOT_STARTED
RUNNING
DELAYED
COMPLETED
CANCELLED
```

---

# 16. Trip Module

A trip represents a specific bus journey.

Trip information can contain:

```text
Trip ID
Bus
Driver
Route
Start Time
End Time
Trip Status
Current Latitude
Current Longitude
```

Possible trip statuses:

```text
NOT_STARTED
STARTED
IN_PROGRESS
COMPLETED
CANCELLED
```

---

# 17. Live Bus Tracking

Live bus tracking is one of the main features of the system.

The basic implementation uses the driver's browser/device location.

The browser can obtain location using:

```javascript
navigator.geolocation.watchPosition()
```

The location contains:

```text
Latitude
Longitude
```

The data can then be sent to the backend through WebSocket communication.

Complete flow:

```text
Driver Device
      ↓
Browser GPS
      ↓
Latitude + Longitude
      ↓
STOMP / WebSocket
      ↓
Spring Boot
      ↓
Trip Tracking Service
      ↓
WebSocket Broadcast
      ↓
Passenger React App
      ↓
Leaflet
      ↓
Live Bus Marker
```

Separate GPS hardware is not required for the basic browser-based implementation.

---

# 18. GPS Module

The browser requests permission to access the driver's location.

Example JavaScript API:

```javascript
navigator.geolocation.watchPosition()
```

Example data:

```text
Latitude: 18.5672
Longitude: 73.8072
```

The location can be periodically sent to the backend while a trip is active.

---

# 19. WebSocket Module

WebSocket provides real-time communication between the backend and frontend.

Technologies:

```text
WebSocket
STOMP
SockJS
```

REST communication:

```text
Client
   ↓
HTTP Request
   ↓
Server
   ↓
HTTP Response
```

WebSocket communication:

```text
Driver
   ↓
Location Update
   ↓
Server
   ↓
Subscribed Passengers
```

WebSocket is useful for:

- Live bus location
- Crowd updates
- Real-time trip updates
- Notifications

---

# 20. WebSocket Topic

A trip-specific topic can be used:

```text
/topic/trip/{tripId}
```

Example:

```text
/topic/trip/101
```

Passengers viewing Trip 101 can subscribe to the corresponding topic and receive updates.

---

# 21. Map Module

The application uses:

- Leaflet
- React Leaflet
- OpenStreetMap

The map can display:

```text
Bus Marker
Current Location
Route
Stops
Source
Destination
```

Example:

```text
Passenger
     ↓
Live Tracking Page
     ↓
Leaflet Map
     ↓
Bus Marker
     ↓
Current Bus Position
```

---

# 22. Routing Module

OSRM can be used to calculate road routes.

Example:

```text
Aundh
   ↓
Shivajinagar
   ↓
Pune Station
```

The resulting route geometry can be displayed on the Leaflet map.

---

# 23. Geocoding Module

Nominatim can convert a place name into coordinates.

Example:

```text
Aundh
   ↓
Latitude
Longitude
```

Coordinates can then be used by:

- Maps
- Routing
- ETA
- Distance calculation

---

# 24. ETA Module

ETA means Estimated Time of Arrival.

The system can estimate the expected arrival time of a bus.

Example:

```text
Bus: 101

Current Location:
Aundh

Estimated Arrival:
12 minutes
```

ETA can consider:

- Current bus location
- Destination
- Remaining distance
- Estimated speed
- Route distance
- Route information

Basic formula:

```text
ETA = Remaining Distance / Estimated Speed
```

A production implementation can use additional traffic and historical data to improve accuracy.

---

# 25. Delay Prediction

The system can identify possible bus delays.

Example:

```text
Expected Arrival:
10:30 AM

Predicted Arrival:
10:42 AM

Expected Delay:
12 minutes
```

Possible inputs:

- Current location
- Remaining distance
- Average speed
- Historical trip information
- Previous delays
- Traffic information

A rule-based approach can be implemented initially, while machine-learning prediction can be added later.

---

# 26. AI Travel Assistant

The AI assistant allows passengers to ask travel-related questions in natural language.

Example:

```text
How do I reach Aundh from Pune Station?
```

Other questions:

```text
Which bus should I take?

How long will my journey take?

Which route is better?

Is there a bus from Pune Station to Aundh?
```

Flow:

```text
Passenger
    ↓
React ChatBox
    ↓
Assistant API
    ↓
Spring Boot
    ↓
AIAssistantService
    ↓
External AI API
    ↓
AI Response
    ↓
React
    ↓
Passenger
```

The AI API key should remain on the backend and must not be exposed in the React frontend.

---

# 27. Voice Search

The application can support browser-based voice input.

Example:

```text
User speaks:
How do I reach Aundh from Pune Station?
```

Flow:

```text
Voice
  ↓
Browser Speech Recognition
  ↓
Text
  ↓
AI Assistant
  ↓
Response
```

Possible supported languages:

```text
English
Hindi
Marathi
```

Browser support may vary depending on the browser and operating system.

---

# 28. Crowd Reporting

Passengers can report bus crowd levels.

Possible levels:

```text
LOW
MEDIUM
HIGH
```

Example:

```text
Bus: 101

Crowd Level:
HIGH
```

Crowd reports can help passengers choose a more suitable bus.

---

# 29. Feedback Module

Passengers can submit feedback.

Feedback can contain:

```text
Passenger
Bus
Rating
Comment
Date
```

Example:

```text
Rating:
4/5

Comment:
The bus was clean and arrived on time.
```

Admin can view submitted feedback.

---

# 30. Sentiment Analysis

Passenger feedback can be analyzed using sentiment analysis.

Possible sentiment categories:

```text
POSITIVE
NEGATIVE
NEUTRAL
```

Example:

```text
Feedback:
The bus was clean and arrived on time.

Sentiment:
POSITIVE
```

Example:

```text
Feedback:
The bus was very late.

Sentiment:
NEGATIVE
```

An external AI service can be used for sentiment classification.

---

# 31. Multi-Language Support

The frontend can support:

```text
English
Hindi
Marathi
```

Technology:

```text
react-i18next
```

Translation files:

```text
src/i18n/en.json
src/i18n/hi.json
src/i18n/mr.json
```

Example:

```text
English:
Search Route

Hindi:
मार्ग खोजें

Marathi:
मार्ग शोधा
```

The selected language can be stored in browser local storage.

---

# 32. Notification Module

The system can provide transportation notifications.

Possible notifications:

```text
Bus is delayed.

Bus is arriving soon.

Trip has started.

Trip has ended.

Route has changed.

High crowd reported.
```

The initial implementation can provide notifications inside the web application.

Browser push notifications can be added as a future enhancement.

---

# 33. Frontend Architecture

The frontend follows a component-based React architecture.

General flow:

```text
React Page
    ↓
React Component
    ↓
API Service / Context / Hook
    ↓
Spring Boot API
    ↓
Backend Service
    ↓
Database / External API
```

Frontend responsibilities are divided into:

```text
Pages
Components
API Services
Context
Hooks
WebSocket
i18n
Utilities
```

---

# 34. Frontend Project Structure

```text
transit-frontend/
│
├── public/
│   ├── images/
│   └── favicon.ico
│
├── src/
│   │
│   ├── api/
│   │   ├── axiosClient.js
│   │   ├── authApi.js
│   │   ├── routeApi.js
│   │   ├── busApi.js
│   │   ├── tripApi.js
│   │   ├── etaApi.js
│   │   ├── assistantApi.js
│   │   ├── feedbackApi.js
│   │   ├── crowdApi.js
│   │   ├── userApi.js
│   │   └── adminApi.js
│   │
│   ├── components/
│   │   │
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── LanguageSelector.jsx
│   │   │
│   │   ├── map/
│   │   │   ├── MapView.jsx
│   │   │   ├── BusMarker.jsx
│   │   │   ├── RouteLine.jsx
│   │   │   └── StopMarker.jsx
│   │   │
│   │   ├── assistant/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   └── VoiceInput.jsx
│   │   │
│   │   ├── passenger/
│   │   │   ├── RouteSearchForm.jsx
│   │   │   ├── BusCard.jsx
│   │   │   ├── RouteCard.jsx
│   │   │   ├── ETACard.jsx
│   │   │   ├── CrowdReportForm.jsx
│   │   │   └── FeedbackForm.jsx
│   │   │
│   │   ├── driver/
│   │   │   ├── DriverPanel.jsx
│   │   │   ├── TripControl.jsx
│   │   │   └── LocationSender.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminPanel.jsx
│   │       ├── UserManagement.jsx
│   │       ├── DriverManagement.jsx
│   │       ├── BusManagement.jsx
│   │       ├── RouteManagement.jsx
│   │       └── TripManagement.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── RouteSearch.jsx
│   │   ├── LiveTracking.jsx
│   │   ├── Assistant.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── DriverDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Feedback.jsx
│   │   └── NotFound.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── LanguageContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useWebSocket.js
│   │   ├── useGeolocation.js
│   │   └── useLanguage.js
│   │
│   ├── websocket/
│   │   ├── stompClient.js
│   │   └── subscriptionService.js
│   │
│   ├── i18n/
│   │   ├── index.js
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── mr.json
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── storage.js
│   │   └── formatters.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

# 35. Main Frontend Pages

## Home

The first page opened by the user.

Possible sections:

- Project introduction
- Route search
- Project features
- Live tracking information
- AI assistant introduction
- Login
- Register

## Login

Contains:

```text
Email
Password
Login
```

After successful authentication, the user is redirected according to their role.

## Register

Contains:

```text
Name
Email
Password
Register
```

Public registration creates a Passenger account.

## Route Search

Contains:

```text
Source
Destination
Search
```

Displays matching routes and buses.

## Live Tracking

Contains:

```text
Leaflet Map
Bus Marker
Current Location
Route
ETA
Bus Information
```

## Assistant

Contains:

```text
Chat
User Question
AI Response
Voice Input
```

## Passenger Dashboard

Provides passenger-specific functionality.

## Driver Dashboard

Provides driver-specific functionality.

## Admin Dashboard

Provides administrative functionality.

---

# 36. Backend Architecture

The backend follows a layered architecture.

```text
Controller
    ↓
Service Interface
    ↓
Service Implementation
    ↓
Repository
    ↓
Entity
    ↓
MySQL
```

Supporting layers:

```text
Security
DTO
Exception Handling
WebSocket
Configuration
Utilities
```

This separation makes the application easier to maintain and test.

---

# 37. Backend Project Structure

```text
transit-backend/
│
├── src/
│   │
│   ├── main/
│   │   │
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── transit/
│   │   │
│   │   │       ├── TransitApplication.java
│   │   │
│   │   │       ├── config/
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   ├── WebSocketConfig.java
│   │   │       │   ├── CorsConfig.java
│   │   │       │   └── SwaggerConfig.java
│   │   │
│   │   │       ├── security/
│   │   │       │   ├── JwtTokenProvider.java
│   │   │       │   ├── JwtAuthFilter.java
│   │   │       │   └── CustomUserDetailsService.java
│   │   │
│   │   │       ├── controller/
│   │   │       │   ├── AuthController.java
│   │   │       │   ├── UserController.java
│   │   │       │   ├── RouteController.java
│   │   │       │   ├── BusController.java
│   │   │       │   ├── TripController.java
│   │   │       │   ├── ETAController.java
│   │   │       │   ├── AssistantController.java
│   │   │       │   ├── FeedbackController.java
│   │   │       │   ├── CrowdReportController.java
│   │   │       │   ├── DriverController.java
│   │   │       │   └── AdminController.java
│   │   │
│   │   │       ├── service/
│   │   │       │   ├── AuthService.java
│   │   │       │   ├── UserService.java
│   │   │       │   ├── RouteService.java
│   │   │       │   ├── BusService.java
│   │   │       │   ├── TripService.java
│   │   │       │   ├── BusTrackingService.java
│   │   │       │   ├── ETAService.java
│   │   │       │   ├── AIAssistantService.java
│   │   │       │   ├── FeedbackService.java
│   │   │       │   ├── CrowdReportService.java
│   │   │       │   ├── DriverService.java
│   │   │       │   ├── AdminService.java
│   │   │       │   └── impl/
│   │   │       │       ├── AuthServiceImpl.java
│   │   │       │       ├── UserServiceImpl.java
│   │   │       │       ├── RouteServiceImpl.java
│   │   │       │       ├── BusServiceImpl.java
│   │   │       │       ├── TripServiceImpl.java
│   │   │       │       ├── BusTrackingServiceImpl.java
│   │   │       │       ├── ETAServiceImpl.java
│   │   │       │       ├── AIAssistantServiceImpl.java
│   │   │       │       ├── FeedbackServiceImpl.java
│   │   │       │       ├── CrowdReportServiceImpl.java
│   │   │       │       ├── DriverServiceImpl.java
│   │   │       │       └── AdminServiceImpl.java
│   │   │
│   │   │       ├── repository/
│   │   │       │   ├── UserRepository.java
│   │   │       │   ├── RouteRepository.java
│   │   │       │   ├── BusRepository.java
│   │   │       │   ├── TripRepository.java
│   │   │       │   ├── FeedbackRepository.java
│   │   │       │   └── CrowdReportRepository.java
│   │   │
│   │   │       ├── entity/
│   │   │       │   ├── User.java
│   │   │       │   ├── Route.java
│   │   │       │   ├── Bus.java
│   │   │       │   ├── Trip.java
│   │   │       │   ├── Feedback.java
│   │   │       │   └── CrowdReport.java
│   │   │
│   │   │       ├── enums/
│   │   │       │   ├── Role.java
│   │   │       │   ├── BusStatus.java
│   │   │       │   ├── TripStatus.java
│   │   │       │   ├── CrowdLevel.java
│   │   │       │   └── Sentiment.java
│   │   │
│   │   │       ├── dto/
│   │   │       │   ├── request/
│   │   │       │   └── response/
│   │   │
│   │   │       ├── websocket/
│   │   │       │   ├── BusLocationHandler.java
│   │   │       │   └── CrowdReportHandler.java
│   │   │
│   │   │       ├── exception/
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   ├── ResourceNotFoundException.java
│   │   │       │   ├── BadRequestException.java
│   │   │       │   ├── UnauthorizedException.java
│   │   │       │   └── ApiError.java
│   │   │
│   │   │       └── util/
│   │   │           ├── DistanceCalculator.java
│   │   │           └── DateTimeUtil.java
│   │
│   ├── resources/
│   │   ├── application.properties
│   │   └── static/
│   │
│   └── test/
│       └── java/
│
├── pom.xml
├── .gitignore
├── .env.example
└── README.md
```

---

# 38. Configuration Layer

## SecurityConfig

Responsible for:

- Spring Security
- Public endpoints
- Protected endpoints
- Role-based authorization
- Authentication configuration

## WebSocketConfig

Responsible for:

- WebSocket endpoint
- STOMP configuration
- Message broker
- WebSocket destinations

## CorsConfig

Responsible for:

- Frontend/backend communication
- Allowed origins
- HTTP methods
- Headers

## SwaggerConfig

Can be used when Swagger/OpenAPI documentation is enabled.

---

# 39. Security Package

## JwtTokenProvider

Responsible for:

- Creating JWT
- Validating JWT
- Extracting username
- Checking token expiration

## JwtAuthFilter

The filter:

```text
Read Authorization Header
        ↓
Extract JWT
        ↓
Validate JWT
        ↓
Load User
        ↓
Set Authentication
```

## CustomUserDetailsService

Loads user information from the database for authentication.

---

# 40. Controller Layer

Controllers receive requests from the frontend.

General flow:

```text
React
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

Controllers include:

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

---

# 41. Main API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Users

```text
GET /api/users
GET /api/users/{id}
PUT /api/users/{id}
```

## Routes

```text
GET /api/routes
GET /api/routes/{id}
GET /api/routes/search
POST /api/routes
PUT /api/routes/{id}
DELETE /api/routes/{id}
```

## Buses

```text
GET /api/buses
GET /api/buses/{id}
POST /api/buses
PUT /api/buses/{id}
DELETE /api/buses/{id}
```

## Trips

```text
GET /api/trips
GET /api/trips/{id}
POST /api/trips
PUT /api/trips/{id}
```

## ETA

```text
GET /api/eta/{tripId}
```

## AI Assistant

```text
POST /api/assistant/chat
```

## Feedback

```text
POST /api/feedback
GET /api/feedback
```

## Crowd Reports

```text
POST /api/crowd-reports
GET /api/crowd-reports/{busId}
```

## Driver

```text
GET /api/driver/dashboard
GET /api/driver/assigned-bus
POST /api/driver/trip/start
POST /api/driver/trip/end
POST /api/driver/location
```

## Admin

```text
GET /api/admin/users
GET /api/admin/drivers
GET /api/admin/buses
GET /api/admin/routes
GET /api/admin/trips
```

---

# 42. Service Layer

The service layer contains the business logic.

Example:

```text
BusController
      ↓
BusService
      ↓
BusRepository
      ↓
MySQL
```

Service interfaces can include:

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

---

# 43. Service Implementation

Service implementations are stored inside:

```text
service/impl/
```

Example:

```text
BusService
     ↓
BusServiceImpl
```

The implementation can handle:

- Creating buses
- Finding buses
- Updating buses
- Deleting buses
- Assigning drivers
- Assigning routes
- Updating bus status
- Updating current location

---

# 44. Repository Layer

Spring Data JPA is used for database access.

Repositories:

```text
UserRepository
RouteRepository
BusRepository
TripRepository
FeedbackRepository
CrowdReportRepository
```

Common operations:

```text
findById()
findAll()
save()
delete()
```

Custom repository methods can be added when required.

---

# 45. Entity Layer

Main entities:

```text
User
Route
Bus
Trip
Feedback
CrowdReport
```

These classes represent database tables using JPA/Hibernate.

---

# 46. User Entity

Example fields:

```text
id
name
email
password
role
active
```

Roles:

```text
PASSENGER
DRIVER
ADMIN
```

Passwords should be stored using BCrypt hashing.

---

# 47. Route Entity

Possible fields:

```text
id
routeName
source
destination
distance
estimatedDuration
```

Routes can be associated with buses and trips.

---

# 48. Bus Entity

Possible fields:

```text
id
busNumber
busName
status
latitude
longitude
route
driver
```

Current latitude and longitude can be updated during an active trip.

---

# 49. Trip Entity

Possible fields:

```text
id
bus
driver
route
startTime
endTime
status
latitude
longitude
```

The trip represents one bus journey.

---

# 50. Feedback Entity

Possible fields:

```text
id
passenger
bus
rating
comment
sentiment
createdAt
```

---

# 51. Crowd Report Entity

Possible fields:

```text
id
passenger
bus
crowdLevel
createdAt
```

Crowd levels:

```text
LOW
MEDIUM
HIGH
```

---

# 52. Enum Layer

The backend can use enums to avoid invalid string values.

Examples:

```text
Role
BusStatus
TripStatus
CrowdLevel
Sentiment
```

Example:

```text
Role:
PASSENGER
DRIVER
ADMIN
```

---

# 53. DTO Layer

DTO means Data Transfer Object.

DTOs are used to transfer only the required information between frontend and backend.

Possible DTO categories:

```text
request/
response/
```

Examples:

```text
RegisterRequest
LoginRequest
LoginResponse
RouteResponse
BusResponse
TripResponse
LocationUpdateRequest
ETAResponse
AssistantRequest
AssistantResponse
FeedbackRequest
CrowdReportRequest
```

Benefits:

- Cleaner APIs
- Better security
- Separation between entity and API model
- Easier validation
- Easier maintenance

---

# 54. WebSocket Location Flow

Driver sends:

```text
Trip ID
Latitude
Longitude
Timestamp
```

Backend receives the update.

The backend can broadcast the information to:

```text
/topic/trip/{tripId}
```

Passenger frontend receives the message and updates the Leaflet marker.

Complete flow:

```text
Driver GPS
    ↓
LocationSender
    ↓
STOMP
    ↓
Spring Boot
    ↓
BusTrackingService
    ↓
STOMP Broker
    ↓
/topic/trip/{tripId}
    ↓
Passenger
    ↓
Map Marker Update
```

---

# 55. Exception Handling

The backend can use centralized exception handling.

Classes:

```text
GlobalExceptionHandler
ResourceNotFoundException
BadRequestException
UnauthorizedException
ApiError
```

Example:

```text
Bus Not Found
     ↓
ResourceNotFoundException
     ↓
GlobalExceptionHandler
     ↓
HTTP Error Response
     ↓
React
```

This keeps API error responses consistent.

---

# 56. Utility Layer

Utility classes can contain reusable logic.

Examples:

```text
DistanceCalculator
DateTimeUtil
```

## DistanceCalculator

Can calculate distance between coordinates.

## DateTimeUtil

Can provide common date/time formatting and calculations.

---

# 57. Database

The application uses MySQL.

Possible database name:

```text
transit_db
```

Main tables:

```text
users
routes
buses
trips
feedback
crowd_reports
```

---

# 58. Database Relationship

A simplified relationship can be:

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Feedback       CrowdReport
 │               │
 ▼               ▼
Bus ─────────── Route
 │               │
 └────── Trip ───┘
          │
          ▼
        Driver
```

The exact database relationship depends on the final entity mappings.

---

# 59. Complete Passenger Flow

```text
Open Website
     ↓
Home Page
     ↓
Register
     ↓
Passenger Account Created
     ↓
Login
     ↓
Passenger Dashboard
     ↓
Enter Source
     ↓
Enter Destination
     ↓
Search Routes
     ↓
View Available Buses
     ↓
Select Bus
     ↓
View Route
     ↓
Track Bus
     ↓
View Live Location
     ↓
Check ETA
     ↓
Check Crowd Level
     ↓
Travel
     ↓
Submit Feedback
```

---

# 60. Complete Driver Flow

```text
Driver Login
      ↓
Driver Dashboard
      ↓
View Assigned Bus
      ↓
View Assigned Route
      ↓
Start Trip
      ↓
Allow Location Permission
      ↓
Browser GPS
      ↓
Get Location
      ↓
Send Location
      ↓
Backend
      ↓
WebSocket
      ↓
Passengers
      ↓
End Trip
```

---

# 61. Complete Admin Flow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Manage Users
     ↓
Manage Drivers
     ↓
Manage Buses
     ↓
Manage Routes
     ↓
Manage Trips
     ↓
Monitor Feedback
     ↓
Monitor Crowd Reports
```

---

# 62. Frontend and Backend Communication

Frontend API base URL can be configured using:

```text
VITE_API_URL
```

Development example:

```text
http://localhost:8080/api
```

Frontend:

```text
React
  ↓
Axios
  ↓
Spring Boot REST API
```

For authenticated APIs:

```text
Authorization: Bearer <JWT>
```

---

# 63. CORS

CORS allows the React frontend to communicate with the Spring Boot backend.

Typical development origins:

```text
http://localhost:5173
http://localhost:3000
```

Production origins should be configured using environment variables or deployment configuration.

---

# 64. Environment Variables

Sensitive values should not be committed to GitHub.

Example frontend `.env`:

```env
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=http://localhost:8080/ws
```

Example backend configuration:

```env
DB_URL=jdbc:mysql://localhost:3306/transit_db
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret
AI_API_KEY=your_ai_key
```

Use `.env.example` to show required variables without exposing actual credentials.

---

# 65. Important Security Rule

Never upload the following to GitHub:

```text
.env
Database passwords
JWT secrets
AI API keys
Cloud credentials
Private tokens
Personal access tokens
```

Use:

```text
.env.example
```

instead.

---

# 66. Frontend Installation

Go to the frontend directory:

```bash
cd transit-frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Default Vite URL:

```text
http://localhost:5173
```

---

# 67. Backend Installation

Go to backend:

```bash
cd transit-backend
```

Build the project:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Default backend URL:

```text
http://localhost:8080
```

---

# 68. Database Setup

Install MySQL.

Create the database:

```sql
CREATE DATABASE transit_db;
```

Configure the database connection in the backend configuration.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/transit_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

Do not commit the real database password to GitHub.

---

# 69. Running the Complete Project

Start MySQL first.

Then start the backend:

```bash
cd transit-backend
mvn spring-boot:run
```

Then start the frontend:

```bash
cd transit-frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

Application flow:

```text
Home
  ↓
Register
  ↓
Login
  ↓
Passenger Dashboard
```

---

# 70. Testing

Testing can be performed using:

- JUnit
- Mockito
- Postman
- Browser testing
- Manual UI testing

Important test areas:

```text
Registration
Login
JWT Authentication
Role Authorization
Route Search
Bus Search
Trip Management
ETA
Feedback
Crowd Reporting
AI Assistant
WebSocket
Live Tracking
```

---

# 71. Postman API Testing

Recommended testing order:

```text
1. Health API
2. Register API
3. Login API
4. Route API
5. Bus API
6. Trip API
7. ETA API
8. Feedback API
9. Crowd Report API
10. Driver APIs
11. Admin APIs
12. WebSocket
```

For protected APIs, use:

```text
Authorization
Bearer Token
```

---

# 72. WebSocket Testing

For live tracking:

```text
Driver
   ↓
Start Trip
   ↓
Browser Location
   ↓
WebSocket Location Update
   ↓
Backend
   ↓
/topic/trip/{tripId}
   ↓
Passenger
```

The passenger frontend subscribes to the appropriate trip topic.

---

# 73. SOLID Principles

The backend architecture can follow SOLID principles.

## Single Responsibility Principle

Each class should have one primary responsibility.

Example:

```text
BusController
```

handles HTTP requests related to buses.

```text
BusService
```

handles bus business logic.

```text
BusRepository
```

handles database access.

## Open/Closed Principle

Services can be extended without unnecessarily modifying existing code.

## Liskov Substitution Principle

Service implementations should correctly implement their service interfaces.

## Interface Segregation Principle

Separate service interfaces are used instead of creating one large interface.

## Dependency Inversion Principle

Controllers depend on service abstractions rather than directly depending on repository implementations.

---

# 74. Design Patterns and Practices

The project can use:

- Layered Architecture
- MVC-style Controller structure
- Dependency Injection
- Repository Pattern
- Service Layer Pattern
- DTO Pattern
- Strategy-style service abstraction where appropriate
- Observer-style real-time subscription through WebSocket

Spring manages service and repository dependencies through dependency injection.

---

# 75. Real-Time Tracking Architecture

```text
             DRIVER
                │
                ▼
       Browser Geolocation
                │
                ▼
        Latitude / Longitude
                │
                ▼
        STOMP WebSocket
                │
                ▼
        SPRING BOOT SERVER
                │
                ▼
       Bus Tracking Service
                │
                ▼
       WebSocket Broker
                │
                ▼
      /topic/trip/{tripId}
                │
                ▼
           PASSENGER
                │
                ▼
          React Frontend
                │
                ▼
          Leaflet Map
                │
                ▼
        Live Bus Marker
```

---

# 76. AI Assistant Architecture

```text
Passenger
    ↓
Chat Interface
    ↓
Axios
    ↓
AssistantController
    ↓
AIAssistantService
    ↓
External AI API
    ↓
AI Response
    ↓
React
```

The API key is kept on the backend.

---

# 77. ETA Architecture

```text
Current Bus Location
       ↓
Route Information
       ↓
Remaining Distance
       ↓
Estimated Speed
       ↓
ETA Service
       ↓
ETA Response
       ↓
Passenger
```

---

# 78. Crowd Reporting Architecture

```text
Passenger
    ↓
Crowd Report Form
    ↓
POST /api/crowd-reports
    ↓
CrowdReportController
    ↓
CrowdReportService
    ↓
CrowdReportRepository
    ↓
MySQL
```

The latest crowd information can also be delivered to passengers through WebSocket.

---

# 79. Feedback and Sentiment Flow

```text
Passenger
    ↓
Feedback Form
    ↓
Feedback API
    ↓
Feedback Service
    ↓
AI Sentiment Analysis
    ↓
POSITIVE / NEGATIVE / NEUTRAL
    ↓
Save Feedback
    ↓
MySQL
```

---

# 80. Application Data Flow

```text
React Frontend
      │
      ├── REST API
      │
      ├── WebSocket
      │
      └── Browser APIs
              │
              ▼
       Spring Boot Backend
              │
       ┌──────┼───────┐
       │      │       │
       ▼      ▼       ▼
     MySQL   AI     Routing
             API    Services
```

---

# 81. Project Folder Structure

The GitHub repository should contain both frontend and backend:

```text
AI-Smart-Transit-Assistant-Real-Time-Bus-Tracking-System/
│
├── transit-frontend/
│
├── transit-backend/
│
├── README.md
│
├── .gitignore
│
└── .env.example
```

---

# 82. GitHub Repository

Recommended repository name:

```text
AI-Smart-Transit-Assistant-Real-Time-Bus-Tracking-System
```

The repository contains:

```text
Frontend
Backend
README
Git configuration
Environment example
```

---

# 83. Git Setup

From the root project directory:

```bash
git init
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial commit - Real Time Bus Tracking System"
```

Set main branch:

```bash
git branch -M main
```

Add remote:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Push:

```bash
git push -u origin main
```

---

# 84. Recommended .gitignore

```gitignore
# Node
node_modules/
dist/

# Environment
.env
.env.local
.env.development.local
.env.production.local

# Java
target/

# Eclipse
.classpath
.project
.settings/

# IntelliJ
.idea/

# VS Code
.vscode/

# Logs
*.log

# Operating System
.DS_Store
Thumbs.db
```

---

# 85. Files That Should Not Be Uploaded

Do not upload:

```text
node_modules/
target/
.env
.env.local
database passwords
JWT secrets
AI API keys
private credentials
IDE-specific generated files
large generated build files
```

---

# 86. Deployment Architecture

A possible deployment architecture:

```text
                  USERS
                    │
                    ▼
            React Frontend
          Vercel / Netlify
                    │
                    ▼
             Spring Boot
          Render / Railway
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
        MySQL              AI API
    Aiven / Railway
```

External map/routing services:

```text
OpenStreetMap
OSRM
Nominatim
```

---

# 87. Production Environment

Production configuration should use environment variables.

Example frontend:

```env
VITE_API_URL=https://your-backend-url/api
VITE_WS_URL=https://your-backend-url/ws
```

Backend should use environment variables for:

```text
Database URL
Database Username
Database Password
JWT Secret
AI API Key
Allowed Frontend Origin
```

---

# 88. Deployment Checklist

Before deployment:

```text
[ ] Remove hardcoded passwords
[ ] Remove API keys
[ ] Configure production database
[ ] Configure CORS
[ ] Configure JWT secret
[ ] Configure AI API key
[ ] Configure frontend API URL
[ ] Configure WebSocket URL
[ ] Build frontend
[ ] Build backend
[ ] Test REST APIs
[ ] Test authentication
[ ] Test WebSocket
[ ] Test live tracking
```

---

# 89. Future Enhancements

Possible future improvements:

- Machine-learning based ETA prediction
- Advanced traffic-aware delay prediction
- Push notifications
- Mobile application
- PWA support
- Advanced analytics dashboard
- Historical bus movement
- Route optimization
- Smart driver allocation
- Automatic crowd estimation
- AI-based route recommendation
- Offline map support
- More Indian languages
- Admin reports
- Public transportation statistics
- Advanced notification system

---

# 90. Project Highlights

The main technical highlights are:

```text
React
Spring Boot
Java
MySQL
Spring Security
JWT
BCrypt
Hibernate
JPA
REST APIs
WebSocket
STOMP
SockJS
Leaflet
OpenStreetMap
OSRM
Nominatim
AI API
Speech Recognition
react-i18next
Maven
Git
GitHub
Postman
```

---

# 91. Why This Project Is Useful

This project demonstrates how modern web technologies can be combined to build a smart transportation platform.

It demonstrates practical knowledge of:

- Frontend development
- Backend development
- REST API development
- Authentication
- Authorization
- Database management
- Real-time communication
- WebSocket
- Maps
- Geolocation
- External APIs
- AI integration
- Multilingual applications
- Software architecture
- Testing
- Git and GitHub

---

# 92. Key Learning Outcomes

Through this project, developers can gain experience with:

### Java

- Object-oriented programming
- Collections
- Exception handling
- Interfaces
- Enums

### Spring Boot

- REST controllers
- Dependency injection
- Services
- Repositories
- JPA
- Hibernate
- Security

### React

- Components
- Props
- State
- Hooks
- Context API
- Routing
- API integration

### Database

- MySQL
- Relationships
- JPA entities
- Queries
- CRUD operations

### Real-Time Technology

- WebSocket
- STOMP
- SockJS
- Live location updates

### External Services

- OpenStreetMap
- OSRM
- Nominatim
- AI APIs

---

# 93. Interview Explanation

A simple interview explanation:

> Real Time Bus Tracking System is a full-stack web application developed using React, Spring Boot and MySQL. The main purpose of the project is to help passengers search routes, find buses, track buses in real time and check estimated arrival time.
>
> The application has three roles: Passenger, Driver and Admin. Authentication is implemented using Spring Security, JWT and BCrypt.
>
> For live bus tracking, the driver's browser/device provides latitude and longitude using the browser Geolocation API. The location is sent through WebSocket using STOMP and SockJS. The Spring Boot backend broadcasts the location to passengers, and the React frontend displays the updated bus position using Leaflet and OpenStreetMap.
>
> The project also integrates OSRM for routing, Nominatim for geocoding, an AI API for the travel assistant and sentiment analysis, and react-i18next for English, Hindi and Marathi language support.

---

# 94. One-Minute Project Explanation

```text
Project:
Real Time Bus Tracking System

Frontend:
React

Backend:
Spring Boot

Database:
MySQL

Authentication:
JWT + Spring Security + BCrypt

Real-Time:
WebSocket + STOMP + SockJS

Maps:
Leaflet + OpenStreetMap

Routing:
OSRM

Geocoding:
Nominatim

AI:
AI Travel Assistant + Sentiment Analysis

Roles:
Passenger + Driver + Admin
```

Main flow:

```text
Passenger
   ↓
Register/Login
   ↓
Source + Destination
   ↓
Search Bus
   ↓
Select Bus
   ↓
Live Tracking
   ↓
ETA
   ↓
AI Assistant
   ↓
Feedback
```

Driver:

```text
Login
   ↓
Assigned Bus
   ↓
Start Trip
   ↓
Browser GPS
   ↓
WebSocket
   ↓
Passenger Live Map
```

---

# 95. Resume Project Description

**Real Time Bus Tracking System | React, Spring Boot, MySQL, WebSocket, JWT**

Developed a full-stack smart transportation platform that allows passengers to search routes, find buses, view estimated arrival times and track buses in real time. Implemented role-based authentication using Spring Security, JWT and BCrypt for Passenger, Driver and Admin users. Integrated browser-based geolocation with WebSocket/STOMP communication to broadcast driver location updates to passenger dashboards. Integrated Leaflet/OpenStreetMap for map visualization, OSRM for routing, Nominatim for geocoding, AI services for travel assistance and sentiment analysis, and react-i18next for multilingual support.

---

# 96. Skills Demonstrated

```text
Java
Spring Boot
Spring Security
JWT
BCrypt
Hibernate
JPA
REST API
React
JavaScript
Vite
Tailwind CSS
Bootstrap
MySQL
WebSocket
STOMP
SockJS
Leaflet
OpenStreetMap
OSRM
Nominatim
AI API Integration
Speech Recognition
i18next
Maven
Git
GitHub
Postman
JUnit
Mockito
```

---

# 97. Development Roadmap

## Phase 1 — Project Setup

```text
Frontend Setup
Backend Setup
MySQL Setup
Git Setup
```

## Phase 2 — Authentication

```text
Register
Login
JWT
Spring Security
Role Authorization
```

## Phase 3 — Core Transportation

```text
Users
Routes
Buses
Trips
```

## Phase 4 — Live Tracking

```text
Browser Geolocation
WebSocket
STOMP
Live Map
```

## Phase 5 — Smart Features

```text
ETA
Delay Prediction
AI Assistant
Voice Search
Crowd Reports
```

## Phase 6 — Additional Features

```text
Feedback
Sentiment Analysis
Notifications
Multilingual Support
```

## Phase 7 — Testing

```text
JUnit
Mockito
Postman
Manual UI Testing
```

## Phase 8 — Deployment

```text
Frontend Deployment
Backend Deployment
Database Deployment
Environment Configuration
Production Testing
```

---

# 98. Important Project Design Decisions

## Browser-Based Driver Location

The basic implementation uses:

```javascript
navigator.geolocation.watchPosition()
```

This avoids requiring separate GPS hardware.

## JWT Authentication

JWT allows the frontend to authenticate protected backend requests.

## WebSocket

WebSocket is used because live bus tracking requires continuous real-time updates.

## Leaflet

Leaflet provides an interactive map for displaying buses and routes.

## OpenStreetMap

OpenStreetMap provides map data.

## OSRM

OSRM provides road routing.

## Nominatim

Nominatim provides geocoding.

## AI

AI services provide natural-language travel assistance and sentiment analysis.

---

# 99. Important API Flow

Example login:

```text
POST /api/auth/login
        ↓
AuthController
        ↓
AuthService
        ↓
UserRepository
        ↓
Validate Password
        ↓
Generate JWT
        ↓
Return Login Response
```

Example route search:

```text
GET /api/routes/search
        ↓
RouteController
        ↓
RouteService
        ↓
RouteRepository
        ↓
MySQL
        ↓
Route Response
```

Example live location:

```text
Driver Browser
        ↓
Geolocation API
        ↓
STOMP
        ↓
Spring Boot
        ↓
BusTrackingService
        ↓
WebSocket Topic
        ↓
Passenger
```

---

# 100. Error Handling

The application can return structured API errors.

Example:

```json
{
  "status": 404,
  "message": "Bus not found",
  "timestamp": "2026-10-01T10:30:00"
}
```

Common errors:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

---

# 101. Health Check

The backend can provide a health endpoint:

```text
GET /api/health
```

Example response:

```text
Backend is running
```

This can be used to verify that the Spring Boot server is available.

---

# 102. Recommended Development Environment

Recommended software:

```text
Java 17
Node.js
npm
MySQL
Git
GitHub
VS Code
Eclipse or IntelliJ IDEA
Postman
MySQL Workbench
```

---

# 103. Basic Commands

## Frontend

```bash
cd transit-frontend
npm install
npm run dev
```

## Backend

```bash
cd transit-backend
mvn clean install
mvn spring-boot:run
```

## Git

```bash
git status
git add .
git commit -m "Update project"
git push
```

---

# 104. Complete Repository Structure

```text
AI-Smart-Transit-Assistant-Real-Time-Bus-Tracking-System/
│
├── transit-frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example
│   └── README.md
│
├── transit-backend/
│   ├── src/
│   ├── pom.xml
│   ├── .env.example
│   └── README.md
│
├── README.md
│
├── .gitignore
│
└── .env.example
```

---

# 105. Final Project Flow

```text
                         USER
                          │
                          ▼
                    HOME PAGE
                          │
                 ┌────────┴────────┐
                 ▼                 ▼
             REGISTER            LOGIN
                 │                 │
                 └────────┬────────┘
                          ▼
                   ROLE DETECTION
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
       PASSENGER       DRIVER         ADMIN
            │             │             │
            ▼             ▼             ▼
       DASHBOARD      DASHBOARD      DASHBOARD
            │             │             │
            ▼             ▼             ▼
      Route Search     Start Trip     Manage System
            │             │
            ▼             ▼
       Select Bus      Browser GPS
            │             │
            ▼             ▼
      Live Tracking    WebSocket
            │             │
            └──────┬──────┘
                   ▼
             SPRING BOOT
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
      MySQL       AI      External APIs
        │                     │
        │              ┌──────┼──────┐
        │              ▼      ▼      ▼
        │             OSRM  Nominatim OSM
        │
        ▼
      DATA
        │
        ▼
     REACT UI
```

---

# 106. Project Summary

**Real Time Bus Tracking System (AI Smart Transit Assistant)** is a full-stack transportation platform designed to combine traditional bus management with modern web technologies.

The project demonstrates:

```text
Authentication
Authorization
REST APIs
Database Management
Real-Time Communication
Browser GPS
Live Bus Tracking
Maps
Routing
Geocoding
ETA
AI Assistance
Voice Search
Crowd Reporting
Sentiment Analysis
Multilingual Support
Admin Management
Driver Management
Passenger Management
Testing
Deployment
```

The most important real-time feature is the driver-to-passenger location flow:

```text
Driver Device
     ↓
Browser GPS
     ↓
Latitude + Longitude
     ↓
WebSocket
     ↓
Spring Boot
     ↓
WebSocket Broadcast
     ↓
Passenger React App
     ↓
Leaflet Map
```

---

# 107. Final Technology Architecture

```text
Frontend
React + Vite
      │
      ├── Tailwind CSS
      ├── Bootstrap
      ├── React Router
      ├── Axios
      ├── React Leaflet
      ├── i18next
      └── STOMP/SockJS
      │
      ▼
Backend
Spring Boot + Java 17
      │
      ├── Spring Web
      ├── Spring Security
      ├── JWT
      ├── BCrypt
      ├── Spring Data JPA
      ├── Hibernate
      └── WebSocket
      │
      ▼
Database
MySQL
      │
      ├── Users
      ├── Routes
      ├── Buses
      ├── Trips
      ├── Feedback
      └── Crowd Reports

External Services
      │
      ├── OpenStreetMap
      ├── OSRM
      ├── Nominatim
      └── AI API
```

---

# 108. Conclusion

The **Real Time Bus Tracking System (AI Smart Transit Assistant)** demonstrates how React, Spring Boot, MySQL, WebSocket, browser geolocation, mapping services and AI can be combined to create a modern public transportation platform.

The project focuses on improving the passenger experience while also providing tools for drivers and administrators.

The architecture is designed to be modular and extensible, allowing additional features such as machine-learning based ETA prediction, advanced analytics, mobile applications, push notifications and intelligent route optimization to be added in the future.

---

## Project Name

**Real Time Bus Tracking System (AI Smart Transit Assistant)**

## Repository Name

```text
AI-Smart-Transit-Assistant-Real-Time-Bus-Tracking-System
```

## Main Technologies

```text
React
Java
Spring Boot
Spring Security
JWT
Hibernate
JPA
MySQL
WebSocket
STOMP
SockJS
Leaflet
OpenStreetMap
OSRM
Nominatim
AI API
Maven
Git
GitHub
```

## Main Roles

```text
Passenger
Driver
Admin
```

## Main Highlight

```text
Real-Time Bus Tracking Using Browser GPS + WebSocket
```
