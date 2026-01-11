import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Dropzone } from './Dropzone';
import { StatusModal } from './ui/StatusModal';
import './AddPatientModal.css';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  full_name: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  document_photo: File | null;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone_country_code?: string;
  phone_number?: string;
  document_photo?: string;
}

type StatusType = 'success' | 'error' | null;

export function AddPatientModal({ isOpen, onClose, onSuccess }: AddPatientModalProps) {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone_country_code: '+',
    phone_number: '',
    document_photo: null,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado para el modal de status
  const [statusModal, setStatusModal] = useState<{
    type: StatusType;
    title: string;
    message?: string;
  }>({ type: null, title: '' });

  // Validar un campo individual
  const validateField = (name: keyof FormData, value: string | File | null): string | undefined => {
    switch (name) {
      case 'full_name':
        if (!value) return 'Full name is required';
        if (!/^[\p{L}\s]+$/u.test(value as string)) return 'Only letters and spaces allowed';
        break;
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) return 'Invalid email format';
        if (!/@gmail\.com$/i.test(value as string)) return 'Must be a @gmail.com address';
        break;
      case 'phone_country_code':
        if (!value) return 'Required';
        if (!/^\+/.test(value as string)) return 'Must start with +';
        break;
      case 'phone_number':
        if (!value) return 'Phone number is required';
        if (!/^[0-9]+$/.test(value as string)) return 'Only numbers allowed';
        break;
      case 'document_photo':
        if (!value) return 'Document photo is required';
        break;
    }
    return undefined;
  };

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambio en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Manejar selección de archivo
  const handleFileSelect = (file: File | null) => {
    setFormData(prev => ({ ...prev, document_photo: file }));
    if (errors.document_photo) {
      setErrors(prev => ({ ...prev, document_photo: undefined }));
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone_country_code: '+',
      phone_number: '',
      document_photo: null,
    });
    setErrors({});
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('full_name', formData.full_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_country_code', formData.phone_country_code);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('document_photo', formData.document_photo as File);

      const response = await fetch('http://localhost:8000/api/patients', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        
        if (response.status === 422 && errorData.errors) {
          const backendErrors: FormErrors = {};
          Object.keys(errorData.errors).forEach((key) => {
            backendErrors[key as keyof FormErrors] = errorData.errors[key][0];
          });
          setErrors(backendErrors);
          return;
        }
        
        throw new Error(errorData.message || 'Error al crear paciente');
      }

      // Éxito 
      setStatusModal({
        type: 'success',
        title: 'Patient created!',
        message: 'The patient was registered successfully.',
      });
      
    } catch (error) {
      // Error 
      setStatusModal({
        type: 'error',
        title: 'An error occurred',
        message: error instanceof Error ? error.message : 'Unknown error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const handleStatusClose = () => {
    const wasSuccess = statusModal.type === 'success';
    setStatusModal({ type: null, title: '' });
    
    if (wasSuccess) {
     
      resetForm();
      onSuccess();
      onClose();
    }
    
  };

  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} title="Add Patient">
        <form onSubmit={handleSubmit} className="add-patient-form">
          <Input
            label="Full name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Example: John Doe"
            error={errors.full_name}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ejemplo@gmail.com"
            error={errors.email}
          />

          <div className="phone-row">
            <Input
              label="Country code"
              name="phone_country_code"
              value={formData.phone_country_code}
              onChange={handleInputChange}
              placeholder="+54"
              error={errors.phone_country_code}
              className="phone-code"
            />
            <Input
              label="Phone number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              placeholder="1155667788"
              error={errors.phone_number}
              className="phone-number"
            />
          </div>

          <Dropzone
            onFileSelect={handleFileSelect}
            error={errors.document_photo}
          />

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Save
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de estado (éxito/error) */}
      <StatusModal
        isOpen={statusModal.type !== null}
        type={statusModal.type || 'success'}
        title={statusModal.title}
        message={statusModal.message}
        onClose={handleStatusClose}
      />
    </>
  );
}