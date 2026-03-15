import { useState } from 'react';
import Button from '../common/Button';
import styles from './Step1.module.css';

export default function ManualAddress({ onSubmit }) {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!line1.trim()) newErrors.line1 = 'Address line 1 is required';
    if (!city.trim()) newErrors.city = 'City is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      id: 'manual',
      line1: line1.trim(),
      line2: line2.trim() || undefined,
      city: city.trim(),
    });
  };

  return (
    <form
      className={styles.manualForm}
      data-testid="manual-entry-form"
      onSubmit={handleSubmit}
    >
      <h3 className={styles.manualTitle}>Enter your address</h3>

      <div className={styles.field}>
        <label htmlFor="manual-line1">Address Line 1 *</label>
        <input
          id="manual-line1"
          type="text"
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          data-testid="manual-line1"
          className={errors.line1 ? styles.inputError : ''}
          placeholder="e.g. 10 Downing Street"
        />
        {errors.line1 && <span className={styles.fieldError}>{errors.line1}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="manual-line2">Address Line 2</label>
        <input
          id="manual-line2"
          type="text"
          value={line2}
          onChange={(e) => setLine2(e.target.value)}
          data-testid="manual-line2"
          placeholder="Optional"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="manual-city">City *</label>
        <input
          id="manual-city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          data-testid="manual-city"
          className={errors.city ? styles.inputError : ''}
          placeholder="e.g. London"
        />
        {errors.city && <span className={styles.fieldError}>{errors.city}</span>}
      </div>

      <Button type="submit" data-testid="manual-submit">
        Use this address
      </Button>
    </form>
  );
}
