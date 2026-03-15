// Placeholder — implementation in Session 2
export default function Stepper({ currentStep = 1 }) {
  return (
    <nav className="stepper" data-testid="stepper" aria-label="Booking progress">
      {[1, 2, 3, 4].map((step) => (
        <span key={step} data-testid={`stepper-step-${step}`}>
          Step {step}
        </span>
      ))}
    </nav>
  );
}
