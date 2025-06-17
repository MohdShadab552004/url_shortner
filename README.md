# URL Shortener Web App

## Overview
This project is a URL Shortener web application that allows users to convert long URLs into short, shareable links. It also tracks the number of times each short URL has been clicked. The backend is built using Node.js, Express, and MongoDB hosted on Atlas, and it is deployed on Render.

## Features
- **Shorten URLs:** Convert long URLs into a short format (e.g., `https://yourdomain.com/abc123`).
- **Duplicate Check:** If a URL is already shortened, it returns the existing short URL.
- **Redirection:** Redirects users from the short URL to the original URL.
- **Click Tracking:** Increments and stores the number of clicks for each short URL.
- **API Endpoints:** Provides clear, RESTful API endpoints for creating and fetching URL data.
- **Tech Stack:** 
  - Node.js & Express for the backend.
  - MongoDB Atlas for the database.
  - Mongoose for data modeling.
  - nanoid for generating unique codes.
  - Deployed on Render.

## API Routes

### POST `/api/shorten`
- **Description:** Create a short URL.
- **Request Body:** 
  ```json
  {
    "originalUrl": "https://google.com"
  }

### Response: Returns the newly generated short URL.
  ```json
  {
    "originalUrl": "https://google.com",
    "shortUrl": "https://yourdomain.com/abc123",
    "clicks": 0
  }
  ```

### GET /:code
- **Description:** Redirects to the original URL.

- **Example:** If the short URL is https://yourdomain.com/abc123, visiting /abc123 will redirect to the original URL.

- **Additional Action:** Increments the click count every time the short URL is accessed.


### GET /clicks/:code
- **Description:** Retrieves the click count for a particular short URL.

- **Example Response:**
  ```json
  {
  "clicks": 15
  }

### Setup & Deployment

**1. Local Environment:**
- Clone the repository.
- Install dependencies using npm install.
- Create a .env file and add your MongoDB URI and other necessary environment variables.
- Run the server locally using npm start or node server.js.

**2. MongoDB Atlas:**
- Host the database on MongoDB Atlas.
- Whitelist your IP address or use 0.0.0.0/0 for testing.
- Use the proper connection string (make sure the database name is included).


### Security Enhancements
- Input Validation & Sanitization: Uses the validator library to ensure URLs are in the correct format.
- CORS Configuration: Limits allowed origins for API calls. 


