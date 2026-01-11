import { useState } from 'react';
import type { Patient } from '../types/patient';
import './PatientCard.css';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`patient-card ${isExpanded ? 'expanded' : ''}`}
      onClick={toggleExpand}
    >
      {/* Contenido colapsado */}
      <div className="patient-card-header">
        <div className="patient-photo-container">
          {patient.document_photo_url ? (
            <img
              src={patient.document_photo_url}
              alt={`Documento de ${patient.full_name}`}
              className="patient-photo"
            />
          ) : (
            <div className="patient-photo-placeholder">
              <span>Sin foto</span>
            </div>
          )}
        </div>
        <div className="patient-name-container">
          <h3 className="patient-name">{patient.full_name}</h3>
          <span className="expand-icon">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Contenido expandido al onclick */}
      {isExpanded && (
        <div className="patient-card-details">
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{patient.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Teléfono:</span>
            <span className="detail-value">
              {patient.phone_country_code} {patient.phone_number}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}