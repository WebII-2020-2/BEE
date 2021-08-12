<?php

namespace App\Http\Controllers\Api;

use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Models\ProductPromotion;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\Http;

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
            DB::beginTransaction();
            $result_promotion = Promotion::create($data);

            foreach ($request->input('products', []) as $product) {
                $product_info = Product::find($product);

                $product_with_promotion = $data['type'] == 1 ?
                    ($product_info->unitary_value - $data['value']) :
                    $product_info->unitary_value - ($data['value'] / 100);

                $send_product['price'] = str_replace([',','.'], ['', ''], number_format($product_with_promotion, 2, '.', ''));

                $response_request_sku[] = Http::asForm()->withHeaders([
                    'Authorization' => 'Bearer '.config('app.stripe_token')
                ])
                ->post('https://api.stripe.com/v1/skus/'.$product_info->stripe_sku_id, $send_product)->json();

                $product_promotion[] = $result_promotion->productPromotion()->create(array(
                    'product_id' => $product
                ));
            }
            Log::create([
                'type' => 'promotion',
                'information' => 'create promotion and update sku - SUCCESS',
                'data' => json_encode([$data ?? null, $result_promotion ?? null, $response_request_sku ?? null, $product_promotion ?? null])
            ]);
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar a promoção.', $exception];
            Log::create([
                'type' => 'promotion',
                'information' => 'create promotion and update sku - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
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
            Log::create([
                'type' => 'promotion',
                'information' => 'show - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
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
            Log::create([
                'type' => 'promotion',
                'information' => 'get - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (isset($mounted_promotions) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_promotions, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function getProducts($id)
    {
        try {
            $promotion = Promotion::where('id', $id)->first();

            $product_promotions = $promotion
                ->productPromotion()
                ->join('products as p', 'p.id', '=', 'product_promotions.product_id')
                ->select('p.id', 'p.name', 'p.image', 'p.mime_type', 'p.unitary_value')
                ->get();


                $products = [];
                foreach($product_promotions as $product_promotion){
                if ($product_promotion) {
                    $product_with_promotion = $promotion->type == 1 ?
                        ($product_promotion->unitary_value - $promotion->value) :
                        $product_promotion->unitary_value - ($promotion->value / 100);
                }
                array_push($products, array(
                    'id' => $product_promotion->id,
                    'name' => $product_promotion->name,
                    'image' => 'data:' . $product_promotion->mime_type . ';base64,' . base64_encode($product_promotion->image),
                    'previous_value' => $product_promotion->unitary_value,
                    'value_promotion' => isset($product_with_promotion) ? (float) number_format($product_with_promotion, 2, '.', '') : null
                ));
            }

            $mounted_promotions = array(
                'name' => $promotion->name,
                'products' => $products
            );
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a promoção.', $exception];
            Log::create([
                'type' => 'promotion',
                'information' => 'get_products - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
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
            DB::beginTransaction();
            $promotion = Promotion::where('id', $id)->first();

            if(is_null($promotion)){
                throw new Exception();
            }

            $result_promotion = Promotion::where('id', $id)->update([
                'name' => $data['name'],
                'type' => $data['type'],
                'value' => $data['value'],
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date']
            ]);

            $products_restored = $promotion->productPromotion()->whereNotIn('product_id', $data['products'])->get();

            if(count($products_restored) > 0){
                foreach($products_restored as $product_restored){
                    $product_info = Product::find($product_restored->product_id);

                    $send_product['price'] = str_replace([',','.'], ['', ''], number_format($product_info->unitary_value, 2, '.', ''));

                    $response_request_sku[] = Http::asForm()->withHeaders([
                        'Authorization' => 'Bearer '.config('app.stripe_token')
                    ])
                    ->post('https://api.stripe.com/v1/skus/'.$product_info->stripe_sku_id, $send_product)->json();
                }
            }

            $result_product_promotion = $promotion->productPromotion()->whereNotIn('product_id', $data['products'])->delete();

            foreach ($data['products'] as $product) {
                $product_info = Product::find($product);

                $product_with_promotion = $data['type'] == 1 ?
                ($product_info->unitary_value - $data['value']) :
                $product_info->unitary_value - ($data['value'] / 100);

                $send_product['price'] = str_replace([',','.'], ['', ''], number_format($product_with_promotion, 2, '.', ''));

                $response_request_sku[] = Http::asForm()->withHeaders([
                    'Authorization' => 'Bearer '.config('app.stripe_token')
                ])
                ->post('https://api.stripe.com/v1/skus/'.$product_info->stripe_sku_id, $send_product)->json();

                $product_promotion[] = ProductPromotion::updateOrCreate(
                    ['promotion_id' => $id, 'product_id' => $product],
                    ['promotion_id' => $id, 'product_id' => $product]
                );
            }
            Log::create([
                'type' => 'promotion',
                'information' => 'update promotion and update sku - SUCCESS',
                'data' => json_encode([$data ?? null, $product_promotion ?? null, $response_request_sku ?? null, $result_promotion ?? null])
            ]);
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a promoção.'];
            Log::create([
                'type' => 'promotion',
                'information' => 'update promotion and update sku - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (!isset($error) && isset($result_promotion) && $result_promotion) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        } else {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a promoção.'];
            Log::create([
                'type' => 'promotion',
                'information' => 'update promotion and update sku - ERROR',
                'data' => "not save data"
            ]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function delete($id)
    {
        try {
            $promotion_info = Promotion::find($id);

            foreach($promotion_info->productPromotion as $products){
                $product_info = Product::find($products->product_id);

                $send_product['price'] = str_replace([',','.'], ['', ''], number_format($product_info->unitary_value, 2, '.', ''));

                $response_request_sku[] = Http::asForm()->withHeaders([
                    'Authorization' => 'Bearer '.config('app.stripe_token')
                ])
                ->post('https://api.stripe.com/v1/skus/'.$product_info->stripe_sku_id, $send_product)->json();
            }
            $promotion = Promotion::where('id', $id)->delete();
            Log::create([
                'type' => 'promotion',
                'information' => 'delete promotion and update sku - SUCCESS',
                'data' => json_encode([$id ?? null, $promotion_info ?? null, $response_request_sku ?? null, $promotion ?? null])
            ]);
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a promoção.'];
            Log::create([
                'type' => 'promotion',
                'information' => 'update promotion and update sku - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (isset($promotion) && !isset($error) && $promotion) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        } else {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a promoção.'];
            Log::create([
                'type' => 'promotion',
                'information' => 'delete promotion and update sku - ERROR',
                'data' => "not delete data"
            ]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
