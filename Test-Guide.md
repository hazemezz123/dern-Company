## Authentication APIs

### Register User

- **Endpoint**: `POST /auth/register`
- **Description**: Creates a new user account
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Expected Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```
- **Test Cases**:
  - Register with valid data → Should return 201 with user object
  - Register with existing email → Should return 400 error
  - Register with invalid email format → Should return 400 error
  - Register with password less than 6 characters → Should return 400 error

### Login User

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user and returns user data
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```
- **Test Cases**:
  - Login with valid credentials → Should return 200 with user object
  - Login with incorrect password → Should return 401 error
  - Login with non-existent email → Should return 401 error

### Create Admin User

- **Endpoint**: `POST /auth/create-admin`
- **Description**: Creates a new admin user (for testing purposes)
- **Request Body**:
  ```json
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123"
  }
  ```
- **Expected Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Admin user created successfully",
    "user": {
      "_id": "60d21b4667d0d8992e610c86",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```

## Ticket APIs

### Get All Tickets

- **Endpoint**: `GET /support-tickets?userId=<userId>&userRole=<userRole>`
- **Description**: Retrieves all tickets (admins see all, users see only their own)
- **Query Parameters**:
  - `userId`: ID of the current user
  - `userRole`: Role of the current user (admin or user)
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "tickets": [
      {
        "_id": "60d21b4667d0d8992e610c87",
        "title": "Cannot access email",
        "description": "I'm unable to log into my email account",
        "status": "open",
        "priority": "high",
        "user": {
          "_id": "60d21b4667d0d8992e610c85",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2023-06-22T15:24:25.000Z",
        "updatedAt": "2023-06-22T15:24:25.000Z"
      }
    ]
  }
  ```
- **Test Cases**:
  - Get tickets as admin → Should return all tickets
  - Get tickets as regular user → Should return only user's tickets
  - Get tickets with invalid userId → Should return 401 error

### Create Ticket

- **Endpoint**: `POST /support-tickets`
- **Description**: Creates a new support ticket
- **Request Body**:
  ```json
  {
    "title": "Network connectivity issue",
    "description": "My internet connection keeps dropping every few minutes",
    "priority": "medium",
    "userId": "60d21b4667d0d8992e610c85"
  }
  ```
- **Expected Response** (201 Created):
  ```json
  {
    "success": true,
    "ticket": {
      "_id": "60d21b4667d0d8992e610c88",
      "title": "Network connectivity issue",
      "description": "My internet connection keeps dropping every few minutes",
      "status": "open",
      "priority": "medium",
      "user": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-06-22T15:30:25.000Z",
      "updatedAt": "2023-06-22T15:30:25.000Z"
    }
  }
  ```
- **Test Cases**:
  - Create ticket with valid data → Should return 201 with ticket object
  - Create ticket without title → Should return 400 error
  - Create ticket without description → Should return 400 error

### Get Ticket by ID

- **Endpoint**: `GET /support-tickets/:id?userId=<userId>&role=<userRole>`
- **Description**: Retrieves a specific ticket by ID
- **URL Parameters**:
  - `id`: Ticket ID
- **Query Parameters**:
  - `userId`: ID of the current user
  - `role`: Role of the current user (admin or user)
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "ticket": {
      "_id": "60d21b4667d0d8992e610c87",
      "title": "Cannot access email",
      "description": "I'm unable to log into my email account",
      "status": "open",
      "priority": "high",
      "user": {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2023-06-22T15:24:25.000Z",
      "updatedAt": "2023-06-22T15:24:25.000Z"
    }
  }
  ```
- **Test Cases**:
  - Get ticket as admin → Should return ticket
  - Get ticket as ticket owner → Should return ticket
  - Get ticket as non-owner user → Should return 403 error
  - Get non-existent ticket → Should return 404 error

### Update Ticket

- **Endpoint**: `PATCH /support-tickets/:id`
- **Description**: Updates a ticket (admin only)
- **URL Parameters**:
  - `id`: Ticket ID
- **Request Body**:
  ```json
  {
    "status": "in-progress",
    "priority": "high",
    "userId": "60d21b4667d0d8992e610c86",
    "userRole": "admin"
  }
  ```
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Ticket updated successfully",
    "ticket": {
      "_id": "60d21b4667d0d8992e610c87",
      "title": "Cannot access email",
      "description": "I'm unable to log into my email account",
      "status": "in-progress",
      "priority": "high",
      "user": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-06-22T15:24:25.000Z",
      "updatedAt": "2023-06-22T15:35:25.000Z"
    }
  }
  ```
- **Test Cases**:
  - Update ticket as admin → Should return 200 with updated ticket
  - Update ticket as regular user → Should return 403 error
  - Update non-existent ticket → Should return 404 error

### Delete Ticket

- **Endpoint**: `DELETE /support-tickets/:id`
- **Description**: Deletes a ticket (admin or ticket owner)
- **URL Parameters**:
  - `id`: Ticket ID
- **Request Body**:
  ```json
  {
    "userId": "60d21b4667d0d8992e610c85",
    "userRole": "user"
  }
  ```
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Ticket deleted successfully"
  }
  ```
- **Test Cases**:
  - Delete ticket as admin → Should return 200
  - Delete ticket as ticket owner → Should return 200
  - Delete ticket as non-owner user → Should return 403 error
  - Delete non-existent ticket → Should return 404 error

## Service APIs

### Get All Services

- **Endpoint**: `GET /services`
- **Description**: Retrieves all active services
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "count": 2,
    "services": [
      {
        "_id": "60d21b4667d0d8992e610c89",
        "title": "Remote Technical Support",
        "description": "Remote assistance for software issues",
        "price": 50,
        "duration": 60,
        "category": "Technical Support",
        "serviceType": "remote-support",
        "isActive": true,
        "createdBy": {
          "_id": "60d21b4667d0d8992e610c86",
          "name": "Admin User"
        },
        "createdAt": "2023-06-22T15:40:25.000Z",
        "updatedAt": "2023-06-22T15:40:25.000Z"
      },
      {
        "_id": "60d21b4667d0d8992e610c90",
        "title": "On-Site IT Support",
        "description": "Our technicians will visit your location",
        "price": 100,
        "duration": 120,
        "category": "Technical Support",
        "serviceType": "on-site-support",
        "isActive": true,
        "createdBy": {
          "_id": "60d21b4667d0d8992e610c86",
          "name": "Admin User"
        },
        "createdAt": "2023-06-22T15:41:25.000Z",
        "updatedAt": "2023-06-22T15:41:25.000Z"
      }
    ]
  }
  ```
