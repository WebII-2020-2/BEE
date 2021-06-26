<?php

namespace App\Http\Controllers\Api;

use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Models\ProductPromotion;
use App\Models\CategoryPromotion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class PromotionController extends Controller
{
    public function store(Request $request){
        $data = $request->only([
            'name',
            'type',
            'value',
            'start_date',
            'endl_date'
        ]);

        try{
            $result_promotion = Promotion::create($data);

            foreach($request->input('products', []) as $product){

                $product_promotion = $result_promotion->productPromotion()->create(array(
                    'product_id' => $product
                ));

            }


            foreach($request->input('categories',[]) as $categories){

                $categories_promotion = $result_promotion->categoriesPromotion()->create(array(
                    'categories_id' => $categories 
                ));

            }

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
            $promotions = Promotion::orderBy('name', 'asc')->with(['productPromotion.product', 'categoryPromotion.category'])->get();

        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar as promoções.'];
        }

        if(isset($promotions) && !isset($error)){
            return response()->json(['success' => true, 'data' => $promotions, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($id){
        try{
            $promotions = Promotion::orderBy('name', 'asc')->with(['productPromotion.product', 'categoryPromotion.category'])->find($id);

        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a promoção.'];
        }

        if(isset($promotions) && !isset($error)){
            return response()->json(['success' => true, 'data' => $promotions, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($id, Request $request){
        $data = $request->only([
            'name',
            'type',
            'value',
            'start_date',
            'endl_date'
        ]);

        $promotion = Promotion::find($id);

        if(!$promotion){
            return response()->json(['success' => false, 'data' => null, 'error' => 'Promoção nao foi encontrada'], 404);
        }

        DB::beginTransaction();

        try{
            if(is_array($request->input('products_deleteds')) && count($request->input('products_deleteds'))){
                $products_deleteds = ProductPromotion::whereIn('product_id', $request->input('products_deleteds', []))->where('promotion_id', $promotion->id)->delete();
            }

            if(is_array($request->input('categories_deleteds')) && count($request->input('categories_deleteds'))){
                $categories_deleteds = CategoryPromotion::whereIn('category_id', $request->input('categories_deleteds', []))->where('promotion_id', $promotion->id)->delete();
            }

            foreach($request->input('products', []) as $product){

                $product_promotion = $promotion->productPromotion()->create(array(
                    'product_id' => $product
                ));

            }

            foreach($request->input('categories',[]) as $categories){

                $categories_promotion = $promotion->categoryPromotion()->create(array(
                    'category_id' => $categories 
                ));

            }

            $promotion->update($data);

            DB::commit();

        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a promoção.'];

            DB::rollBack();

            Log::info($exception->getMessage());
        }

        if(!isset($error)){
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
