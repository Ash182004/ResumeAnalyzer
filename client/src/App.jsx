// client/src/App.jsx
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './utils/auth'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import {AppRoutes} from './AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App