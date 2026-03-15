import { useState } from 'react';
import styles from './Step1.module.css';

export default function AddressList({ addresses, onSelect }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (address) => {
    setSelectedId(address.id);
    onSelect(address);
  };

  return (
    <div className={styles.addressList} data-testid="address-list">
      <p className={styles.addressCount}>
        {addresses.length} address{addresses.length !== 1 ? 'es' : ''} found
      </p>
      <div className={styles.addressScroll}>
        {addresses.map((addr) => (
          <button
            key={addr.id}
            className={`${styles.addressOption} ${selectedId === addr.id ? styles.addressSelected : ''}`}
            data-testid={`address-option-${addr.id}`}
            onClick={() => handleSelect(addr)}
          >
            <span className={styles.addressLine}>{addr.line1}</span>
            <span className={styles.addressCity}>{addr.city}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
