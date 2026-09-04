<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Cualquier usuario autenticado puede crear contactos (son suyos)
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:contacts,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            // La empresa y los tags deben pertenecer al usuario autenticado
            'company_id' => [
                'nullable',
                Rule::exists('companies', 'id')->where('user_id', $this->user()->id),
            ],
            'tags' => 'nullable|array',
            'tags.*' => [
                Rule::exists('tags', 'id')->where('user_id', $this->user()->id),
            ],
        ];
    }
}