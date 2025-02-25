import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TicketList from "./pages/TicketList";
import TicketForm from "./pages/TicketForm";
import TicketDetail from "./pages/TicketDetail";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminServiceManagement from "./pages/AdminServiceManagement";
import AdminBookingManagement from "./pages/AdminBookingManagement";
import ServiceList from "./pages/ServiceList";
import BookingList from "./pages/BookingList";
import { ThemeProvider } from "./context/ThemeContext";
import UserProfile from "./pages/UserProfile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { Link } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tickets"
                  element={
                    <PrivateRoute>
                      <TicketList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tickets/new"
                  element={
                    <PrivateRoute>
                      <TicketForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tickets/:id"
                  element={
                    <PrivateRoute>
                      <TicketDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <PrivateRoute adminOnly={true}>
                      <AdminUserManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/services"
                  element={
                    <PrivateRoute adminOnly={true}>
                      <AdminServiceManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/bookings"
                  element={
                    <PrivateRoute adminOnly={true}>
                      <AdminBookingManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <PrivateRoute>
                      <ServiceList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <PrivateRoute>
                      <BookingList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-12 mt-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  {/* Company Info */}
                  <div>
                    <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                      Dern-Company
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                      Professional IT support solutions for businesses of all
                      sizes.
                    </p>
                    <div className="flex space-x-4">
                      {/* Social Media Icons */}
                      {[
                        {
                          name: "Facebook",
                          icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                        },
                        {
                          name: "Twitter",
                          icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                        },
                        {
                          name: "LinkedIn",
                          icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
                        },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href="#"
                          className="w-8 h-8 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors duration-200"
                          aria-label={social.name}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={social.icon}
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                      Quick Links
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/"
                          className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services"
                          className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                        >
                          Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                      Our Services
                    </h3>
                    <ul className="space-y-2">
                      <li className="text-text-secondary-light dark:text-text-secondary-dark">
                        Remote Technical Support
                      </li>
                      <li className="text-text-secondary-light dark:text-text-secondary-dark">
                        On-Site IT Support
                      </li>
                      <li className="text-text-secondary-light dark:text-text-secondary-dark">
                        Device Repair & Maintenance
                      </li>
                      <li className="text-text-secondary-light dark:text-text-secondary-dark">
                        Network Configuration
                      </li>
                      <li className="text-text-secondary-light dark:text-text-secondary-dark">
                        IT Consultation
                      </li>
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
                      Contact Us
                    </h3>
                    <address className="not-italic">
                      <div className="flex items-start mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-light dark:text-primary-dark mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark">
                          123 Tech Boulevard
                          <br />
                          San Francisco, CA 94107
                        </span>
                      </div>
                      <div className="flex items-start mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-light dark:text-primary-dark mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark">
                          (555) 123-4567
                        </span>
                      </div>
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary-light dark:text-primary-dark mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark">
                          support@derncompany.com
                        </span>
                      </div>
                    </address>
                  </div>
                </div>

                <div className="pt-8 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center">
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-4 md:mb-0">
                    © {new Date().getFullYear()} Dern-Company. All rights
                    reserved.
                  </p>
                  <div className="flex space-x-6">
                    <a
                      href="#"
                      className="text-text-secondary-light dark:text-text-secondary-dark text-sm hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="text-text-secondary-light dark:text-text-secondary-dark text-sm hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="#"
                      className="text-text-secondary-light dark:text-text-secondary-dark text-sm hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                    >
                      Cookie Policy
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
