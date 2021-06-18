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
        $data = $request->all();

        try{
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'cpf' => $data['cpf'],
                'phone' => $data['phone'],
                'birth_date' => $data['birth_date'],
                'password' => Hash::make($data['password'])
            ]);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o usuário.'];
        }

        if(isset($user) && !isset($error)){
            return response()->json(['success' => true, 'data' => $user, 'error' => null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function login(Request $request){
        $data = $request->only(['email', 'password']);

        if (!$token = Auth::attempt($data)) {
            return response()->json(['success' => false, 'data' => null, 'error' => ['code' => 2, 'error_message' => 'Credenciais incorretas.']], 400);
        }

        return $this->createNewToken($token);
    }

    public function refresh(){
        return $this->createNewToken(Auth::refresh());
    }

    public function logout(){
        try{
            auth('api')->logout();
            return response()->json(['success' => true, 'data' => null, 'error' => null], 200);
        }catch(\Exception $exception){
            $error = ['code' => 3, 'error_message' => 'Não foi possivel invalidar o token.'];
            return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
        }

    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL()
        ]);
    }
}
