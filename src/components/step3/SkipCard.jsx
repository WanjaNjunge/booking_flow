import { formatCurrency } from '../../utils/formatCurrency';
import styles from './Step3.module.css';

export default function SkipCard({ skip, isSelected, onSelect }) {
  const { size, price, disabled } = skip;

  // BUG-002: disabled prop NOT passed to <button> — only CSS class applied
  // Button remains keyboard-focusable and selectable via Enter/Space
  return (
    <button
      className={`${styles.card} ${disabled ? styles.cardDisabled : ''} ${isSelected ? styles.cardSelected : ''}`}
      data-testid={disabled ? `skip-card-${size}-disabled` : `skip-card-${size}`}
      onClick={() => onSelect(skip)}
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
