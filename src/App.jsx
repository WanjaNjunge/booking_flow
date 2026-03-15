import { Routes, Route, Navigate } from 'react-router-dom';

/**
 * App shell — layout, stepper, and route definitions.
 * Component logic to be implemented in Session 2.
 */
export default function App() {
  return (
    <div className="app" data-testid="app">
      <header className="app-header">
        <h1>Skip Hire Booking</h1>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/step/1" replace />} />
          <Route path="/step/1" element={<div>Step 1 — Postcode Lookup</div>} />
          <Route path="/step/2" element={<div>Step 2 — Waste Type</div>} />
          <Route path="/step/3" element={<div>Step 3 — Skip Selection</div>} />
          <Route path="/step/4" element={<div>Step 4 — Review & Confirm</div>} />
        </Routes>
      </main>
    </div>
  );
}
