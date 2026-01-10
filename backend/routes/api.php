<?php

use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;

// Listar todos los pacientes
Route::get('/patients', [PatientController::class, 'index']);

// Crear un nuevo paciente
Route::post('/patients', [PatientController::class, 'store']);
