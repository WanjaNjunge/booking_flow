import { useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { getAvailableDates } from '../../utils/deliveryDates';
import styles from './Step4.module.css';

export default function DeliveryDatePicker({ onValidChange }) {
  const { booking, setDeliveryDate } = useBooking();
  const dates = getAvailableDates(new Date());
  const minDate = dates[0] ?? '';
  const maxDate = dates[dates.length - 1] ?? '';

  const handleChange = (e) => {
    setDeliveryDate(e.target.value || null);
  };

  useEffect(() => {
    onValidChange?.(!!booking.deliveryDate);
  }, [booking.deliveryDate, onValidChange]);

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>📅 Delivery Date</h3>
      <label htmlFor="delivery-date" className={styles.label}>
        Select a delivery date <span aria-hidden="true">*</span>
      </label>
      <input
        id="delivery-date"
        type="date"
        data-testid="delivery-date-input"
        value={booking.deliveryDate || ''}
        onChange={handleChange}
        min={minDate}
        max={maxDate}
        className={`${styles.input} ${!booking.deliveryDate ? '' : ''}`}
        aria-required="true"
      />
      {!booking.deliveryDate && (
        <p className={styles.fieldHint} data-testid="delivery-date-error">
          Please select a delivery date (Monday–Friday, next 14 days)
        </p>
      )}
    </div>
  );
}
