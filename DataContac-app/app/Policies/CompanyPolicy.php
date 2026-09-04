<?php

namespace App\Policies;

use App\Models\Companie;
use App\Models\User;

class CompaniePolicy
{
    public function viewAny(User $user): bool
    {
        return true; // Cualquier usuario logueado puede ver su listado
    }

    public function view(User $user, Companie $companie): bool
    {
        return $user->id === $companie->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Companie $companie): bool
    {
        return $user->id === $companie->user_id;
    }

    public function delete(User $user, Companie $companie): bool
    {
        return $user->id === $companie->user_id;
    }
}