import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import { Header, ProtectedRoute } from './components';
import { HomePage, AuthPage, Logout, PrivatePage, TeamHistory, SeasonLogPage, RosterPage, AdminToolsPage, AllPlayersPage, PlayerPage, PageNotFound } from './pages/'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <div className="container pt-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roster" element={<RosterPage />} />
            <Route path="/teamhistory" element={<TeamHistory />} />
            <Route path="/seasonlog" element={<SeasonLogPage />} />
            <Route path="/player/allplayers" element={<AllPlayersPage />} />
            <Route path="/player/:playerid" element={<PlayerPage />} />

            <Route path="/auth" element={<AuthPage />} />

            {/* <Route path="/private" element={
              <ProtectedRoute>
                <PrivatePage />
              </ProtectedRoute>
            } /> */}

            <Route path='/admintools' element={
              <ProtectedRoute>
                <AdminToolsPage />
              </ProtectedRoute>
            } />

            <Route path="/logout" element={<Logout />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
