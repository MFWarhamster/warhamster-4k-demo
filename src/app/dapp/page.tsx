"use client";
import { useState, useEffect } from 'react';
import PlayerProfile from '@/components/DappUI/Profile/PlayerProfile';
import DEX from '@/components/DappUI/DEX/DEX';
import Marketplace from '@/components/DappUI/Marketplace/Marketplace';
import ArmyBuilder from '@/components/DappUI/ArmyBuilder/ArmyBuilder';
import Battle from '@/components/DappUI/Battle/Battle';

export default function DappMainPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('warhamsterProfile');
    setProfileExists(!!savedProfile);
  }, []);

  const tabs = [
    { name: 'Profile', available: true },
    { name: 'DEX', available: true },
    { name: 'Marketplace', available: true },
    { name: 'Army Builder', available: true }, 
    { name: 'Battle', available: true }, // Set to true
  ];    
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-black text-white">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">Warhamster 4K dApp</h1>
      </header>

      <nav className="flex justify-center gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.name}
            disabled={!tab.available}
            onClick={() => setActiveTab(tab.name)}
            className={`py-2 px-4 rounded-xl ${activeTab === tab.name ? 'bg-indigo-600' : 'bg-gray-800'} 
              ${tab.available ? 'hover:bg-indigo-700' : 'opacity-50 cursor-not-allowed'}`}>
            {tab.name}
          </button>
        ))}
      </nav>

      <section className="container mx-auto bg-gray-900 p-8 rounded-xl shadow-xl">
        {activeTab === 'Profile' && (
          profileExists ? (
            <PlayerProfile />
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Welcome, Commander!</h3>
              <p>Create your profile to unlock full access.</p>
            </div>
          )
        )}

        {activeTab !== 'Profile' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">{activeTab}</h2>
            <p>Connect your wallet and log in to access this feature.</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 py-2 px-4 rounded">
              Connect Wallet
            </button>
          </div>
        )}
        {activeTab === 'DEX' && (
  <DEX />
)}
{activeTab === 'Marketplace' && (
  <Marketplace />
)}
{activeTab === 'Army Builder' && <ArmyBuilder />}
{activeTab === 'Battle' && <Battle />}


      </section>

      <footer className="text-center py-6 mt-8 bg-gray-950">
        <p>© {new Date().getFullYear()} Warhamster 4K. All rights reserved.</p>
      </footer>
    </main>
  );
}
