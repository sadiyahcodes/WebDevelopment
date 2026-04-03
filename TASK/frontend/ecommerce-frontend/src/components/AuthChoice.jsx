import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center font-sans">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C1C1C] mb-2">Welcome</h1>
          <p className="text-[#8B96A5]">Choose how you'd like to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/signup')}
            className="w-full bg-[#0D6EFD] text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 text-lg"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full bg-white text-[#0D6EFD] py-3 px-4 rounded-md font-medium border-2 border-[#0D6EFD] hover:bg-blue-50 transition-colors duration-200 text-lg"
          >
            Login
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#8B96A5] text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthChoice;