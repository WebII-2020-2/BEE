<?php

namespace App\Http\Controllers\Api;

use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Models\ProductPromotion;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Exception;

class PromotionController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->only([
            'name',
            'type',
            'value',
            'start_date',
            'end_date'
        ]);

        try {
            $result_promotion = Promotion::create($data);

            foreach ($request->input('products', []) as $product) {

                $product_promotion = $result_promotion->productPromotion()->create(array(
                    'product_id' => $product
                ));
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar a promoção.', $exception];
        }

        if (isset($result_promotion) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $result_promotion, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function show()
    {
        try {
            $promotions = Promotion::all();
            $mounted_promotions = [];
            foreach ($promotions as $promotion) {
                $products = $promotion->productPromotion;

                $mounted_products = [];
                foreach ($products as $product) {
                    array_push($mounted_products, $product->product_id);
                }

                array_push($mounted_promotions, array(
                    'id' => $promotion->id,
                    'name' => $promotion->name,
                    'type' => $promotion->type,
                    'value' => $promotion->value,
                    'start_date' => $promotion->start_date,
                    'end_date' => $promotion->end_date,
                    'products' => $mounted_products
                ));
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar as promoções.'];
        }

        if (isset($mounted_promotions) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_promotions, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($id)
    {
        try {
            $promotion = Promotion::where('id', $id)->first();

            $product_promotions = $promotion->productPromotion;

            $products = [];
            foreach($product_promotions as $product_promotion){
                array_push($products, $product_promotion->product_id);
            }

            $mounted_promotions = array(
                'id' => $promotion->id,
                'name' => $promotion->name,
                'type' => $promotion->type,
                'value' => $promotion->value,
                'start_date' => $promotion->start_date,
                'end_date' => $promotion->end_date,
                'products' => $products
            );
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a promoção.'];
        }

        if (isset($mounted_promotions) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_promotions, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($id, Request $request)
    {
        $data = $request->all();

        try {
            $promotion = Promotion::where('id', $id)->first();

            $result_promotion = Promotion::where('id', $id)->update([
                'name' => $data['name'],
                'type' => $data['type'],
                'value' => $data['value'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date']
            ]);

            $result_product_promotion = $promotion->productPromotion()->whereNotIn('product_id', $data['products'])->delete();

            foreach ($data['products'] as $product) {
                $product_promotion = ProductPromotion::updateOrCreate(
                    ['promotion_id' => $id, 'product_id' => $product],
                    ['promotion_id' => $id, 'product_id' => $product]
                );
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a promoção.', $exception];
        }

        if (!isset($error) && isset($result_promotion) && $result_promotion) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        } else {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a promoção.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function delete($id)
    {
        try {
            $promotion = Promotion::where('id', $id)->delete();
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a promoção.'];
        }

        if (isset($promotion) && !isset($error) && $promotion) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        } else {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a promoção.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
