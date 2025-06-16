import AdminPannelNavbar from '../components/AdminPannelNavbar';
import AdminHeroSection from '../components/AdminHeroSection';
import AdminDashboardAnalyse from '../components/AdminDashboardAnalyse';

const Home = () => {
  return(
    <>
    {<AdminPannelNavbar />}
    {<AdminHeroSection />}
    {<AdminDashboardAnalyse />}
    </>
  );
};

export default Home;