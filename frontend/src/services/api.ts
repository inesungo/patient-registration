import type { Patient, PatientsResponse } from '../types/patient';

// URL base de la API 
const API_BASE_URL = 'http://localhost:8000/api';

// Obtener todos los pacientes
export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(`${API_BASE_URL}/patients`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al cargar los pacientes');
  }

  const data: PatientsResponse = await response.json();
  return data.data;
}