import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { API_BASE_URL, getApiStatus } from './config/api'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function Home() {
  const [apiStatus, setApiStatus] = useState<any>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    getApiStatus()
      .then(data => setApiStatus(data))
      .catch(err => setApiError(String(err)))
  }, [])

  return (
    <section id="center">
      <div>
        <h1>OctoFit Tracker</h1>
        <p>Fitness tracking and team leaderboards</p>
        <div className="api-status">
          <strong>API Base URL:</strong> <code>{API_BASE_URL}</code>
          <div>
            <strong>Status:</strong>{' '}
            {apiStatus ? <span>✓ {apiStatus.status}</span> : apiError ? <span>✗ {apiError}</span> : <span>Loading…</span>}
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div>
      <nav style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/users" style={{ marginRight: '1rem' }}>Users</Link>
        <Link to="/teams" style={{ marginRight: '1rem' }}>Teams</Link>
        <Link to="/activities" style={{ marginRight: '1rem' }}>Activities</Link>
        <Link to="/workouts" style={{ marginRight: '1rem' }}>Workouts</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
      
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
