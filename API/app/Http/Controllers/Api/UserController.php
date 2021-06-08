<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use JWTAuth;

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
        
        try{
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'cpf' => $data['cpf'] ?? null,
                'phone' => $data['phone'] ?? null,
                'birth_date' => $data['birth_date'] ?? null,
                'password' => Hash::make($data['password'])
            ]);
        }catch(\Exception $exception){
            $error = ['code' => 4, 'error_message' => 'Não autorizado.'];
        }

        if(isset($user) && !isset($error)){
            return response()->json(['success' => true, 'data' => $user, 'error' => null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function login(Request $request){

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $data = $request->only(['email', 'password']);

        if (!$token = Auth::attempt($data)) {
            return response()->json(['success' => false, 'data' => null, 'error' => ['code' => 4, 'error_message' => 'Não autorizado.']], 400);
        }

        return $this->createNewToken($token);
    }

    public function refresh(){
        return $this->createNewToken(Auth::refresh());
    }

    public function logout(){
        try{
            JWTAuth::invalidate(JWTAuth::getToken());
        }catch(\Exception $exception){
            $error = ['code' => 3, 'error_message' => 'Não foi possivel invalidar o token.'];
        }

        if(!isset($error)){
            return response()->json(['success' => true, 'data' => null, 'error' => null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 720
        ]);
    }
}
