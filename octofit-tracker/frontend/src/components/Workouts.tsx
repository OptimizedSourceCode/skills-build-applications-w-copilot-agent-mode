import { useEffect, useState } from 'react'
import { fetchResource } from '../config/api'

interface Workout {
  _id: string
  title: string
  category: string
  durationMin: number
  intensity: string
  description: string
  createdBy?: { _id: string; name: string }
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResource<Workout>('/workouts')
      .then(setWorkouts)
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading workouts…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {workouts.map(workout => (
            <div key={workout._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
              <h3>{workout.title}</h3>
              <p><strong>Category:</strong> {workout.category}</p>
              <p><strong>Duration:</strong> {workout.durationMin} min</p>
              <p><strong>Intensity:</strong> {workout.intensity}</p>
              <p>{workout.description}</p>
              {workout.createdBy && <p><strong>Created by:</strong> {workout.createdBy.name}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
