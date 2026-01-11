// Tipo que representa un paciente desde la API
export interface Patient {
    id: number;
    full_name: string;
    email: string;
    phone_country_code: string;
    phone_number: string;
    document_photo_url: string | null;
    created_at: string;
    updated_at: string;
  }
  
  // Respuesta de la API GET /api/patients
  export interface PatientsResponse {
    data: Patient[];
  }