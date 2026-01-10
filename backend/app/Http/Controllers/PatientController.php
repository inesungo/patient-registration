<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Http\Requests\StorePatientRequest;
use App\Notifications\PatientRegistered;


class PatientController extends Controller 
{
    // Listar todos los pacientes
    public function index()
    {
        $patients = Patient::all();

        return response()->json([
            'data' => $patients,
        ]);
    }

    // Crear un nuevo paciente
    public function store(StorePatientRequest $request)
    {
        // Guardar el archivo en storage/app/public/documents/
        $path = $request->file('document_photo')->store('documents', 'public');

        // Crear el paciente con todos los datos
        $patient = Patient::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone_country_code' => $request->phone_country_code,
            'phone_number' => $request->phone_number,
            'document_photo_path' => $path,
        ]);    
        
        $patient->notify(new PatientRegistered());

        return response()->json([
            'data' => $patient,
            'message' => 'Patient created successfully',
        ], 201);
    }
}