import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          About{" "}
          <span className="text-primary-light dark:text-primary-dark">
            Dern-Company
          </span>
        </h1>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto">
          We're a team of passionate IT professionals dedicated to providing
          exceptional technical support and innovative solutions for businesses
          of all sizes.
        </p>
      </motion.div>

      {/* Our Story Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
              Our Story
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Founded in 2015, Dern-Company began with a simple mission: to
              provide businesses with reliable, efficient, and personalized IT
              support services. What started as a small team of three has now
              grown into a comprehensive IT solutions provider with over 50
              specialists across multiple disciplines.
            </p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Our journey has been defined by our commitment to staying ahead of
              technological trends while maintaining a human-centered approach
              to customer service. We believe that technology should simplify
              business operations, not complicate them.
            </p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Today, we serve clients across various industries, from startups
              to established enterprises, providing them with the technical
              foundation they need to thrive in an increasingly digital world.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Our team collaborating"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-10 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg shadow-md border border-border-light dark:border-border-dark">
            <div className="w-16 h-16 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-light dark:text-primary-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4 text-center">
              Integrity
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-center">
              We believe in transparent communication and honest business
              practices. Our recommendations are always based on what's best for
              our clients, not our bottom line.
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg shadow-md border border-border-light dark:border-border-dark">
            <div className="w-16 h-16 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-light dark:text-primary-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4 text-center">
              Innovation
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-center">
              Technology never stands still, and neither do we. We continuously
              explore emerging technologies to provide our clients with
              cutting-edge solutions that drive growth.
            </p>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-lg shadow-md border border-border-light dark:border-border-dark">
            <div className="w-16 h-16 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-light dark:text-primary-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4 text-center">
              Client Partnership
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-center">
              We don't just provide services; we build lasting relationships. We
              see ourselves as an extension of your team, committed to your
              long-term success and growth.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-10 text-center">
          Our Leadership Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "CEO & Founder",
              image:
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              bio: "With over 15 years of experience in IT consulting, Alex founded Dern-Company with a vision to make enterprise-level IT support accessible to businesses of all sizes.",
            },
            {
              name: "Sarah Chen",
              role: "CTO",
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
              bio: "Sarah leads our technical strategy and innovation initiatives. Her background in software development and cloud architecture helps shape our service offerings.",
            },
            {
              name: "Michael Rodriguez",
              role: "Customer Success Director",
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
              bio: "Michael ensures that every client receives exceptional service. He oversees our support team and continuously improves our service delivery processes.",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden border border-border-light dark:border-border-dark"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-light dark:text-primary-dark mb-4">
                  {member.role}
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-surface-light dark:bg-surface-dark rounded-xl p-10 shadow-md border border-border-light dark:border-border-dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Clients Served" },
            { value: "50+", label: "Team Members" },
            { value: "8+", label: "Years in Business" },
            { value: "99.9%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-bold text-primary-light dark:text-primary-dark mb-2">
                {stat.value}
              </p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
