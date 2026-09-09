<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /** Handle an authentication attempt. */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        // Prevent session fixation by rotating the session ID on login.
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Signed in.',
            'user' => $request->user()->only(['id', 'name', 'email']),
        ]);
    }

    /** Log the user out and invalidate their session. */
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Signed out.']);
    }
}