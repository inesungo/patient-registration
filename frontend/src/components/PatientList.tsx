import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import type { Patient } from '../types/patient';
import { getPatients } from '../services/api';
import { PatientCard } from './PatientCard';
import { LoadingSpinner } from './LoadingSpinner';
import './PatientList.css';

export interface PatientListRef {
  refresh: () => void;
}

export const PatientList = forwardRef<PatientListRef>((_props, ref) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar pacientes
  const loadPatients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  // Exponer la función refresh al componente padre
  useImperativeHandle(ref, () => ({
    refresh: loadPatients,
  }));

  // Cargar pacientes al montar el componente
  useEffect(() => {
    loadPatients();
  }, []);

  // Estado: Cargando
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Estado: Error
  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">❌ {error}</p>
        <button className="retry-button" onClick={loadPatients}>
          Retry
        </button>
      </div>
    );
  }

  // Estado: Lista vacía
  if (patients.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-icon">📋</div>
        <h3 className="empty-title">No patients registered</h3>
        <p className="empty-text">
          Patients you register will appear here.
        </p>
      </div>
    );
  }

  // Estado: Lista con datos
  return (
    <div className="patient-list">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
});
