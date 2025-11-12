import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostGig from './pages/PostGig'
import MyGigs from './pages/MyGigs'
import WalletConnect from './pages/WalletConnect'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post-gig" element={<PostGig />} />
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/wallet" element={<WalletConnect />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App
