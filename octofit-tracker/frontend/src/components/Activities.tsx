import { useEffect, useState } from 'react'
import { fetchResource } from '../config/api'

interface Activity {
  _id: string
  user: { _id: string; name: string }
  workout: { _id: string; title: string; category: string }
  date: string
  durationMin: number
  distanceKm: number
  caloriesBurned: number
  notes: string
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResource<Activity>('/activities')
      .then(setActivities)
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading activities…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
          {activities.map(activity => (
            <div key={activity._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
              <h3>{activity.workout.title}</h3>
              <p><strong>User:</strong> {activity.user.name}</p>
              <p><strong>Category:</strong> {activity.workout.category}</p>
              <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {activity.durationMin} min</p>
              <p><strong>Distance:</strong> {activity.distanceKm} km</p>
              <p><strong>Calories:</strong> {activity.caloriesBurned} kcal</p>
              {activity.notes && <p><strong>Notes:</strong> {activity.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
