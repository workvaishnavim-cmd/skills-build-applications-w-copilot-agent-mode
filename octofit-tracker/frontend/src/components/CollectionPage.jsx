import ResourceTable from './ResourceTable.jsx'

function CollectionPage({ columns, description, error, loading, records, title }) {
  return (
    <>
      <div className="mb-4">
        <h1 className="h2 mb-2">{title}</h1>
        <p className="text-secondary">{description}</p>
      </div>

      {loading && (
        <div className="text-secondary" role="status">
          Loading {title.toLowerCase()}...
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && (
        <ResourceTable columns={columns} records={records} title={title} />
      )}
    </>
  )
}

export default CollectionPage
