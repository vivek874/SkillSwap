import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavbar from "../components/Dashboard/TopNavbar";
import SearchBar from "../components/Dashboard/Search";
import ProfileCard from "../components/Dashboard/ProfileCard";
import SkillRequests from "../components/Dashboard/SkillRequests";
import ReviewsSection from "../components/Dashboard/ReviewsSection";
import SkillsSection from "../components/Dashboard/SkillsSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    description: "",
    editing: false,
  });
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/my-profile/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400">
      <TopNavbar onLogout={handleLogout} />
      <SearchBar />

      <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-1">
          <ProfileCard
            profile={profile}
            setProfile={setProfile}
            username={username}
          />
        </section>

        <section className="md:col-span-2 flex flex-col space-y-8">
          <SkillRequests />
          <ReviewsSection />
        </section>

        <section className="md:col-span-1 flex flex-col">
          <SkillsSection />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
