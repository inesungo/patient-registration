import { useEffect } from 'react';
import { Button } from './Button';
import './StatusModal.css';

interface StatusModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message?: string;
  onClose: () => void;
}

export function StatusModal({ isOpen, type, title, message, onClose }: StatusModalProps) {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="status-modal-overlay">
      <div className={`status-modal status-modal-${type}`}>
        <div className={`status-icon status-icon-${type}`}>
          {type === 'success' ? '✓' : '✕'}
        </div>
        
        <h3 className="status-title">{title}</h3>
        
        {message && (
          <p className="status-message">{message}</p>
        )}

        <Button onClick={onClose} variant={type === 'success' ? 'primary' : 'secondary'}>
          Aceptar
        </Button>
      </div>
    </div>
  );
}