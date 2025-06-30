import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './utils/auth';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import { AppRoutes } from './AppRoutes';

function LayoutWrapper() {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/register'];

  const shouldHideNavbar = hideOnRoutes.includes(location.pathname);
  const shouldHideFooter = hideOnRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LayoutWrapper />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
