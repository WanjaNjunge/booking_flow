import styles from './Step2.module.css';

const OPTIONS = [
  { key: 'mix', label: 'Mix with general waste', testId: 'plasterboard-option-mix' },
  { key: 'bag', label: 'Bag separately', testId: 'plasterboard-option-bag' },
  { key: 'dedicated', label: 'Dedicated plasterboard skip', testId: 'plasterboard-option-dedicated' },
];

export default function PlasterboardOptions({ selected, onSelect }) {
  return (
    <div
      className={styles.plasterboardContainer}
      data-testid="plasterboard-options-container"
    >
      <h3 className={styles.plasterboardTitle}>How should we handle the plasterboard?</h3>
      <div className={styles.plasterboardOptions}>
        {OPTIONS.map((opt) => (
          <label
            key={opt.key}
            className={`${styles.radioOption} ${selected === opt.label ? styles.radioActive : ''}`}
            data-testid={opt.testId}
          >
            <input
              type="radio"
              name="plasterboard"
              value={opt.label}
              checked={selected === opt.label}
              onChange={() => onSelect(opt.label)}
              className={styles.radioInput}
            />
            <span className={styles.radioLabel}>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
