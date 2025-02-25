import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-text-primary-light dark:text-text-primary-dark">
        Your Profile
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
                Profile Information
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Full Name
                  </h3>
                  <p className="text-text-primary-light dark:text-text-primary-dark">
                    {user?.name || "Not provided"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Email Address
                  </h3>
                  <p className="text-text-primary-light dark:text-text-primary-dark">
                    {user?.email || "Not provided"}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                  Account Type
                </h3>
                <p className="text-text-primary-light dark:text-text-primary-dark capitalize">
                  {user?.role || "User"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
