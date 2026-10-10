import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

function Leaderboard() {
  const { records, loading, error } = useCollection(
    '/api/leaderboard/',
    fetch,
  )

  const rankedRecords = records.map((record, index) => ({ ...record, rank: index + 1 }))

  return (
    <CollectionPage
      columns={[
        { heading: 'Rank', render: (entry) => entry.rank },
        { heading: 'Athlete', render: (entry) => entry.user?.name ?? 'Unknown athlete' },
        { heading: 'Team', render: (entry) => entry.team?.name ?? 'Unassigned' },
        { heading: 'Points', render: (entry) => entry.points ?? 0 },
      ]}
      description="See how athletes compare by points earned."
      error={error}
      loading={loading}
      records={rankedRecords}
      title="Leaderboard"
    />
  )
}

export default Leaderboard
