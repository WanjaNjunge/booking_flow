import { formatCurrency } from '../../utils/formatCurrency';
import styles from './Step4.module.css';

export default function PriceBreakdown({ price }) {
  const base = price;
  const vat = price * 0.2;
  const total = price * 1.2;

  return (
    <div className={styles.priceSection} data-testid="price-breakdown">
      <h3 className={styles.sectionTitle}>💷 Price Breakdown</h3>
      <div className={styles.priceRows}>
        <div className={styles.priceRow}>
          <span>Base skip price</span>
          <span data-testid="price-base">{formatCurrency(base)}</span>
        </div>
        <div className={styles.priceRow}>
          <span>VAT (20%)</span>
          <span data-testid="price-vat">{formatCurrency(vat)}</span>
        </div>
        <div className={`${styles.priceRow} ${styles.priceTotal}`}>
          <span>Total</span>
          <span data-testid="price-total">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
