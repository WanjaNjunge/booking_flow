export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="loading-state" data-testid="loading-state" role="status">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
