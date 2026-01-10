<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


// Validación para la creación de un nuevo paciente
class StorePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'regex:/^[\pL\s]+$/u'],
            'email' => ['required', 'email', 'unique:patients,email', 'regex:/@gmail\.com$/i'],
            'phone_country_code' => ['required', 'regex:/^\+/'],
            'phone_number' => ['required', 'regex:/^[0-9]+$/'],
            'document_photo' => ['required', 'image', 'mimes:jpg,jpeg', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Full name is required.',
            'full_name.regex' => 'Full name must contain only letters and spaces.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.unique' => 'This email is already registered.',
            'email.regex' => 'Email must be a @gmail.com address.',
            'phone_country_code.required' => 'Phone country code is required.',
            'phone_country_code.regex' => 'Phone country code must start with +.',
            'phone_number.required' => 'Phone number is required.',
            'phone_number.regex' => 'Phone number must contain only digits.',
            'document_photo.required' => 'Document photo is required.',
            'document_photo.image' => 'Document photo must be an image.',
            'document_photo.mimes' => 'Document photo must be a JPG file.',
            'document_photo.max' => 'Document photo must not exceed 2MB.',
        ];
    }
}

