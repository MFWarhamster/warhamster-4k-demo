"use client";
import { useState, useEffect } from 'react';

export default function PlayerProfile() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('warhamsterProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUsername(profile.username);
      setBio(profile.bio);
      setSocialLink(profile.socialLink);
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = { username, bio, socialLink };
    localStorage.setItem('warhamsterProfile', JSON.stringify(profileData));
    setSubmitted(true);
  };

  return (
    <section className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">User Profile</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            required
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          />

          <textarea
            placeholder="Bio (optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          />

          <input
            required
            type="url"
            placeholder="Social Media Profile URL"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="p-2 rounded bg-gray-800 text-white"
          />

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 py-2 rounded">
            Save Profile
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Profile Created!</h3>
          <p className="text-gray-300">Welcome back, {username}!</p>
          {bio && <p className="mt-2">"{bio}"</p>}
          <a href={socialLink} className="text-indigo-400 underline mt-2 inline-block">
            Social Media
          </a>
        </div>
      )}
    </section>
  );
}

