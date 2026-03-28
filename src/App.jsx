import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Stepper from './components/common/Stepper';
import PostcodeLookup from './components/step1/PostcodeLookup';
import WasteTypeSelector from './components/step2/WasteTypeSelector';
import SkipSelector from './components/step3/SkipSelector';
import ReviewSummary from './components/step4/ReviewSummary';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const match = location.pathname.match(/\/step\/(\d)/);
  const currentStep = match ? parseInt(match[1], 10) : 1;

  const handleStepClick = (n) => {
    if (n < currentStep) navigate(`/step/${n}`);
  };

  return (
    <div className="app" data-testid="app">
      <header className="app-header">
        <h1>Skip Hire Booking</h1>
      </header>
      <main className="app-main">
        <Stepper currentStep={currentStep} onStepClick={handleStepClick} />
        <Routes>
          <Route path="/" element={<Navigate to="/step/1" replace />} />
          <Route path="/step/1" element={<PostcodeLookup />} />
          <Route path="/step/2" element={<WasteTypeSelector />} />
          <Route path="/step/3" element={<SkipSelector />} />
          <Route path="/step/4" element={<ReviewSummary />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
