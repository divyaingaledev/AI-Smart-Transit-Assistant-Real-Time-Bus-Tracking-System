# AI Smart Transit Assistant-Real Time Bus Tracking System

## 1. Project Overview

AI Smart Transit Assistant is a full-stack web application for smart public transportation.

The main purpose of this project is to help passengers easily find buses, search routes, track buses in real time, check estimated arrival time, ask an AI travel assistant, use voice search and provide feedback.

The application provides separate functionality for three types of users:

- Passenger
- Driver
- Admin

The project uses React for the frontend, Spring Boot for the backend, and MySQL for storing application data.

Real-time bus tracking is implemented using browser/device GPS and WebSocket communication.

---

# 2. Main Goal

The main goal of the project is to create a single platform where a passenger can:

```text
Register
   ↓
Login
   ↓
Enter Source
   ↓
Enter Destination
   ↓
Search Bus
   ↓
View Route
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
Give Feedback
```

---

# 3. Problems Solved by the Project

Traditional public transport users may face problems such as:

- Difficulty finding the correct bus
- Difficulty finding suitable routes
- Not knowing the current bus location
- Not knowing when the bus will arrive
- Lack of crowd information
- Difficulty getting route guidance
- Lack of real-time information
- Limited access to multilingual information

This project attempts to solve these problems through a web-based smart transportation platform.

---

# 4. Main User Roles

The system has three main roles.

## Passenger

Passenger is the normal application user.

Passenger can:

- Register
- Login
- Search routes
- Search buses
- View bus details
- Track buses
- View live bus location
- Check ETA
- Ask AI travel questions
- Use voice search
- Report crowd level
- Submit feedback
- Manage profile
- Save favorite routes
- View trip history
- Manage notification preferences
- Change application language

---

## Driver

Driver manages the assigned bus and trip.

Driver can:

- Login
- View assigned bus
- View assigned route
- Start trip
- End trip
- Update trip status
- Share live GPS location
- View basic trip information

---

## Admin

Admin manages the complete transportation system.

Admin can:

- Manage users
- Manage drivers
- Manage buses
- Manage routes
- Manage trips
- View feedback
- View crowd reports
- Monitor active buses
- View basic system analytics

---

# 5. Complete Project Modules

The project contains the following modules:

1. Authentication Module
2. User/Passenger Module
3. Route Module
4. Bus Module
5. Trip Module
6. Live Tracking Module
7. GPS Module
8. ETA Module
9. Delay Prediction Module
10. AI Assistant Module
11. Voice Search Module
12. Crowd Reporting Module
13. Feedback Module
14. Sentiment Analysis Module
15. Driver Module
16. Admin Module
17. WebSocket Module
18. Map Module
19. Routing Module
20. Geocoding Module
21. Multi-Language Module
22. Security Module
23. Notification Module
24. Dashboard Module
25. Testing Module
26. Deployment Module

---

# 6. Authentication Module

The Authentication Module manages user registration and login.

## Registration

A new user can register using:

- Name
- Email
- Password

The application can assign the default role as Passenger during public registration.

Driver and Admin accounts should normally be created or managed by an authorized administrator.

## Login

The user enters:

- Email
- Password

The backend verifies the credentials.

If the credentials are correct, the backend generates a JWT token.

The frontend stores the token and sends it with protected API requests.

---

# 7. Security Module

Security protects the backend APIs and user accounts.

Technologies:

- Spring Security
- JWT
- BCrypt
- Role-based authorization

Authentication flow:

```text
Email + Password
       ↓
Spring Security
       ↓
Verify User
       ↓
Generate JWT
       ↓
React Frontend
       ↓
Protected API Requests
```

Role-based access:

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

---

# 8. Passenger Module

The Passenger Module provides the main features used by passengers.

Passenger dashboard can contain:

- Welcome section
- Route search
- Bus search
- Live tracking
- ETA
- AI assistant
- Crowd information
- Favorite routes
- Trip history
- Feedback history
- Profile
- Notification preferences
- Language selection

---

# 9. Route Module

The Route Module manages public transportation routes.

A route can contain:

