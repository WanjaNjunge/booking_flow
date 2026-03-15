// Placeholder — implementation in Session 2
export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-state" data-testid="error-state" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button data-testid="retry-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
