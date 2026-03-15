import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import useApi from '../../hooks/useApi';
import { normalizePostcode } from '../../utils/postcodeValidator';
import SkipCard from './SkipCard';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import Button from '../common/Button';
import styles from './Step3.module.css';

export default function SkipSelector() {
  const navigate = useNavigate();
  const { booking, setSelectedSkip } = useBooking();
  const { data, loading, error, execute, retry } = useApi();
  const [selected, setSelected] = useState(booking.selectedSkip?.size || null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!booking.postcode) {
      navigate('/step/1');
      return;
    }
    const normalized = normalizePostcode(booking.postcode);
    const isHeavy = booking.wasteType === 'heavy';
    execute(`/api/skips?postcode=${normalized}&heavyWaste=${isHeavy}`);
  }, []);

  const skips = data?.skips || [];

  const handleSelect = (skip) => {
    if (skip.disabled) return;
    setSelected(skip.size);
    setValidationError('');
  };

  const handleContinue = () => {
    if (!selected) {
      setValidationError('Please select a skip size');
      return;
    }
    const skip = skips.find((s) => s.size === selected);
    setSelectedSkip(skip);
    navigate('/step/4');
  };

  return (
    <div className={styles.container} data-testid="skip-selector">
      <h2 className={styles.title}>Choose your skip size</h2>
      <p className={styles.subtitle}>Select the skip that best fits your needs</p>

      {loading && <LoadingState message="Loading available skips..." />}
      {error && <ErrorState message={error} onRetry={retry} />}

      {!loading && !error && skips.length > 0 && (
        <div className={styles.grid}>
          {skips.map((skip) => (
            <SkipCard
              key={skip.size}
              skip={skip}
              isSelected={selected === skip.size}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {validationError && (
        <p className={styles.error} role="alert">{validationError}</p>
      )}

      <div className={styles.actions}>
        <Button
          variant="secondary"
          data-testid="step3-back"
          onClick={() => navigate('/step/2')}
        >
          Back
        </Button>
        <Button
          data-testid="step3-continue"
          onClick={handleContinue}
          disabled={!selected}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
