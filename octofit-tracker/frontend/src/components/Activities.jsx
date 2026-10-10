import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

function Activities() {
  const { records, loading, error } = useCollection(
    '/api/activities/',
    fetch,
  )

  return (
    <CollectionPage
      columns={[
        { heading: 'Athlete', render: (activity) => activity.user?.name ?? 'Unknown athlete' },
        { heading: 'Activity', render: (activity) => activity.type ?? '—' },
        {
          heading: 'Duration',
          render: (activity) =>
            activity.durationMinutes != null ? `${activity.durationMinutes} min` : '—',
        },
        {
          heading: 'Distance',
          render: (activity) =>
            activity.distanceKm != null ? `${activity.distanceKm} km` : '—',
        },
        {
          heading: 'Date',
          render: (activity) =>
            activity.date ? new Date(activity.date).toLocaleDateString() : '—',
        },
      ]}
      description="Recent workouts and activity logged by the community."
      error={error}
      loading={loading}
      records={records}
      title="Activities"
    />
  )
}

export default Activities
