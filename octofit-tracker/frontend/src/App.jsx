import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <>
      <header className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/activities">
            Octofit Tracker
          </NavLink>
          <nav aria-label="Main navigation" className="navbar-nav flex-row flex-wrap gap-2">
            {navigation.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-2 ${isActive ? 'active fw-semibold' : ''}`
                }
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route element={<Navigate replace to="/activities" />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route
            element={
              <div className="alert alert-warning" role="alert">
                Page not found. Choose a section from the navigation.
              </div>
            }
            path="*"
          />
        </Routes>
      </main>
    </>
  )
}

export default App
