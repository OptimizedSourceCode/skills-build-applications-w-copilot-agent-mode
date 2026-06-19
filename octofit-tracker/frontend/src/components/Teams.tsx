import { useEffect, useState } from 'react'
import { fetchResource } from '../config/api'

interface Team {
  _id: string
  name: string
  description: string
  membersCount: number
  totalPoints: number
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResource<Team>('/teams')
      .then(setTeams)
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading teams…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {teams.map(team => (
            <div key={team._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <p><strong>Members:</strong> {team.membersCount}</p>
              <p><strong>Total Points:</strong> {team.totalPoints}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
