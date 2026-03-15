import styles from './Stepper.module.css';

const STEPS = [
  { number: 1, label: 'Postcode' },
  { number: 2, label: 'Waste Type' },
  { number: 3, label: 'Skip' },
  { number: 4, label: 'Review' },
];

export default function Stepper({ currentStep = 1 }) {
  return (
    <nav className={styles.stepper} data-testid="stepper" aria-label="Booking progress">
      {STEPS.map((step) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;

        let className = styles.step;
        if (isActive) className += ` ${styles.active}`;
        if (isCompleted) className += ` ${styles.completed}`;

        return (
          <div
            key={step.number}
            className={className}
            data-testid={`step-${step.number}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span className={styles.indicator}>
              {isCompleted ? '✓' : step.number}
            </span>
            <span className={styles.label}>{step.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
