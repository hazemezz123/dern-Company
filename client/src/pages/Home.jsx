import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Elegant version without wave */}
      <section className="relative py-24 bg-gradient-to-br from-surface-light to-background-light dark:from-surface-dark dark:to-background-dark overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6 leading-tight">
                Professional IT Support{" "}
                <span className="text-primary-light dark:text-primary-dark">
                  Solutions
                </span>{" "}
                for Your Business
              </h1>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
                From remote assistance to on-site support, we provide
                comprehensive technical services tailored to your specific
                needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="bg-primary-light dark:bg-primary-dark text-white border-2 border-primary-light dark:border-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 text-lg px-8 py-3 rounded-md transition-colors duration-200"
                >
                  Explore Services
                </Link>
                <Link
                  to="/register"
                  className="bg-transparent border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 text-lg px-8 py-3 rounded-md transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="IT Support Services"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview Section - Elegant version */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
              Comprehensive IT Support Solutions
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto">
              We offer a wide range of IT services designed to keep your
              business technology running smoothly and efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border-light dark:border-border-dark"
              >
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mb-4">
                    <span className="text-primary-light dark:text-primary-dark">
                      {service.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="text-primary-light dark:text-primary-dark font-medium hover:underline inline-flex items-center"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Elegant version */}
      <section className="py-24 bg-surface-light dark:bg-surface-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Our Team"
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
                Dedicated to Providing Exceptional IT Support
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
                With over 10 years of experience in the IT industry, our team of
                certified professionals is committed to delivering high-quality
                technical solutions to businesses of all sizes.
              </p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8">
                We understand that technology is critical to your business
                operations, which is why we offer prompt, reliable, and
                efficient IT support services to minimize downtime and maximize
                productivity.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">
                    10+
                  </div>
                  <div className="text-text-secondary-light dark:text-text-secondary-dark">
                    Years of Experience
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">
                    500+
                  </div>
                  <div className="text-text-secondary-light dark:text-text-secondary-dark">
                    Satisfied Clients
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">
                    24/7
                  </div>
                  <div className="text-text-secondary-light dark:text-text-secondary-dark">
                    Technical Support
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">
                    99%
                  </div>
                  <div className="text-text-secondary-light dark:text-text-secondary-dark">
                    Client Retention
                  </div>
                </div>
              </div>

              <Link
                to="/services"
                className="btn-primary px-8 py-3 inline-block"
              >
                Our Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Elegant version */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
              What Our Clients Say
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about our IT support services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-md border border-border-light dark:border-border-dark"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                      {testimonial.name}
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark italic">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant version */}
      <section className="py-20 bg-gradient-to-br from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
              Contact us today to learn how our IT support services can help
              your business thrive in the digital age.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-primary-light dark:text-primary-dark hover:bg-white/90 px-8 py-3 rounded-md font-medium transition-colors duration-200"
              >
                Sign Up Now
              </Link>
              <Link
                to="/services"
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md font-medium transition-colors duration-200"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Sample data for the services section
const services = [
  {
    title: "Remote Support",
    description:
      "Get immediate assistance with software issues, troubleshooting, and configuration via secure screen sharing.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "On-Site Support",
    description:
      "Our technicians will visit your location to resolve hardware and software issues promptly.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2H9.83c.11-.313.17-.65.17-1v-1h1a1 1 0 100-2h-1V7a1 1 0 112 0 1 1 0 102 0 3 3 0 00-3-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Device Repair",
    description:
      "Professional hardware diagnostics and repair services for desktops, laptops, and other devices.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Device Pickup & Return",
    description:
      "We'll pick up your device, repair it at our facility, and return it to you in working condition.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
      </svg>
    ),
  },
  {
    title: "IT Consultation",
    description:
      "Expert advice on IT infrastructure, network setup, security solutions, and technology planning.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Network Setup & Security",
    description:
      "Comprehensive network installation, configuration, and security implementation for your business.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

// Sample data for testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Acme Corporation",
    quote:
      "The remote support service saved us countless hours of downtime. The team was quick to respond and resolved our issues efficiently.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Michael Chen",
    company: "Innovate Solutions",
    quote:
      "Their on-site support team is exceptional. They not only fixed our network issues but also provided valuable recommendations for improvement.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Emily Rodriguez",
    company: "Global Enterprises",
    quote:
      "The device repair service exceeded our expectations. Fast turnaround time and excellent communication throughout the process.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

export default Home;
