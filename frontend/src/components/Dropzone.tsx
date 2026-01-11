import { useCallback, useState } from 'react';
import './Dropzone.css';

interface DropzoneProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export function Dropzone({ onFileSelect, error }: DropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File | null) => {
    if (file) {
      // Validar que sea JPG
      if (!file.type.match(/^image\/jpe?g$/)) {
        alert('Only JPG files are allowed');
        return;
      }
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setFileName(file.name);
      onFileSelect(file);
    } else {
      setPreview(null);
      setFileName(null);
      onFileSelect(null);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleRemove = () => {
    handleFile(null);
  };

  return (
    <div className={`dropzone-wrapper ${error ? 'has-error' : ''}`}>
      <label className="dropzone-label">Document photo</label>
      
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''} ${preview ? 'has-file' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <div className="dropzone-preview">
            <img src={preview} alt="Preview" className="dropzone-image" />
            <div className="dropzone-file-info">
              <span className="dropzone-filename">{fileName}</span>
              <button 
                type="button" 
                className="dropzone-remove" 
                onClick={handleRemove}
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <label className="dropzone-content">
            <input
              type="file"
              accept=".jpg,.jpeg"
              onChange={handleInputChange}
              className="dropzone-input"
            />
            <span className="dropzone-icon">📄</span>
            <span className="dropzone-text">
              Drop your image or <span className="dropzone-link">click here</span>
            </span>
            <span className="dropzone-hint">Only JPG files (max. 2MB)</span>
          </label>
        )}
      </div>
      
      {error && <span className="dropzone-error">{error}</span>}
    </div>
  );
}