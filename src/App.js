import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
function App() {
  return (
    <div>
    <Navbar />
    <div className='pt-16'>
    <HeroSection />
    <Features />
    <HowItWorks />
    <Pricing />
    </div>
    </div>
  );
}

export default App;
