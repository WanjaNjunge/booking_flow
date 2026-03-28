import { formatCurrency } from '../../utils/formatCurrency';
import styles from './Step3.module.css';

export default function SkipCard({ skip, isSelected, onSelect }) {
  const { size, price, disabled } = skip;

  const ariaLabel = disabled
    ? `${size} skip — not available for heavy waste`
    : `Select ${size} skip, £${price}`;

  return (
    <button
      className={`${styles.card} ${disabled ? styles.cardDisabled : ''} ${isSelected ? styles.cardSelected : ''}`}
      data-testid={disabled ? `skip-card-${size}-disabled` : `skip-card-${size}`}
      onClick={() => !disabled && onSelect(skip)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className={styles.cardSize}>{size}</span>
      <span className={styles.cardPrice}>{formatCurrency(price)}</span>
      <span className={styles.cardLabel}>Per hire</span>
      {disabled && (
        <span className={styles.cardTooltip}>Not available for heavy waste</span>
      )}
      {isSelected && !disabled && (
        <span className={styles.cardCheck} data-testid={`skip-selected-${size}`}>✓</span>
      )}
    </button>
  );
}
