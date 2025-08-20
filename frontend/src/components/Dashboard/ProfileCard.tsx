interface Profile {
  name: string;
  location: string;
  description: string;
  editing: boolean;
}

interface ProfileProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  username: string;
}

const ProfileCard = ({ profile, setProfile, username }: ProfileProps) => {
  console.log("Username prop:", username);

  const handleProfileEdit = () => setProfile({ ...profile, editing: true });
  const handleProfileSave = () => setProfile({ ...profile, editing: false });
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
      />
      <div className="text-sm text-gray-500 mb-1">@{username || ""}</div>

      {profile.editing ? (
        <>
          <input
            className="border rounded px-2 py-1 w-full mb-2 text-center"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Enter your name"
          />
          <input
            className="border rounded px-2 py-1 w-full mb-2 text-center"
            name="location"
            value={profile.location}
            onChange={handleProfileChange}
            placeholder="Enter your location"
          />
          <textarea
            className="border rounded px-2 py-1 w-full mb-2 text-center"
            name="description"
            value={profile.description}
            onChange={handleProfileChange}
            rows={2}
            placeholder="Write something about yourself"
          />
          <button
            className="bg-pink-500 text-white px-4 py-1 rounded font-semibold hover:bg-pink-600 transition"
            onClick={handleProfileSave}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
          <div className="text-pink-400 text-sm mb-2">{profile.location}</div>
          <div className="text-gray-600 text-center mb-4">
            {profile.description}
          </div>
          <button
            className="bg-blue-100 text-white-500 px-3 py-1 rounded font-medium border border-pink-200 hover:bg-pink-100 transition"
            onClick={handleProfileEdit}
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
