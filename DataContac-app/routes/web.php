<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\NoteController;

require __DIR__.'/settings.php';
Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('contacts', ContactController::class);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('companies', CompanyController::class);
});

Route::get('notes', [NoteController::class, 'index'])->name('notes.index');
Route::post('contacts/{contact}/notes', [NoteController::class, 'store'])->name('notes.store');
Route::delete('notes/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');