- **Test Cases**:
  - Get services → Should return list of active services
  - Get services when none exist → Should return empty array

### Create Service (Admin Only)

- **Endpoint**: `POST /services`
- **Description**: Creates a new service
- **Request Headers**:
  - `user-id`: Admin user ID
  - `user-role`: "admin"
- **Request Body**:
  ```json
  {
    "title": "Computer Repair Service",
    "description": "Hardware diagnostics and repair for desktops and laptops",
    "price": 75,
    "duration": 180,
    "category": "Repair",
    "serviceType": "device-repair",
    "userId": "60d21b4667d0d8992e610c86",
    "userRole": "admin"
  }
  ```
- **Expected Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Service created successfully",
    "service": {
      "_id": "60d21b4667d0d8992e610c91",
      "title": "Computer Repair Service",
      "description": "Hardware diagnostics and repair for desktops and laptops",
      "price": 75,
      "duration": 180,
      "category": "Repair",
      "serviceType": "device-repair",
      "isActive": true,
      "createdBy": "60d21b4667d0d8992e610c86",
      "createdAt": "2023-06-22T15:45:25.000Z",
      "updatedAt": "2023-06-22T15:45:25.000Z"
    }
  }
  ```
- **Test Cases**:
  - Create service as admin → Should return 201 with service object
  - Create service as regular user → Should return 403 error
  - Create service with invalid data → Should return 400 error

### Update Service (Admin Only)

- **Endpoint**: `PATCH /services/:id`
- **Description**: Updates an existing service
- **URL Parameters**:
  - `id`: Service ID
- **Request Headers**:
  - `user-id`: Admin user ID
  - `user-role`: "admin"
- **Request Body**:
  ```json
  {
    "price": 85,
    "isActive": true,
    "userId": "60d21b4667d0d8992e610c86",
    "userRole": "admin"
  }
  ```
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Service updated successfully",
    "service": {
      "_id": "60d21b4667d0d8992e610c91",
      "title": "Computer Repair Service",
      "description": "Hardware diagnostics and repair for desktops and laptops",
      "price": 85,
      "duration": 180,
      "category": "Repair",
      "serviceType": "device-repair",
      "isActive": true,
      "createdBy": "60d21b4667d0d8992e610c86",
      "createdAt": "2023-06-22T15:45:25.000Z",
      "updatedAt": "2023-06-22T15:50:25.000Z"
    }
  }
  ```
