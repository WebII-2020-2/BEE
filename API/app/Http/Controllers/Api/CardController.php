<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use JWTAuth;

class CardController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $user_authenticaded = JWTAuth::toUser();

        try {
            $response_request = Http::asForm()->withHeaders([
                'Authorization' => 'Bearer '.config('app.stripe_token')
            ])
            ->post('https://api.stripe.com/v1/tokens', [
                'card[number]' => $data['number'],
                'card[exp_month]' => explode('/', $data['expiration_date'])[0],
                'card[exp_year]' => explode('/', $data['expiration_date'])[1],
                'card[cvc]' => $data['security_code']
            ])->json();

            $result = $user_authenticaded->card()->create([
                'flag' => $data['flag'],
                'number' => $data['number'],
                'security_code' => $data['security_code'],
                'expiration_date' => $data['expiration_date'],
                'holder' => $data['holder'],
                'type' => 1,
                'payment_method_id' => 1,
                'card_token' => $response_request['id']
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

            Log::create([
                'type' => 'card',
                'information' => 'tokenize card and save card- SUCCESS',
                'data' => json_encode([$data ?? null, $user_authenticaded ?? null, $response_request ?? null, $result ?? null, $result_card ?? null])
            ]);
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o cartão.'];
            Log::create([
                'type' => 'card',
                'information' => 'tokenize card and save card - ERROR',
                'data' => $exception->getMessage()
            ]);
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
            Log::create([
                'type' => 'card',
                'information' => 'show - ERROR',
                'data' => $exception->getMessage()
            ]);
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
            Log::create([
                'type' => 'card',
                'information' => 'get - ERROR',
                'data' => $exception->getMessage()
            ]);
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
            DB::beginTransaction();

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

            if($result){
                $card_data = $user_authenticaded->card()->where('id', $id)->first();

                $response_request = Http::asForm()->withHeaders([
                    'Authorization' => 'Bearer '.config('app.stripe_token')
                ])
                ->post('https://api.stripe.com/v1/tokens', [
                    'card[number]' => $card_data->number,
                    'card[exp_month]' => explode('/', $card_data->expiration_date)[0],
                    'card[exp_year]' => explode('/', $card_data->expiration_date)[1],
                    'card[cvc]' => $card_data->security_code
                ])->json();

                $card['card_token'] = $response_request['id'];

                $result = $user_authenticaded->card()->where('id', $id)->update($card);
            }

            Log::create([
                'type' => 'card',
                'information' => 'tokenize card and update card - SUCCESS',
                'data' => json_encode([$data, $user_authenticaded, $card, $response_request, $result])
            ]);
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o cartão.'];
            Log::create([
                'type' => 'card',
                'information' => 'tokenize card and update card - ERROR',
                'data' => $exception->getMessage()
            ]);
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
            Log::create([
                'type' => 'card',
                'information' => 'delete - ERROR',
                'data' => $exception->getMessage()
            ]);
        }

        if (isset($result) && !isset($error)) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null]);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o cartão.'];
            Log::create([
                'type' => 'card',
                'information' => 'delete - ERROR',
                'data' => "not save data"
            ]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }
}
