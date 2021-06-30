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

        if(isset($data['image']) && !empty($data['image'])){
            $data_image = preg_split("/^data:(.*);base64,/",$data['image'], -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
        }else{
            $data_image = preg_split("/^data:(.*);base64,/","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNzg0MTZGRTE3M0UxMUUzOTYyOEE4QkM2OUVGODdCNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNzg0MTZGRjE3M0UxMUUzOTYyOEE4QkM2OUVGODdCNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3ODQxNkZDMTczRTExRTM5NjI4QThCQzY5RUY4N0I3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU3ODQxNkZEMTczRTExRTM5NjI4QThCQzY5RUY4N0I3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+b5NvTwAAADNQTFRF3t7e6urq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", -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
        }

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
            $token = Auth::attempt(['email' => $user->email, 'password' => $data['password']]);
            $user_data = array(
                'name' => $user->name,
                'email' => $user->email,
                'cpf' => $user->cpf,
                'birth_date' => $user->birth_date,
                'phone' => $user->phone,
                'image' => 'data:'.$user->mime_type.';base64,'.base64_encode($user->image),
            );
            $data_token = $this->createNewToken($token);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o usuário.'];
        }

        if(isset($user) && !isset($error)){
            return response()->json(['success' => true, 'data' => ['token' => $data_token->original, 'user' => $user_data], 'error' => null], 200);
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
