import { useEffect, useState } from 'react'
import { fetchResource } from '../config/api'

interface LeaderboardEntry {
  rank: number
  entityId: string
  name: string
  points: number
  type: 'user' | 'team'
}

interface LeaderboardData {
  _id: string
  category: string
  entries: LeaderboardEntry[]
  generatedAt: string
}

export default function Leaderboard() {
  const [leaderboards, setLeaderboards] = useState<LeaderboardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResource<LeaderboardData>('/leaderboard')
      .then(setLeaderboards)
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading leaderboard…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboards.length === 0 ? (
        <p>No leaderboard data found</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
          {leaderboards.map(board => (
            <div key={board._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
              <h3>{board.category.charAt(0).toUpperCase() + board.category.slice(1)} Leaderboard</h3>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Generated: {new Date(board.generatedAt).toLocaleDateString()}</p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Rank</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Type</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {board.entries.map(entry => (
                    <tr key={entry.entityId} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.5rem' }}><strong>#{entry.rank}</strong></td>
                      <td style={{ padding: '0.5rem' }}>{entry.name}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <span style={{ 
                          backgroundColor: entry.type === 'user' ? '#e3f2fd' : '#fff3e0',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }}>
                          {entry.type}
                        </span>
                      </td>
                      <td style={{ padding: '0.5rem', textAlign: 'right' }}>{entry.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
