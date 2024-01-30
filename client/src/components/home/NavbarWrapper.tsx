import { useLocation } from 'react-router-dom';
import LandingNavbar from './LandingNavbar';
import Navbar from './Navbar';

const NavbarWrapper = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) return null;
  return isLandingPage ? <LandingNavbar /> : <Navbar />;
};

export default NavbarWrapper;
