import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or auth data if stored
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-500 to-yellow-500 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome to Your Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-pink-500 font-semibold px-4 py-2 rounded hover:bg-pink-100"
        >
          Logout
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-700">Here you can manage your skills, requests, and profile.</p>
      </div>
    </div>
  );
};

export default Dashboard;