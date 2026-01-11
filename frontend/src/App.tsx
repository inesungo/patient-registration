import { useState, useRef } from 'react';
import { PatientList } from './components/PatientList';
import { AddPatientModal } from './components/AddPatientModal';
import { Button } from './components/ui/Button';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Referencia para poder llamar a loadPatients desde fuera
  const patientListRef = useRef<{ refresh: () => void }>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    // Refrescar la lista de pacientes después de agregar uno nuevo
    patientListRef.current?.refresh();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Patient registration system</h1>
     
      </header>

      <main className="app-main">
        <div className="app-actions">
          <Button onClick={handleOpenModal}>
            + Add patient
          </Button>
        </div>
        <PatientList ref={patientListRef} />
      </main>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default App;