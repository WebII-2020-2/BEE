<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function store(Request $request){
        $data = $request->all();

        try{
            $result_Promotion = Promotion::create([
                'name' => $data['name'],
                'type' => $data['type'],
                'value' => $data['value']
            ]);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar a promoção.'];
        }

        if(isset($result_promotion) && !isset($error)){
            return response()->json(['success' => true, 'data' => $result_promotion, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function show(){
        try{
            $promotions = Promotion::orderBy('name', 'asc')->get();
            $mounted_promotions = [];
            foreach($promotions as $promotion){
                $count = Promotion::where('promotion_id', $promotion->id)->count("id");
                array_push($mounted_promotions, array(
                    'id' => $promotion->id,
                    'name' => $promotion->name,
                    'type' => $promotion->type,
                    'value' => $promotion->value,
                    'count_promotions' => $count
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar as promoções.'];
        }

        if(isset($mounted_promotions) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_promotions, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($id){
        try{
            $promotion = Promotion::find($id);
            $count = Promotion::where('promotion_id', $promotion->id)->count("id");
            $mounted_promotions = array(
                'id' => $promotion->id,
                'name' => $promotion->name,
                'type' => $promotion->type,
                'values' => $promotion->value,
                'count_promotions' => $count
            );
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a promoção.'];
        }

        if(isset($mounted_categoriy) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_categoriy, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($id, Request $request){
        $data = $request->all();

        try{
            if(isset($data['name'])){
                $update_values['name'] = $data['name'];
            }
            if(isset($data['type'])){
                $update_values['type'] = $data['type'];
            }
            if(isset($data['value'])){
                $update_values['value'] = $data['value'];
            }

            $promotion = Promotion::where('id', $id)->update($update_values);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a promoção.'];
        }

        if(isset($promotion) && !isset($error) && $promotion){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a promoção.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function delete($id){
        try{
            $promotion = Promotion::where('id', $id)->delete();
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a promoção.'];
        }

        if(isset($promotion) && !isset($error) && $promotion){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a promoção.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