- Route ID
- Route name
- Source
- Destination
- Stops
- Distance
- Estimated duration
- Assigned buses

Example:

```text
Route:
Aundh → Shivajinagar → Pune Station
```

Passengers can search routes using source and destination.

---

# 10. Route Search Module

Passengers enter:

```text
From:
Aundh

To:
Pune Station
```

The system searches available routes and buses.

The result can contain:

```text
Bus Number
Route Name
Source
Destination
Departure Time
Arrival Time
Current Status
```

Basic flow:

```text
Source + Destination
        ↓
Route API
        ↓
Route Service
        ↓
Database
        ↓
Available Routes
        ↓
React UI
```

---

# 11. Bus Module

The Bus Module manages bus information.

A bus can contain:

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

Bus status can include:

```text
NOT_STARTED
RUNNING
DELAYED
COMPLETED
CANCELLED
```

Admin can manage buses.

---

# 12. Trip Module

A Trip represents a particular bus journey.

A trip can contain:

- Trip ID
- Bus
- Driver
- Route
- Start time
- End time
- Trip status
- Current location

Trip statuses can include:

```text
NOT_STARTED
STARTED
IN_PROGRESS
COMPLETED
CANCELLED
```

---

# 13. Live Tracking Module

Live Tracking is one of the main features.

The driver's device provides the current location.

The location is sent to the Spring Boot backend.

The backend broadcasts the location to passengers.

The passenger sees the updated bus position on the map.

Flow:

```text
Driver Device
      ↓
GPS
      ↓
Latitude + Longitude
      ↓
WebSocket
      ↓
Spring Boot
      ↓
Broadcast
      ↓
Passenger React App
      ↓
Leaflet Map
```

---

# 14. GPS Module

The project uses browser/device location.

The driver can allow location access in the browser.

JavaScript can use:

```javascript
navigator.geolocation.watchPosition()
```

The application receives:

```text
Latitude
Longitude
```

Example:

```text
Latitude: 18.5672
Longitude: 73.8072
```

The project does not require separate GPS hardware for the basic implementation.

---

# 15. WebSocket Module

WebSocket provides real-time communication.

Technologies:

- WebSocket
- STOMP
- SockJS

Normal REST communication:

```text
Client
  ↓
Request
  ↓
Server
  ↓
Response
```

WebSocket communication:

```text
Driver
  ↓
Location Update
  ↓
Server
  ↓
Passenger
```

This is useful for:

- Live bus location
- Crowd updates
- Real-time notifications

---

# 16. WebSocket Topics

The backend can use topics such as:

```text
/topic/trip/{tripId}
```

Example:

```text
/topic/trip/101
```

Passengers subscribed to the trip can receive location updates.

---

# 17. Map Module

The Map Module displays transportation information visually.

Technologies:

- Leaflet
- React Leaflet
- OpenStreetMap

The map can display:

- Bus marker
- Current location
- Route
- Stops
- Source
- Destination

The passenger can see the bus location on the map.

---

# 18. Routing Module

Routing determines the path between two locations.

Technology:

```text
OSRM
```

OSRM can be used to calculate road routes.

Example:

```text
Aundh
  ↓
Shivajinagar
  ↓
Pune Station
```

The route can then be displayed on the map.

---

# 19. Geocoding Module

Geocoding converts location names into coordinates.

Technology:

```text
Nominatim
```

Example:

```text
Aundh
   ↓
Latitude + Longitude
```

The coordinates can then be used by the map and routing services.

---

# 20. ETA Module

ETA means Estimated Time of Arrival.

The system can estimate when the bus will reach a particular location.

Example:

```text
Bus: 101

Current Location:
Aundh

Estimated Arrival:
12 minutes
```

ETA can use:

- Current bus location
- Destination
- Distance
- Average speed
- Remaining route distance
- Route information

Basic calculation:

```text
ETA = Remaining Distance / Estimated Speed
```

The final implementation can use more factors for better accuracy.

---

# 21. Delay Prediction Module

The Delay Prediction Module identifies possible delays.

Example:

