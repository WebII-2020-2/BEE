<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller{

    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request){
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        
        $data = $request->only(['name','email','password']);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'cpf' => $data['cpf'] ?? null,
            'phone' => $data['phone'] ?? null,
            'birth_date' => $data['birth_date'] ?? null,
            'password' => Hash::make($data['password'])
        ]);

        return response()->json([
            'success' => true,
        ], 201);
    }

    public function login(Request $request){

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $data = $request->only(['email', 'password']);

        if (!$token = Auth::attempt($data)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    public function test(){
        dd('aaa');
        return response()->json(Auth::user());
    }

    public function refresh(){
        return $this->createNewToken(Auth::refresh());
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }
}
