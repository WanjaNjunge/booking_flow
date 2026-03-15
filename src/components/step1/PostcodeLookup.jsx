import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import useApi from '../../hooks/useApi';
import { isValidPostcode, normalizePostcode } from '../../utils/postcodeValidator';
import AddressList from './AddressList';
import ManualAddress from './ManualAddress';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import styles from './Step1.module.css';

export default function PostcodeLookup() {
  const navigate = useNavigate();
  const { setPostcode, setAddress } = useBooking();
  const { data, loading, error, execute, retry } = useApi();
  const [input, setInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();

    if (!isValidPostcode(trimmed)) {
      setValidationError('Please enter a valid UK postcode');
      return;
    }

    setValidationError('');
    const normalized = normalizePostcode(trimmed);
    setPostcode(normalized);
    setSearched(true);
    setShowManual(false);

    const result = await execute('/api/postcode/lookup', {
      method: 'POST',
      body: { postcode: normalized },
    });

    if (result && result.addresses?.length === 0) {
      setShowManual(true);
    }
  };

  const handleBlur = () => {
    if (input.trim() && !isValidPostcode(input.trim())) {
      setValidationError('Please enter a valid UK postcode');
    } else {
      setValidationError('');
    }
  };

  const handleAddressSelect = (address) => {
    setAddress(address);
    navigate('/step/2');
  };

  const handleManualSubmit = (manualAddress) => {
    setAddress(manualAddress);
    navigate('/step/2');
  };

  const addresses = data?.addresses || [];
  const hasAddresses = searched && addresses.length > 0;
  const isEmpty = searched && !loading && !error && addresses.length === 0;

  return (
    <div className={styles.container} data-testid="postcode-lookup">
      <h2 className={styles.title}>Find your address</h2>
      <p className={styles.subtitle}>Enter your postcode to look up your address</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputRow}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={handleBlur}
            placeholder="e.g. SW1A 1AA"
            className={`${styles.input} ${validationError ? styles.inputError : ''}`}
            data-testid="postcode-input"
            aria-label="UK Postcode"
            autoComplete="postal-code"
          />
          <Button
            type="submit"
            data-testid="postcode-submit"
            loading={loading}
            disabled={!input.trim()}
          >
            Find Address
          </Button>
        </div>
        {validationError && (
          <p className={styles.error} data-testid="postcode-error" role="alert">
            {validationError}
          </p>
        )}
      </form>

      {loading && <LoadingState message="Looking up addresses..." />}

      {error && <ErrorState message={error} onRetry={retry} />}

      {isEmpty && !showManual && (
        <EmptyState message="No addresses found for this postcode.">
          <button
            className={styles.manualLink}
            data-testid="manual-entry-toggle"
            onClick={() => setShowManual(true)}
          >
            Enter address manually
          </button>
        </EmptyState>
      )}

      {isEmpty && showManual && (
        <ManualAddress onSubmit={handleManualSubmit} />
      )}

      {hasAddresses && (
        <>
          <AddressList
            addresses={addresses}
            onSelect={handleAddressSelect}
          />
          {!showManual && (
            <button
              className={styles.manualLink}
              data-testid="manual-entry-toggle"
              onClick={() => setShowManual(true)}
            >
              Enter address manually instead
            </button>
          )}
          {showManual && (
            <ManualAddress onSubmit={handleManualSubmit} />
          )}
        </>
      )}
    </div>
  );
}
