import { createContext, useContext, useState, useCallback } from 'react';

const BookingContext = createContext(null);

const INITIAL_STATE = {
  postcode: null,
  address: null,
  wasteType: null,
  plasterboardOption: null,
  selectedSkip: null,
  bookingId: null,
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(INITIAL_STATE);

  const setPostcode = useCallback((postcode) => {
    setBooking((prev) => ({ ...prev, postcode }));
  }, []);

  const setAddress = useCallback((address) => {
    setBooking((prev) => ({ ...prev, address }));
  }, []);

  // BUG-001: intentionally does NOT clear plasterboardOption when waste type changes
  const setWasteType = useCallback((wasteType) => {
    setBooking((prev) => ({ ...prev, wasteType }));
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

  const resetBooking = useCallback(() => {
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
