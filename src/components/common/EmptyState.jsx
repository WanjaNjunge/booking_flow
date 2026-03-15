export default function EmptyState({ message = 'No results found.', children }) {
  return (
    <div className="empty-state" data-testid="empty-state">
      <div className="empty-icon" aria-hidden="true">📭</div>
      <p>{message}</p>
      {children}
    </div>
  );
}
