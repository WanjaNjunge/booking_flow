import { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import styles from './Step4.module.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactInfo({ onValidChange }) {
  const { booking, setContactEmail, setContactPhone } = useBooking();
  const [emailInput, setEmailInput] = useState(booking.contactEmail || '');
  const [phoneInput, setPhoneInput] = useState(booking.contactPhone || '');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value) => {
    if (!value) return 'Email address is required';
    if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const handleEmailBlur = () => {
    const err = validateEmail(emailInput);
    setEmailError(err);
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmailInput(val);
    if (emailError) setEmailError(validateEmail(val));
    if (!validateEmail(val)) {
      setContactEmail(val);
    } else {
      setContactEmail(null);
    }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setPhoneInput(val);
    setContactPhone(val || null);
  };

  useEffect(() => {
    const isValid = !validateEmail(emailInput);
    onValidChange?.(isValid);
  }, [emailInput, onValidChange]);

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>📧 Contact Details</h3>

      <div className={styles.fieldGroup}>
        <label htmlFor="contact-email" className={styles.label}>
          Email address <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          data-testid="contact-email"
          value={emailInput}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          placeholder="you@example.com"
          className={`${styles.input} ${emailError ? styles.inputError : ''}`}
          aria-required="true"
          aria-describedby={emailError ? 'contact-email-error' : undefined}
        />
        {emailError && (
          <p id="contact-email-error" className={styles.fieldError} data-testid="contact-email-error">
            {emailError}
          </p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="contact-phone" className={styles.label}>
          Phone number <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          data-testid="contact-phone"
          value={phoneInput}
          onChange={handlePhoneChange}
          placeholder="e.g. 07700 900000"
          className={styles.input}
        />
      </div>
    </div>
  );
}
