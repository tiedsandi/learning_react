import { useEffect, useState } from 'react';

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   onConfirm();
    // }, 3000);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onConfirm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      // clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes {countdown} seconds
        </button>
      </div>
    </div>
  );
}
