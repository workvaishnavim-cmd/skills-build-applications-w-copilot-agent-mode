import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

function Teams() {
  const { records, loading, error } = useCollection(
    '/api/teams/',
    fetch,
  )

  return (
    <CollectionPage
      columns={[
        { heading: 'Team', render: (team) => team.name ?? 'Unnamed team' },
        { heading: 'Description', render: (team) => team.description ?? '—' },
        {
          heading: 'Members',
          render: (team) =>
            Array.isArray(team.members)
              ? team.members
                  .map((member) => (typeof member === 'string' ? member : member.name))
                  .filter(Boolean)
                  .join(', ') || 'No members'
              : 'No members',
        },
        { heading: 'Points', render: (team) => team.points ?? 0 },
      ]}
      description="Find a team, meet its members, and track team points."
      error={error}
      loading={loading}
      records={records}
      title="Teams"
    />
  )
}

export default Teams
