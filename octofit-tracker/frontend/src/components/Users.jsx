import { useCollection } from '../hooks/useCollection.js'
import CollectionPage from './CollectionPage.jsx'

function Users() {
  const { records, loading, error } = useCollection(
    '/api/users/',
    fetch,
  )

  return (
    <CollectionPage
      columns={[
        { heading: 'Name', render: (user) => user.name ?? 'Unnamed athlete' },
        { heading: 'Username', render: (user) => user.username ?? '—' },
        { heading: 'Email', render: (user) => user.email ?? '—' },
      ]}
      description="Browse Octofit members and their profiles."
      error={error}
      loading={loading}
      records={records}
      title="Users"
    />
  )
}

export default Users