```text
Expected Arrival: 10:30 AM
Predicted Arrival: 10:42 AM

Expected Delay: 12 minutes
```

Possible factors:

- Current bus location
- Distance remaining
- Average speed
- Previous trip information
- Previous delays
- Traffic information

A basic rule-based system can be implemented initially.

Machine-learning based prediction can be added later.

---

# 22. AI Assistant Module

The AI Assistant allows passengers to ask travel-related questions using normal language.

Example:

```text
How do I reach Aundh from Pune Station?
```

Other examples:

```text
Which bus should I take?

How long will my journey take?

Which route is better?

Is there a bus from Pune Station to Aundh?
```

AI flow:

```text
Passenger
    ↓
React ChatBox
    ↓
Spring Boot API
    ↓
AI Assistant Service
    ↓
AI API
    ↓
AI Response
    ↓
React
    ↓
Passenger
```

The AI API key must be stored securely on the backend.

---

# 23. Voice Search Module

Voice Search allows passengers to speak instead of typing.

Example:

```text
User speaks:
How do I reach Aundh from Pune Station?
```

The browser converts speech into text.

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

Supported languages can include:

- English
- Hindi
- Marathi

---

# 24. Crowd Reporting Module

Passengers can report how crowded a bus is.

Crowd levels:

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

Crowd reports can help passengers decide which bus to use.

Crowd information can also be broadcast using WebSocket.

---

# 25. Feedback Module

Passengers can submit feedback.

Feedback can contain:

```text
Bus
Rating
Comment
Date
Passenger
```

Example:

```text
Rating: 4/5

Comment:
The bus was clean and arrived on time.
```

Admin can view feedback.

---

# 26. Sentiment Analysis Module

The system can analyze passenger feedback.

Basic sentiment categories:

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

Another example:

```text
Feedback:
The bus was very late.

Sentiment:
NEGATIVE
```

An AI API can be used for sentiment analysis.

---

# 27. Driver Module

The Driver Module provides functionality for drivers.

Driver dashboard includes:

```text
Driver Profile
Assigned Bus
Assigned Route
Current Trip
Trip Status
Start Trip
End Trip
GPS Location
```

Driver flow:

```text
Driver Login
      ↓
Driver Dashboard
      ↓
Assigned Bus
      ↓
Assigned Route
      ↓
Start Trip
      ↓
GPS Location
      ↓
Send Location
      ↓
Backend
      ↓
Passengers
      ↓
End Trip
```

---

# 28. Admin Module

Admin controls the application.

## User Management

Admin can:

- View users
- Add users
- Update users
- Deactivate users
- Delete users if required

## Driver Management

Admin can:

- Add driver
- View driver
- Update driver
- Assign driver
- Manage driver status

## Bus Management

Admin can:

- Add bus
- View bus
- Update bus
- Delete bus
- Assign bus to route

## Route Management

Admin can:

- Add route
- View route
- Update route
- Delete route

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
- View sentiment
- Moderate feedback

---

# 29. User Dashboard Module

The Passenger Dashboard provides a central place for passenger features.

Dashboard sections:

```text
Dashboard
 ├── Route Search
 ├── Bus Search
 ├── Live Tracking
 ├── ETA
 ├── AI Assistant
 ├── Crowd Reports
 ├── Favorite Routes
 ├── Trip History
 ├── Feedback History
 ├── Profile
 ├── Notifications
 └── Language
```

---

# 30. Notification Module

The notification module can provide transportation updates.

Possible notifications:

```text
Bus is delayed.

Bus is arriving soon.

Trip has started.

Trip has ended.

Route has changed.

High crowd reported.
```

Initially this can be implemented inside the web application.

Push notifications can be added as a future enhancement.

---

# 31. Multi-Language Module

The application supports:

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
en.json
hi.json
mr.json
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

# 32. Frontend Architecture

The frontend follows a component-based React architecture.

Basic flow:

```text
React Page
    ↓
Component
    ↓
API / Context / Hook
    ↓
Spring Boot API
```

The frontend contains:

- Pages
- Components
- API services
- Context
- Hooks
- WebSocket
- i18n
- Utilities

---

