import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    gender: '',
    height: '',
    weight: '',
    bicepSize: '',
    chestSize: '',
    waistSize: '',
  });

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
      <Link to="/" className="text-purple-500 hover:text-purple-400 flex items-center mb-6">
        <ArrowLeft className="mr-2" />
        Back to Workouts
      </Link>
      <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-600 focus:ring-0 text-white"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-300">Gender</label>
          <select
            id="gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-600 focus:ring-0 text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-300">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={profile.height}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-600 focus:ring-0 text-white"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-300">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-600 focus:ring-0 text-white"
          />
        </div>
        <div>
          <label htmlFor="bicepSize" className="block text-sm font-medium text-gray-300">Bicep Size (cm)</label>
          <input
            type="number"
            id="bicepSize"
            name="bicepSize"
            value={profile.bicepSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-600 focus:ring-0 text-white"
          />
        </div>
        <div>
          <label htmlFor="chestSize" className="block text-sm font-medium text-gray-300">Chest Size (cm)</label>
          <input
            type="number"
            id="chestSize"
            name="chestSize"
            value={profile.chestSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-600 focus:ring-0 text-white"
          />
        </div>
        <div>
          <label htmlFor="waistSize" className="block text-sm font-medium text-gray-300">Waist Size (cm)</label>
          <input
            type="number"
            id="waistSize"
            name="waistSize"
            value={profile.waistSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-purple-500 focus:bg-gray-600 focus:ring-0 text-white"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;