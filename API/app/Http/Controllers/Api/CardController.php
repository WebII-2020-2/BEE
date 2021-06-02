<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;

class CardController extends Controller
{
    public function store(Request $request){
        $data = $request->all();
        $user_authenticaded = JWTAuth::toUser();

        try{
            $result_card = $user_authenticaded->card()->create([
                'flag' => $data['flag'],
                'number' => $data['number'],
                'security_code' => $data['security_code'],
                'expiration_date' => $data['expiration_date'],
                'holder' => $data['holder'],
                'type' => $data['type']
            ]);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o cartão.'];
        }

        if(isset($result_card) && !isset($error)){
            return response()->json(['success' => true, 'data' => $result_card, 'error' => $error ?? null]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }
}
