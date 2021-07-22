<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;

class AddressController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $user_authenticaded = JWTAuth::toUser();

        try {
            $result_address = $user_authenticaded->address()->create([
                'public_place' => $data['public_place'],
                'district' => $data['district'],
                'number' => $data['number'],
                'complement' => $data['complement'] ?? " ",
                'zip_code' => $data['zip_code'],
                'city' => $data['city'],
                'state' => $data['state'],
                'reference_point' => $data['reference_point'] ?? " "
            ]);
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o endereço.'];
        }

        if (isset($result_address) && !isset($error)) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }

    public function show()
    {
        $user_authenticaded = JWTAuth::toUser();

        try{
            $addresses = $user_authenticaded->address;

            $mounted_addresses = [];
            foreach($addresses as $address){
                array_push($mounted_addresses, array(
                    'public_place' => $address->public_place,
                    'district' => $address->district,
                    'number' => $address->number,
                    'complement' => $address->complement,
                    'zip_code' => $address->zip_code,
                    'city' => $address->city,
                    'state' => $address->state,
                    'reference_point' => $address->reference_point
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os endereços.'];
        }

        if (isset($mounted_addresses) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_addresses, 'error' => $error ?? null]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }

    public function get($id)
    {
        $user_authenticaded = JWTAuth::toUser();

        try{
            $address = $user_authenticaded->address()->where('id', $id)->first();

            $mounted_address = array(
                'public_place' => $address->public_place,
                'district' => $address->district,
                'number' => $address->number,
                'complement' => $address->complement,
                'zip_code' => $address->zip_code,
                'city' => $address->city,
                'state' => $address->state,
                'reference_point' => $address->reference_point
            );
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o endereço.'];
        }

        if (isset($mounted_address) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_address, 'error' => $error ?? null]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }

    public function update($id, Request $request)
    {
        $data = $request->all();
        $user_authenticaded = JWTAuth::toUser();

        try {
            if(isset($data['public_place'])){
                $address['public_place'] = $data['public_place'];
            }
            if(isset($data['district'])){
                $address['district'] = $data['district'];
            }
            if(isset($data['number'])){
                $address['number'] = $data['number'];
            }
            if(isset($data['complement'])){
                $address['complement'] = $data['complement'];
            }
            if(isset($data['zip_code'])){
                $address['zip_code'] = $data['zip_code'];
            }
            if(isset($data['city'])){
                $address['city'] = $data['city'];
            }
            if(isset($data['state'])){
                $address['state'] = $data['state'];
            }
            if(isset($data['reference_point'])){
                $address['reference_point'] = $data['reference_point'];
            }

            $result_address = $user_authenticaded->address()->where('id', $id)->update($address);
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o endereço.'];
        }

        if (isset($result_address) && !isset($error) && $result_address) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null]);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o endereço.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }

    public function delete($id)
    {
        $user_authenticaded = JWTAuth::toUser();

        try{
            $result = $user_authenticaded->address()->where('id', $id)->delete();
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o endereço.'];
        }

        if (isset($result) && !isset($error) && $result) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null]);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o endereço.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null]);
    }
}
