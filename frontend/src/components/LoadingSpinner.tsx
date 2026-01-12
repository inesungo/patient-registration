import './LoadingSpinner.css';

export function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading patients...</p>
    </div>
  );
}