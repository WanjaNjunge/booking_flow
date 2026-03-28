import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

export default function ConfirmButton({ onConfirmed, canConfirm }) {
  const { booking, setBookingId } = useBooking();
  const [submitting, setSubmitting] = useState(false);
  const [confirmError, setConfirmError] = useState(null);

  // BUG-003 FIX: setSubmitting(true) called BEFORE the fetch
  const handleConfirm = async () => {
    setSubmitting(true);
    setConfirmError(null);

    try {
      const res = await fetch('/api/booking/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postcode: booking.postcode,
          addressId: booking.address?.id,
          heavyWaste: booking.wasteType === 'heavy',
          plasterboard: booking.wasteType === 'plasterboard',
          plasterboardOption: booking.plasterboardOption,
          skipSize: booking.selectedSkip?.size,
          price: booking.selectedSkip?.price,
          contactEmail: booking.contactEmail,
          contactPhone: booking.contactPhone,
          deliveryDate: booking.deliveryDate,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.status !== 'success') {
        setConfirmError('Booking failed. Please try again.');
        setSubmitting(false);
        return;
      }

      setBookingId(data.bookingId);
      onConfirmed?.();
    } catch {
      setConfirmError('Booking failed. Please try again.');
      setSubmitting(false);
    }
  };

  const isDisabled = submitting || !canConfirm;

  return (
    <>
      {confirmError && (
        <p className="error-inline" data-testid="confirm-error">{confirmError}</p>
      )}
      <button
        className={`btn btn-primary ${submitting ? 'btn-loading' : ''}`}
        data-testid="confirm-button"
        onClick={handleConfirm}
        disabled={isDisabled}
      >
        {submitting ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Confirming...
          </>
        ) : (
          'Confirm Booking'
        )}
      </button>
    </>
  );
}
