export default function Home() {
  return (
    <main className="bg-gray-950 text-white min-h-screen">
      <nav className="flex justify-between items-center py-4 px-8 bg-black">
        <h1 className="text-2xl font-bold">Warhamster 4K</h1>
        <ul className="flex space-x-6">
          <li><a href="#">Homepage</a></li>
          <li><a href="#">dApp</a></li>
          <li><a href="#">Tutorials</a></li>
          <li><a href="#">Social Media</a></li>
        </ul>
      </nav>

      <header className="text-center py-16">
        <h2 className="text-4xl font-bold mb-4">Welcome to Warhamster 4K</h2>
        <p className="text-xl">Battle, trade NFTs, and conquer the Warhamster universe.</p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 text-center">
        <div className="bg-gray-900 p-4 rounded-xl shadow">
          <h3 className="font-semibold">WAR4K Price</h3>
          <p className="text-green-400">$0.01</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl shadow">
          <h3 className="font-semibold">Dead Warhamsters</h3>
          <p className="text-red-400">1,250</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl shadow">
          <h3 className="font-semibold">Daily Reward Pot</h3>
          <p className="text-yellow-400">5000 WAR4K</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl shadow">
          <h3 className="font-semibold">Worlds Available</h3>
          <p className="text-blue-400">34</p>
        </div>
      </section>

      <div className="text-center py-8">
        <a href="/dapp"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
          Launch dApp
        </a>
      </div>

      <footer className="mt-8 py-6 text-center bg-black">
        <p>© {new Date().getFullYear()} Warhamster 4K. All rights reserved.</p>
      </footer>
    </main>
  );
}
