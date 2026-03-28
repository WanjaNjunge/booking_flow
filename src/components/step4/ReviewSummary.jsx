import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import PriceBreakdown from './PriceBreakdown';
import ConfirmButton from './ConfirmButton';
import ContactInfo from './ContactInfo';
import DeliveryDatePicker from './DeliveryDatePicker';
import { formatDeliveryDate } from '../../utils/deliveryDates';
import styles from './Step4.module.css';

const WASTE_LABELS = {
  general: 'General Waste',
  heavy: 'Heavy Waste',
  plasterboard: 'Plasterboard',
};

export default function ReviewSummary() {
  const navigate = useNavigate();
  const { booking, resetBooking } = useBooking();
  const [confirmed, setConfirmed] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleEmailValid = useCallback((valid) => setEmailValid(valid), []);
  const handleDateValid = useCallback((valid) => setDateValid(valid), []);

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
        <button
          className={`btn btn-secondary ${styles.newBookingBtn}`}
          data-testid="start-new-booking"
          onClick={() => {
            resetBooking();
            navigate('/step/1');
          }}
        >
          Start New Booking
        </button>
      </div>
    );
  }

  const address = booking.address;
  const canConfirm = emailValid && dateValid && termsChecked;

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
          {booking.contactEmail && (
            <p data-testid="review-contact-email" className={styles.detail}>
              Email: {booking.contactEmail}
            </p>
          )}
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

        {booking.deliveryDate && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>📅 Delivery Date</h3>
            <p data-testid="review-delivery-date">
              {formatDeliveryDate(booking.deliveryDate)}
            </p>
          </div>
        )}

        <PriceBreakdown price={booking.selectedSkip.price} />
      </div>

      <ContactInfo onValidChange={handleEmailValid} />
      <DeliveryDatePicker onValidChange={handleDateValid} />

      <div className={styles.termsRow}>
        <input
          type="checkbox"
          id="terms-checkbox"
          data-testid="terms-checkbox"
          checked={termsChecked}
          onChange={(e) => setTermsChecked(e.target.checked)}
        />
        <label htmlFor="terms-checkbox">
          I agree to the terms and conditions of hire
        </label>
      </div>

      <div className={styles.actions}>
        <button
          className="btn btn-secondary"
          data-testid="step4-back"
          onClick={() => navigate('/step/3')}
        >
          Back
        </button>
        <ConfirmButton onConfirmed={() => setConfirmed(true)} canConfirm={canConfirm} />
      </div>
    </div>
  );
}
