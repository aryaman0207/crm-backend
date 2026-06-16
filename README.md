 Customer Support Ticketing CRM Backend

Overview :

This is the backend API for the Customer Support Ticketing CRM System. It provides REST APIs for creating, viewing, searching, filtering, and updating support tickets.

Live API

https://customer-support-backend-cmk4.onrender.com

 Technology Stack

* Node.js
* Express.js
* SQLite3
* CORS

Features

* Create Support Tickets
* View All Tickets
* Search Tickets
* Filter Tickets by Status
* View Ticket Details
* Update Ticket Status
* Add Notes/Comments
* REST API Architecture

## API Endpoints

### Create Ticket

POST /api/tickets

### Get All Tickets

GET /api/tickets

### Search Tickets

GET /api/tickets?search=keyword

### Filter Tickets

GET /api/tickets?status=Open

GET /api/tickets?status=In Progress

GET /api/tickets?status=Closed

### Get Ticket Details

GET /api/tickets/:ticketId

### Update Ticket Status

PUT /api/tickets/:ticketId

### Installation

Clone the repository:

git clone https://github.com/aryaman0207/crm-backend.git

Install dependencies:

npm install

Run server:

node server.js

Server runs on:

http://localhost:5000

### Deployment

Backend deployed on Render.

Aryaman Singh
