import styles from './Stepper.module.css';

const STEPS = [
  { number: 1, label: 'Postcode' },
  { number: 2, label: 'Waste Type' },
  { number: 3, label: 'Skip' },
  { number: 4, label: 'Review' },
];

export default function Stepper({ currentStep = 1, onStepClick }) {
  return (
    <nav className={styles.stepper} data-testid="stepper" aria-label="Booking progress">
      {STEPS.map((step) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isClickable = isCompleted && typeof onStepClick === 'function';

        let className = styles.step;
        if (isActive) className += ` ${styles.active}`;
        if (isCompleted) className += ` ${styles.completed}`;
        if (isClickable) className += ` ${styles.clickable}`;

        const indicator = (
          <span className={styles.indicator}>
            {isCompleted ? '✓' : step.number}
          </span>
        );

        if (isClickable) {
          return (
            <button
              key={step.number}
              className={className}
              data-testid={`stepper-step-${step.number}`}
              aria-label={`Go to step ${step.number}: ${step.label}`}
              onClick={() => onStepClick(step.number)}
            >
              {indicator}
              <span className={styles.label}>{step.label}</span>
            </button>
          );
        }

        return (
          <div
            key={step.number}
            className={className}
            data-testid={`stepper-step-${step.number}`}
            aria-current={isActive ? 'step' : undefined}
          >
            {indicator}
            <span className={styles.label}>{step.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
