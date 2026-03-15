import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import PriceBreakdown from './PriceBreakdown';
import ConfirmButton from './ConfirmButton';
import styles from './Step4.module.css';

const WASTE_LABELS = {
  general: 'General Waste',
  heavy: 'Heavy Waste',
  plasterboard: 'Plasterboard',
};

export default function ReviewSummary() {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [confirmed, setConfirmed] = useState(false);

  if (!booking.postcode || !booking.selectedSkip) {
    navigate('/step/1');
    return null;
  }

  if (confirmed && booking.bookingId) {
    return (
      <div className={styles.success} data-testid="booking-success">
        <div className={styles.successIcon}>✅</div>
        <h2>Booking Confirmed!</h2>
        <p className={styles.bookingIdLabel}>Your booking reference:</p>
        <p className={styles.bookingId} data-testid="booking-id">
          {booking.bookingId}
        </p>
        <p className={styles.successNote}>
          We'll be in touch soon to arrange delivery of your skip.
        </p>
      </div>
    );
  }

  const address = booking.address;

  return (
    <div className={styles.container} data-testid="review-summary">
      <h2 className={styles.title}>Review your booking</h2>
      <p className={styles.subtitle}>Please check everything looks correct before confirming</p>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>📍 Delivery Address</h3>
          <p data-testid="review-postcode"><strong>Postcode:</strong> {booking.postcode}</p>
          <p data-testid="review-address">
            {address?.line1}
            {address?.line2 && `, ${address.line2}`}
            {address?.city && `, ${address.city}`}
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>♻️ Waste Type</h3>
          <p data-testid="review-waste-type">
            {WASTE_LABELS[booking.wasteType] || booking.wasteType}
          </p>
          {booking.plasterboardOption && (
            <p data-testid="review-plasterboard-option" className={styles.detail}>
              Handling: {booking.plasterboardOption}
            </p>
          )}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>📦 Skip Size</h3>
          <p data-testid="review-skip-size">{booking.selectedSkip.size}</p>
        </div>

        <PriceBreakdown price={booking.selectedSkip.price} />
      </div>

      <div className={styles.actions}>
        <button
          className="btn btn-secondary"
          data-testid="step4-back"
          onClick={() => navigate('/step/3')}
        >
          Back
        </button>
        <ConfirmButton onConfirmed={() => setConfirmed(true)} />
      </div>
    </div>
  );
}
