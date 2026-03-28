import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const BookingContext = createContext(null);

const INITIAL_STATE = {
  postcode: null,
  address: null,
  wasteType: null,
  plasterboardOption: null,
  selectedSkip: null,
  bookingId: null,
  contactEmail: null,
  contactPhone: null,
  deliveryDate: null,
};

function loadFromSession() {
  try {
    const raw = sessionStorage.getItem('bookingState');
    if (raw) return { ...INITIAL_STATE, ...JSON.parse(raw) };
  } catch {
    // ignore parse errors
  }
  return INITIAL_STATE;
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(loadFromSession);

  // Persist to sessionStorage on every state change (F-001)
  useEffect(() => {
    sessionStorage.setItem('bookingState', JSON.stringify(booking));
  }, [booking]);

  const setPostcode = useCallback((postcode) => {
    setBooking((prev) => ({ ...prev, postcode }));
  }, []);

  const setAddress = useCallback((address) => {
    setBooking((prev) => ({ ...prev, address }));
  }, []);

  // BUG-001 FIX: clear plasterboardOption when waste type changes
  const setWasteType = useCallback((wasteType) => {
    setBooking((prev) => ({ ...prev, wasteType, plasterboardOption: null }));
  }, []);

  const setPlasterboardOption = useCallback((plasterboardOption) => {
    setBooking((prev) => ({ ...prev, plasterboardOption }));
  }, []);

  const setSelectedSkip = useCallback((selectedSkip) => {
    setBooking((prev) => ({ ...prev, selectedSkip }));
  }, []);

  const setBookingId = useCallback((bookingId) => {
    setBooking((prev) => ({ ...prev, bookingId }));
  }, []);

  const setContactEmail = useCallback((contactEmail) => {
    setBooking((prev) => ({ ...prev, contactEmail }));
  }, []);

  const setContactPhone = useCallback((contactPhone) => {
    setBooking((prev) => ({ ...prev, contactPhone }));
  }, []);

  const setDeliveryDate = useCallback((deliveryDate) => {
    setBooking((prev) => ({ ...prev, deliveryDate }));
  }, []);

  const resetBooking = useCallback(() => {
    sessionStorage.removeItem('bookingState');
    setBooking(INITIAL_STATE);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        booking,
        setPostcode,
        setAddress,
        setWasteType,
        setPlasterboardOption,
        setSelectedSkip,
        setBookingId,
        setContactEmail,
        setContactPhone,
        setDeliveryDate,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

export default BookingContext;