- **Test Cases**:
  - Update service as admin → Should return 200 with updated service
  - Update service as regular user → Should return 403 error
  - Update non-existent service → Should return 404 error

### Delete Service (Admin Only)

- **Endpoint**: `DELETE /services/:id`
- **Description**: Deletes a service
- **URL Parameters**:
  - `id`: Service ID
- **Request Headers**:
  - `user-id`: Admin user ID
  - `user-role`: "admin"
- **Request Body**:
  ```json
  {
    "userId": "60d21b4667d0d8992e610c86",
    "userRole": "admin"
  }
  ```
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Service deleted successfully"
  }
  ```
- **Test Cases**:
  - Delete service as admin → Should return 200
  - Delete service as regular user → Should return 403 error
  - Delete non-existent service → Should return 404 error

## Booking APIs

### Get All Bookings

- **Endpoint**: `GET /bookings?userId=<userId>&userRole=<userRole>`
- **Description**: Retrieves all bookings (admins see all, users see only their own)
- **Query Parameters**:
  - `userId`: ID of the current user
  - `userRole`: Role of the current user (admin or user)
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "count": 1,
    "bookings": [
      {
        "_id": "60d21b4667d0d8992e610c92",
        "service": {
          "_id": "60d21b4667d0d8992e610c89",
          "title": "Remote Technical Support",
          "price": 50,
          "duration": 60
        },
        "user": {
          "_id": "60d21b4667d0d8992e610c85",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "date": "2023-07-01T10:00:00.000Z",
        "status": "pending",
        "notes": "Having issues with my email setup",
        "createdAt": "2023-06-22T16:00:25.000Z",
        "updatedAt": "2023-06-22T16:00:25.000Z"
      }
    ]
  }
  ```
- **Test Cases**:
  - Get bookings as admin → Should return all bookings
  - Get bookings as regular user → Should return only user's bookings
  - Get bookings with invalid userId → Should return 401 error

### Create Booking

- **Endpoint**: `POST /bookings`
- **Description**: Creates a new booking
- **Request Body**:
  ```json
  {
    "serviceId": "60d21b4667d0d8992e610c89",
    "date": "2023-07-05T14:00:00.000Z",
    "notes": "Need help with printer setup",
    "userId": "60d21b4667d0d8992e610c85"
  }
  ```
- **Expected Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Booking created successfully",
    "booking": {
      "_id": "60d21b4667d0d8992e610c93",
      "service": "60d21b4667d0d8992e610c89",
      "user": "60d21b4667d0d8992e610c85",
      "date": "2023-07-05T14:00:00.000Z",
      "status": "pending",
      "notes": "Need help with printer setup",
      "createdAt": "2023-06-22T16:05:25.000Z",
      "updatedAt": "2023-06-22T16:05:25.000Z"
    }
  }
  ```
- **Test Cases**:
  - Create booking with valid data → Should return 201 with booking object
  - Create booking with invalid service ID → Should return 400 error
  - Create booking with past date → Should return 400 error

### Update Booking Status (Admin Only)

- **Endpoint**: `PATCH /bookings/:id/status`
- **Description**: Updates the status of a booking
- **URL Parameters**:
  - `id`: Booking ID
- **Request Headers**:
  - `user-id`: Admin user ID
  - `user-role`: "admin"
- **Request Body**:
  ```json
  {
    "status": "confirmed",
    "userId": "60d21b4667d0d8992e610c86",
    "userRole": "admin"
  }
  ```
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Booking status updated successfully",
    "booking": {
      "_id": "60d21b4667d0d8992e610c92",
      "service": "60d21b4667d0d8992e610c89",
      "user": "60d21b4667d0d8992e610c85",
      "date": "2023-07-01T10:00:00.000Z",
      "status": "confirmed",
      "notes": "Having issues with my email setup",
      "createdAt": "2023-06-22T16:00:25.000Z",
      "updatedAt": "2023-06-22T16:10:25.000Z"
    }
  }
  ```
