import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import { Leaf, Building2, ArrowRight, Sprout, Factory } from 'lucide-react';
import farmer2 from '../assets/farmer2.png';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  const verifyFarmer = async () => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://knowcode-protobuf-backend-k16r.vercel.app/api/v1/users/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth0Id: user.sub.split('|')[1] }),
      });

      const data = await response.json();
      
      if (data.data.exists === true) {
        navigate('/farmerDashboard');
      } else {
        navigate('/farmer-registration', { state: { selectedRole: 'farmer' } });
      }
    } catch (error) {
      console.error('Verification failed:', error);
      navigate('/farmer-registration', { state: { selectedRole: 'farmer' } });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    if (role === 'farmer') {
      await verifyFarmer();
    } else if (role === 'buyer') {
      navigate('/marketplace');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-400/10 backdrop-blur-3xl"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-5xl"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            Welcome to Greenify
          </span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Choose Your Role
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our ecosystem and be part of the agricultural waste management revolution
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 px-4">
          {/* Farmer Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`group cursor-pointer rounded-2xl backdrop-blur-sm ${
              selectedRole === 'farmer'
                ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-500 shadow-lg shadow-green-500/20'
                : 'bg-white/80 border border-green-100 hover:border-green-300'
            } p-8 transition-all duration-300`}
            onClick={() => handleRoleSelect('farmer')}
          >
            <div className="flex flex-col items-center space-y-6">
              <motion.div 
                className="relative"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-2xl" />
                <Sprout className="w-20 h-20 text-green-600" />
              </motion.div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Farmer</h2>
                <p className="text-gray-600">List and manage your agricultural waste</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-green-600 text-white group-hover:bg-green-700 transition-colors"
              >
                Select Role <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Buyer Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`group cursor-pointer rounded-2xl backdrop-blur-sm ${
              selectedRole === 'buyer'
                ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-white/80 border border-blue-100 hover:border-blue-300'
            } p-8 transition-all duration-300`}
            onClick={() => handleRoleSelect('buyer')}
          >
            <div className="flex flex-col items-center space-y-6">
              <motion.div 
                className="relative"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-2xl" />
                <Factory className="w-20 h-20 text-blue-600" />
              </motion.div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Business</h2>
                <p className="text-gray-600">Purchase and process agricultural waste</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 text-white group-hover:bg-blue-700 transition-colors"
              >
                Select Role <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;
