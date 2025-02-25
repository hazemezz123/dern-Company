# MERN Support Ticket Application

A full-stack support ticket management system built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (register, login)
- Create, view, update, and delete support tickets
- Filter and search tickets
- Role-based access control (user and admin roles)
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React, React Router, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Custom JWT-based auth

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/mern-support-app.git
   cd mern-support-app
   ```

2. Install dependencies:

   ```
   npm run install-all
   ```

3. Create a `.env` file in the server directory:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-support-app
   NODE_ENV=development
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source files
│       ├── components/     # Reusable components
│       ├── context/        # Context API
│       ├── pages/          # Page components
│       └── services/       # API services
├── server/                 # Express backend
│   ├── config/             # Configuration files
│   ├── models/             # Mongoose models
│   └── routes/             # API routes
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License.

## Admin Functionality

This application includes special functionality for admin users:

- Admins can view all tickets in the system
- Admins can change the status of tickets
- Admins can assign tickets to themselves
- Regular users can only create and view their own tickets

### Creating an Admin User

To create an admin user, run:

```
cd server
npm run create-admin
```

This will create an admin user with:

- Email: admin@example.com
- Password: admin123

You can then log in with these credentials to access the admin dashboard.

## Custom Services and Booking System

This application includes a service booking system:

- Admins can create and manage custom services
- Users can browse services and make bookings
- Admins can manage bookings (confirm, complete, or cancel)
- Users can view their booking history and cancel pending bookings

### Admin Features

- **User Management**: Create new admin users
- **Service Management**: Create, edit, and delete services
- **Booking Management**: View all bookings and update their status

### User Features

- **Service Browsing**: View and filter available services
- **Booking**: Book services for specific dates and times
- **Booking Management**: View booking history and cancel pending bookings
