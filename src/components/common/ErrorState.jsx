export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-state" data-testid="error-state" role="alert">
      <div className="error-icon" aria-hidden="true">⚠</div>
      <p data-testid="error-message">{message}</p>
      {onRetry && (
        <button
          className="btn btn-primary"
          data-testid="retry-button"
          onClick={onRetry}
        >
          Try again
        </button>
      )}
    </div>
  );
}
