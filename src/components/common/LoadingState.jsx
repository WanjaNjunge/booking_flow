// Placeholder — implementation in Session 2
export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="loading-state" data-testid="loading-state" role="status">
      <p>{message}</p>
    </div>
  );
}
