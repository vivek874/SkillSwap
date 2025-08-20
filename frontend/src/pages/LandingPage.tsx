import { Link } from 'react-router-dom';
import hero from '../assets/hero.png';

const LandingPage = () => {
  return (
    
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400">
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow font-sans" >
          {/* Navbar */}
          <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-500 text-transparent bg-clip-text">SkillSwap</h1>
              <div className="space-x-4">
                <Link to="/login" className="text-gray-700 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition">Login</Link>
                <button className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition">Sign Up</button>
              </div>
            </div>
          </nav>
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center justify-between px-10 py-24 bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400 text-white">
            <div className="max-w-xl mb-10 md:mb-0">
              <h2 className="text-5xl font-extrabold leading-tight mb-6">
                Swap Skills,<br />
                <span className="text-blue-500">Grow Together</span>
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Connect with learners and teachers worldwide. Trade your expertise, earn credits, and master new skills in our vibrant community.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-lg shadow-lg">
                  Start Swapping →
                </button>
                <button className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full text-lg shadow-lg">
                  Watch Demo
                </button>
              </div>
              <div className="flex mt-12 space-x-10">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm mt-1 text-white/80">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm mt-1 text-white/80">Skills Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm mt-1 text-white/80">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative max-w-xl">
              <img src={hero} alt="Skill swapping illustration" className="rounded-3xl shadow-2xl" />
           
            </div>
          </section>
          {/* Footer */}
          <footer className="text-center py-6 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;