- **Test Cases**:
  - Update booking status as admin → Should return 200 with updated booking
  - Update booking status as regular user → Should return 403 error
  - Update non-existent booking → Should return 404 error

### Cancel Booking

- **Endpoint**: `PATCH /bookings/:id/cancel`
- **Description**: Cancels a booking (user can cancel their own bookings)
- **URL Parameters**:
  - `id`: Booking ID
- **Request Body**:
  ```json
  {
    "userId": "60d21b4667d0d8992e610c85",
    "userRole": "user"
  }
  ```
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Booking cancelled successfully",
    "booking": {
      "_id": "60d21b4667d0d8992e610c93",
      "service": "60d21b4667d0d8992e610c89",
      "user": "60d21b4667d0d8992e610c85",
      "date": "2023-07-05T14:00:00.000Z",
      "status": "cancelled",
      "notes": "Need help with printer setup",
      "createdAt": "2023-06-22T16:05:25.000Z",
      "updatedAt": "2023-06-22T16:15:25.000Z"
    }
  }
  ```
- **Test Cases**:
  - Cancel booking as booking owner → Should return 200 with cancelled booking
  - Cancel booking as admin → Should return 200 with cancelled booking
  - Cancel booking as non-owner user → Should return 403 error
  - Cancel non-existent booking → Should return 404 error

## User APIs

### Get All Users (Admin Only)

- **Endpoint**: `GET /users?userId=<adminId>&userRole=admin`
- **Description**: Retrieves all users (admin only)
- **Query Parameters**:
  - `userId`: ID of the admin user
  - `userRole`: Must be "admin"
- **Expected Response** (200 OK):
  ```json
  {
    "success": true,
    "count": 2,
    "users": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "createdAt": "2023-06-22T15:20:25.000Z",
        "updatedAt": "2023-06-22T15:20:25.000Z"
      },
      {
        "_id": "60d21b4667d0d8992e610c86",
        "name": "Admin User",
        "email": "admin@example.com",
        "role": "admin",
        "createdAt": "2023-06-22T15:22:25.000Z",
        "updatedAt": "2023-06-22T15:22:25.000Z"
      }
    ]
  }
  ```
- **Test Cases**:
  - Get users as admin → Should return list of all users
  - Get users as regular user → Should return 403 error

## Testing with Postman

1. **Set up environment variables**:

   - `baseUrl`: http://localhost:5000/api
   - `userId`: (Store user ID after login)
   - `adminId`: (Store admin ID after login)
   - `userRole`: (Store role after login)
   - `ticketId`: (Store ticket ID after creation)
   - `serviceId`: (Store service ID after creation)
   - `bookingId`: (Store booking ID after creation)

2. **Create a collection for each API group**:

   - Authentication APIs
   - Ticket APIs
   - Service APIs
   - Booking APIs
   - User APIs

3. **Create test scripts**:

   ```javascript
   // Example test script for login
   pm.test("Status code is 200", function () {
     pm.response.to.have.status(200);
   });

   pm.test("Response has user data", function () {
     const responseJson = pm.response.json();
     pm.expect(responseJson.success).to.be.true;
     pm.expect(responseJson.user).to.be.an("object");
     pm.expect(responseJson.user._id).to.exist;

     // Store user ID and role in environment variables
     pm.environment.set("userId", responseJson.user._id);
     pm.environment.set("userRole", responseJson.user.role);
   });
   ```

4. **Run tests in sequence**:
   - First run authentication tests to get valid tokens
   - Then run other API tests using the stored tokens

## Conclusion

This document provides a comprehensive guide for testing all API endpoints in the MERN Support Ticket Application. By following these test cases and examples, you can ensure that your API is functioning correctly and handling edge cases appropriately.
