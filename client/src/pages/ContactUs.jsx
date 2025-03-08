import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const formRef = useRef();

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
      console.log("EmailJS initialized with public key");
    } else {
      console.error("EmailJS public key is missing");
    }
  }, []);

  // Test EmailJS configuration
  const testEmailJSConfig = async () => {
    try {
      setDebugInfo("Testing EmailJS configuration...");

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      setDebugInfo((prev) => prev + `\nService ID: ${serviceId ? "✓" : "✗"}`);
      setDebugInfo((prev) => prev + `\nTemplate ID: ${templateId ? "✓" : "✗"}`);
      setDebugInfo((prev) => prev + `\nPublic Key: ${publicKey ? "✓" : "✗"}`);

      // Only proceed if all credentials are available
      if (!serviceId || !templateId || !publicKey) {
        setDebugInfo((prev) => prev + "\nMissing credentials. Test aborted.");
        return;
      }

      // Send a test email
      setDebugInfo((prev) => prev + "\nSending test email...");
      const response = await emailjs.send(serviceId, templateId, {
        from_name: "Test User",
        from_email: "test@example.com",
        subject: "EmailJS Test",
        message: "This is a test message from the Contact Us form.",
      });

      setDebugInfo(
        (prev) =>
          prev +
          `\nTest email sent successfully! Status: ${response.status}, Text: ${response.text}`
      );
    } catch (err) {
      console.error("Test email failed:", err);
      setDebugInfo(
        (prev) => prev + `\nTest failed: ${err.message || "Unknown error"}`
      );
      if (err.status) {
        setDebugInfo((prev) => prev + `\nStatus code: ${err.status}`);
      }
      if (err.text) {
        setDebugInfo((prev) => prev + `\nResponse text: ${err.text}`);
      }
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");

      // Get EmailJS credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      // Check if credentials are available
      if (!serviceId || !templateId) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      // Log for debugging (remove in production)
      console.log("Sending email with:", { serviceId, templateId });

      // Prepare template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      };

      // Send email using EmailJS with a timeout
      const response = await Promise.race([
        emailjs.send(serviceId, templateId, templateParams),
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "Request timed out. Please check your internet connection."
                )
              ),
            15000
          )
        ),
      ]);

      console.log("Email sent successfully:", response);

      setIsSubmitted(true);
      reset();

      // Reset the success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Error sending email:", err);

      // Provide more specific error messages
      if (err.message.includes("timeout")) {
        setError(
          "Request timed out. Please check your internet connection and try again."
        );
      } else if (err.status === 400) {
        setError("Invalid email parameters. Please check your form inputs.");
      } else if (err.status === 401 || err.status === 403) {
        setError("Authentication error. Please contact the administrator.");
      } else if (err.status >= 500) {
        setError("EmailJS server error. Please try again later.");
      } else {
        setError(
          `Failed to send your message: ${err.message || "Unknown error"}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          Contact{" "}
          <span className="text-primary-light dark:text-primary-dark">Us</span>
        </h1>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto">
          Have questions or need assistance? Our team is here to help. Reach out
          to us using any of the methods below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-8 border border-border-light dark:border-border-dark"
        >
          <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
            Send Us a Message
          </h2>

          {isSubmitted && (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6">
              Thank you for your message! We'll get back to you shortly.
            </div>
          )}

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-1"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? "border-red-500" : ""}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? "border-red-500" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-1"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className={`form-input ${
                  errors.subject ? "border-red-500" : ""
                }`}
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className={`form-input ${
                  errors.message ? "border-red-500" : ""
                }`}
                {...register("message", { required: "Message is required" })}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white py-2 px-4 rounded-md transition-colors duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-8 border border-border-light dark:border-border-dark mb-8">
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-light dark:text-primary-dark"
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
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark">
                    Office Address
                  </h3>
                  <p className="mt-1 text-text-secondary-light dark:text-text-secondary-dark">
                    123 Tech Boulevard
                    <br />
                    Suite 456
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-light dark:text-primary-dark"
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
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark">
                    Phone Numbers
                  </h3>
                  <p className="mt-1 text-text-secondary-light dark:text-text-secondary-dark">
                    Support: (800) 123-4567
                    <br />
                    Sales: (800) 765-4321
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-light dark:text-primary-dark"
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
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark">
                    Email Addresses
                  </h3>
                  <p className="mt-1 text-text-secondary-light dark:text-text-secondary-dark">
                    Support: support@derncompany.com
                    <br />
                    Sales: sales@derncompany.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-light dark:text-primary-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark">
                    Business Hours
                  </h3>
                  <p className="mt-1 text-text-secondary-light dark:text-text-secondary-dark">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 2:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-8 border border-border-light dark:border-border-dark">
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
              Connect With Us
            </h2>
            <div className="flex space-x-4">
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
                {
                  name: "Instagram",
                  icon: "M12 2a10 10 0 00-3.16 19.5c.5.08.66-.22.66-.48v-1.7c-2.67.6-3.23-1.13-3.23-1.13-.44-1.1-1.08-1.4-1.08-1.4-.88-.6.07-.6.07-.6.97.07 1.48 1 1.48 1 .86 1.47 2.26 1.04 2.8.8.09-.62.35-1.05.63-1.3-2.2-.25-4.5-1.1-4.5-4.9 0-1.08.38-1.97 1-2.65-.1-.25-.43-1.23.1-2.55 0 0 .83-.27 2.7 1a9.36 9.36 0 015 0c1.87-1.27 2.7-1 2.7-1 .53 1.32.2 2.3.1 2.55.62.68 1 1.57 1 2.65 0 3.8-2.3 4.65-4.5 4.9.35.3.67.9.67 1.8v2.67c0 .26.16.56.66.48A10 10 0 0012 2z",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
          Our Location
        </h2>
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden border border-border-light dark:border-border-dark h-96">
          {/* Replace with actual map component or iframe */}
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Map placeholder - integrate Google Maps or other map service here
            </p>
          </div>
        </div>
      </motion.section>

      {/* Debug section - only visible in development */}
      {import.meta.env.DEV && (
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
          <button
            onClick={testEmailJSConfig}
            className="mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Test EmailJS Configuration
          </button>
          {debugInfo && (
            <pre className="whitespace-pre-wrap bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm">
              {debugInfo}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactUs;
