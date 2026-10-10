function ResourceTable({ columns, records, title }) {
  return (
    <section aria-label={title} className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              {columns.map((column) => (
                <th key={column.heading} scope="col">
                  {column.heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record._id ?? record.id ?? index}>
                {columns.map((column) => (
                  <td key={column.heading}>{column.render(record)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {records.length === 0 && (
        <p className="text-secondary text-center my-3">No {title.toLowerCase()} found.</p>
      )}
    </section>
  )
}

export default ResourceTable
