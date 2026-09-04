<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        // La verificación de pertenencia la realiza la Policy en el controlador
        return true;
    }

    public function rules(): array
    {
        $companie = $this->route('companie'); // Coincide con el parámetro implícito del route-model binding

        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('companies', 'email')
                    ->where('user_id', $this->user()->id)
                    ->ignore($companie->id),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:255'],
        ];
    }
}