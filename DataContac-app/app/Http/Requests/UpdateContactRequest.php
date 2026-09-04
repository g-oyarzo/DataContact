<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        // La verificación real de "es tu contacto" la hace la Policy en el controller
        return true;
    }

    public function rules(): array
    {
        $contact = $this->route('contact');

        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'nullable',
                'email',
                Rule::unique('contacts', 'email')->ignore($contact->id),
            ],
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
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