# 33. Complete Frontend Structure

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

# 34. Frontend Main Pages

## Home Page

The first page opened by the user.

It can contain:

- Project introduction
- Search section
- Features
- Live tracking information
- AI assistant introduction
- Login button
- Register button

---

## Login Page

Contains:

```text
Email
Password
Login Button
```

After successful login, the application redirects the user according to the role.

---

## Register Page

Contains:

```text
Name
Email
Password
Register Button
```

Public registration creates a Passenger account.

---

## Route Search Page

Contains:

```text
Source
Destination
Search Button
```

It displays matching routes and buses.

---

## Live Tracking Page

Contains:

- Leaflet map
- Bus marker
- Current location
- Route
- ETA
- Bus information

---

## Assistant Page

Contains:

- Chat interface
- User question
- AI response
- Voice input

---

## Passenger Dashboard

Contains passenger-specific features.

---

## Driver Dashboard

Contains driver-specific features.

---

## Admin Dashboard

Contains administration features.

---

# 35. Backend Architecture

The backend follows layered architecture.

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

Additional layers:

```text
Security
Exception Handling
WebSocket
DTO
Configuration
Utilities
```

---

# 36. Complete Backend Structure

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
│   │   │       │
│   │   │       ├── config/
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   ├── WebSocketConfig.java
│   │   │       │   ├── CorsConfig.java
│   │   │       │   └── SwaggerConfig.java
│   │   │       │
│   │   │       ├── security/
│   │   │       │   ├── JwtTokenProvider.java
│   │   │       │   ├── JwtAuthFilter.java
│   │   │       │   └── CustomUserDetailsService.java
│   │   │       │
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
│   │   │       │
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
│   │   │       │   │
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
│   │   │       │
│   │   │       ├── repository/
│   │   │       │   ├── UserRepository.java
│   │   │       │   ├── RouteRepository.java
│   │   │       │   ├── BusRepository.java
│   │   │       │   ├── TripRepository.java
│   │   │       │   ├── FeedbackRepository.java
│   │   │       │   └── CrowdReportRepository.java
│   │   │       │
│   │   │       ├── entity/
│   │   │       │   ├── User.java
│   │   │       │   ├── Route.java
│   │   │       │   ├── Bus.java
│   │   │       │   ├── Trip.java
│   │   │       │   ├── Feedback.java
│   │   │       │   └── CrowdReport.java
│   │   │       │
│   │   │       ├── enums/
│   │   │       │   ├── Role.java
│   │   │       │   ├── BusStatus.java
│   │   │       │   ├── TripStatus.java
│   │   │       │   ├── CrowdLevel.java
│   │   │       │   └── Sentiment.java
│   │   │       │
│   │   │       ├── dto/
│   │   │       │   ├── request/
│   │   │       │   └── response/
│   │   │       │
│   │   │       ├── websocket/
│   │   │       │   ├── BusLocationHandler.java
│   │   │       │   └── CrowdReportHandler.java
│   │   │       │
│   │   │       ├── exception/
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   ├── ResourceNotFoundException.java
│   │   │       │   ├── BadRequestException.java
│   │   │       │   ├── UnauthorizedException.java
│   │   │       │   └── ApiError.java
│   │   │       │
│   │   │       └── util/
│   │   │           ├── DistanceCalculator.java
│   │   │           └── DateTimeUtil.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── transit/
│
├── pom.xml
├── .gitignore
├── .env.example
└── README.md
```

---

# 37. Backend Configuration Module

The configuration package contains application configuration.

## SecurityConfig

Responsible for:

- Spring Security
- Public APIs
- Protected APIs
- Role-based access

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

Used for API documentation if Swagger/OpenAPI is enabled.

---

# 38. Security Package

The security package contains authentication logic.

## JwtTokenProvider

Responsible for:

- Creating JWT
- Validating JWT
- Extracting username
- Checking token expiration

## JwtAuthFilter

Runs for protected requests.

It:

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

Loads user information from the database.

---

# 39. Controller Layer

Controllers receive HTTP requests.

Example:

```text
AuthController
```

handles:

```text
