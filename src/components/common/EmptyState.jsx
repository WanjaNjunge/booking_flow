// Placeholder — implementation in Session 2
export default function EmptyState({ message = 'No results found.' }) {
  return (
    <div className="empty-state" data-testid="empty-state">
      <p>{message}</p>
    </div>
  );
}
