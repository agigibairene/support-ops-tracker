<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;


Route::middleware('guest')->post('/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login');

Route::middleware('auth')->post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');