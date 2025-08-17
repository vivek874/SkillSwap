import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillSwap</h1>
          <div className="space-x-4">
            <button className="text-gray-700 hover:text-blue-600">Login</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-white">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Learn. Earn. Grow.</h2>
        <p className="text-lg text-gray-600 mb-8">
          Connect with like-minded learners or hire freelancers with the right skills.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;