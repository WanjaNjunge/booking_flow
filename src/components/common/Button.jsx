// Placeholder — implementation in Session 2
export default function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn btn-${variant}`} data-testid={props['data-testid']} {...props}>
      {children}
    </button>
  );
}
