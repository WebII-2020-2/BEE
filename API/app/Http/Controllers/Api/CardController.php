<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use Illuminate\Http\Request;
use JWTAuth;

class CardController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $user_authenticaded = JWTAuth::toUser();

        try {
            $result = $user_authenticaded->card()->create([
                'flag' => $data['flag'],
                'number' => $data['number'],
                'security_code' => $data['security_code'],
                'expiration_date' => $data['expiration_date'],
                'holder' => $data['holder'],
                'type' => $data['type'],
                'payment_method_id' => 1
            ]);

            $result_card = [
                'id' => $result->id,
                'flag' =>  $result->flag,
                'number' => substr_replace($result->number, '***********', 0, 11),
                'security_code' => '***',
                'expiration_date' => $result->expiration_date,
                'holder' => $result->holder,
                'type' => $result->type,
                'payment_method_id' => $result->payment_method_id
            ];
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o cartão.'];
        }

        if (isset($result_card) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $result_card, 'error' => $error ?? null]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }

    public function show()
    {
        $user_authenticaded = JWTAuth::toUser();

        try {
            $cards = $user_authenticaded->card;

            $result_card = [];
            foreach ($cards as $card) {
                array_push($result_card, array(
                    'id' => $card->id,
                    'flag' =>  $card->flag,
                    'number' => substr_replace($card->number, '***********', 0, 11),
                    'security_code' => '***',
                    'expiration_date' => $card->expiration_date,
                    'holder' => $card->holder,
                    'type' => $card->type
                ));
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os cartões.'];
        }

        if (isset($result_card) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $result_card, 'error' => $error ?? null]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }

    public function get($id)
    {
        $user_authenticaded = JWTAuth::toUser();

        $card = Card::where(['id' => $id, 'user_id' => $user_authenticaded->id])->first();

        try {

            $result_card = [
                'id' => $card->id,
                'flag' =>  $card->flag,
                'number' => substr_replace($card->number, '***********', 0, 11),
                'security_code' => '***',
                'expiration_date' => $card->expiration_date,
                'holder' => $card->holder,
                'type' => $card->type
            ];
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o cartão.'];
        }

        if (isset($result_card) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $result_card, 'error' => $error ?? null]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }

    public function update($id, Request $request)
    {
        $data = $request->all();
        $user_authenticaded = JWTAuth::toUser();

        try {

            if(isset($data['flag'])){
                $card['flag'] = $data['flag'];
            }
            if(isset($data['number'])){
                $card['number'] = $data['number'];
            }
            if(isset($data['security_code'])){
                $card['security_code'] = $data['security_code'];
            }
            if(isset($data['expiration_date'])){
                $card['expiration_date'] = $data['expiration_date'];
            }
            if(isset($data['holder'])){
                $card['holder'] = $data['holder'];
            }
            if(isset($data['type'])){
                $card['type'] = $data['type'];
            }

            $result = $user_authenticaded->card()->where('id', $id)->update($card);
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o cartão.'];
        }

        if (isset($result) && !isset($error) && $card) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null]);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o cartão.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }

    public function delete($id){
        $user_authenticaded = JWTAuth::toUser();

        try{
            $result = $user_authenticaded->card()->where('id', $id)->delete();
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o cartão.'];
        }

        if (isset($result) && !isset($error)) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null]);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o cartão.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }
}
