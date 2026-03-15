import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

const INITIAL_STATE = {
  // Step 1
  postcode: '',
  address: null,       // { id, line1, line2?, city }

  // Step 2
  heavyWaste: false,
  plasterboard: false,
  plasterboardOption: null,  // "Mix with general waste" | "Bag separately" | "Dedicated plasterboard skip"

  // Step 3
  skipSize: null,
  price: null,
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(INITIAL_STATE);

  const updateBooking = (updates) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setBooking(INITIAL_STATE);
  };

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>
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
