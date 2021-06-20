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

        $data_image = preg_split("/^data:(.*);base64,/",$data['image'], -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);

        try{
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'cpf' => $data['cpf'],
                'phone' => $data['phone'],
                'birth_date' => $data['birth_date'],
                'password' => Hash::make($data['password']),
                'mime_type' => $data_image[0],
                'image' => base64_decode($data_image[1])
            ]);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o usuário.'];
        }

        if(isset($user) && !isset($error)){
            return response()->json(['success' => true, 'data' => null, 'error' => null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function login(Request $request){
        $data = $request->only(['email', 'password']);

        if (!$token = Auth::attempt($data)) {
            return response()->json(['success' => false, 'data' => null, 'error' => ['code' => 2, 'error_message' => 'Credenciais incorretas.']], 400);
        }

        $user = Auth::user();
        $user_data = array(
            'name' => $user->name,
            'email' => $user->email,
            'cpf' => $user->cpf,
            'birth_date' => $user->birth_date,
            'phone' => $user->phone,
            'image' => 'data:'.$user->mime_type.';base64,'.base64_encode($user->image),
        );
        $data_token = $this->createNewToken($token);

        return response()->json(['success' => true, 'data' => ['token' => $data_token->original, 'user' => $user_data], 'error' => null], 200);
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
