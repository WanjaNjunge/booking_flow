import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import useApi from '../../hooks/useApi';
import PlasterboardOptions from './PlasterboardOptions';
import Button from '../common/Button';
import styles from './Step2.module.css';

const WASTE_TYPES = [
  {
    key: 'general',
    label: 'General Waste',
    subtitle: 'Standard household and light commercial waste',
    icon: '🗑️',
  },
  {
    key: 'heavy',
    label: 'Heavy Waste',
    subtitle: 'Soil, rubble, concrete, tiles',
    icon: '🪨',
  },
  {
    key: 'plasterboard',
    label: 'Plasterboard',
    subtitle: 'Plasterboard sheets and off-cuts',
    icon: '🧱',
  },
];

export default function WasteTypeSelector() {
  const navigate = useNavigate();
  const { booking, setWasteType, setPlasterboardOption } = useBooking();
  const { execute, loading } = useApi();
  const [selected, setSelected] = useState(booking.wasteType);
  const [plasterboardChoice, setPlasterboardChoice] = useState(booking.plasterboardOption);
  const [error, setError] = useState('');

  const handleSelect = (key) => {
    setSelected(key);
    setError('');
  };

  const handleContinue = async () => {
    if (!selected) {
      setError('Please select a waste type');
      return;
    }

    if (selected === 'plasterboard' && !plasterboardChoice) {
      setError('Please select a plasterboard handling option');
      return;
    }

    const isHeavy = selected === 'heavy';
    const isPlasterboard = selected === 'plasterboard';

    setWasteType(selected);
    setPlasterboardOption(isPlasterboard ? plasterboardChoice : null);

    await execute('/api/waste-types', {
      method: 'POST',
      body: {
        heavyWaste: isHeavy,
        plasterboard: isPlasterboard,
        plasterboardOption: isPlasterboard ? plasterboardChoice : null,
      },
    });

    navigate('/step/3');
  };

  return (
    <div className={styles.container} data-testid="waste-type-selector">
      <h2 className={styles.title}>What type of waste?</h2>
      <p className={styles.subtitle}>Select the type of waste you need to dispose of</p>

      <div className={styles.cards}>
        {WASTE_TYPES.map((type) => (
          <button
            key={type.key}
            className={`${styles.card} ${selected === type.key ? styles.cardActive : ''}`}
            data-testid={`waste-type-${type.key}`}
            onClick={() => handleSelect(type.key)}
          >
            <span className={styles.cardIcon}>{type.icon}</span>
            <span className={styles.cardLabel}>{type.label}</span>
            <span className={styles.cardSubtitle}>{type.subtitle}</span>
          </button>
        ))}
      </div>

      {selected === 'plasterboard' && (
        <PlasterboardOptions
          selected={plasterboardChoice}
          onSelect={setPlasterboardChoice}
        />
      )}

      {error && (
        <p className={styles.error} data-testid="waste-type-error" role="alert">
          {error}
        </p>
      )}

      <div className={styles.actions}>
        <Button
          variant="secondary"
          data-testid="step2-back"
          onClick={() => navigate('/step/1')}
        >
          Back
        </Button>
        <Button
          data-testid="step2-continue"
          onClick={handleContinue}
          loading={loading}
          disabled={!selected}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
