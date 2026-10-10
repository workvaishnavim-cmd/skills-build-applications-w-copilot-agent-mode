import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

function Workouts() {
  const { records, loading, error } = useCollection(
    '/api/workouts/',
    fetch,
  )

  return (
    <CollectionPage
      columns={[
        { heading: 'Workout', render: (workout) => workout.name ?? 'Unnamed workout' },
        { heading: 'Activity', render: (workout) => workout.activityType ?? '—' },
        { heading: 'Difficulty', render: (workout) => workout.difficulty ?? '—' },
        {
          heading: 'Duration',
          render: (workout) =>
            workout.durationMinutes != null ? `${workout.durationMinutes} min` : '—',
        },
        { heading: 'About', render: (workout) => workout.description ?? '—' },
      ]}
      description="Explore suggested workouts and their training focus."
      error={error}
      loading={loading}
      records={records}
      title="Workouts"
    />
  )
}

export default Workouts
