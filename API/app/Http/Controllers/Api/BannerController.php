<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Product;
use App\Models\BannerProduct;
use Illuminate\Http\Request;


class BannerController extends Controller
{
    public function store(Request $request){

        $data = $request->all();

        $data_image = preg_split("/^data:(.*);base64,/",$data['image'], -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
        
        try{
            $result_banner = Banner::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'active' => $data['active'],
                'mime_type' => $data_image[0],
                'image' => base64_decode($data_image[1]),
            ]);

            foreach ($request->input('products', []) as $product) {

                $banner_product = $result_banner->bannerProduct()->create(array(
                    'product_id' => $product
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o Banner.'];
        }

        if(isset($result_banner) && !isset($error)){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function show(){
        try{
            $banners = Banner::all();

            $mounted_banners = [];
            foreach ($banners as $banner) {
                $products = $banner->bannerProduct;

                $mounted_products = [];
                foreach ($products as $product) {
                    array_push($mounted_products, $product->product_id);
                }

                array_push($mounted_banners, array(
                    'id' => $banner->id,
                    'title' => $banner->title,
                    'description' => $banner->description,
                    'image' => 'data:'.$banner->mime_type.';base64,'.base64_encode($banner->image),
                    'active' => $banner->active,
                    'products' => $mounted_products
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os banners.'];
        }

        if(isset($mounted_banners) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_banners, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($id){
        try{
            $banner = Banner::where('banner.id', $id)->first();

            $banner_products = $banner->bannerProduct;

            $products = [];
            foreach($banner_products as $banner_product){
                array_push($products, $banner_product->product_id);
            }

            $mounted_banner = array(
                "id" => $banner->id,
                'title' => $banner->title,
                'description' => $banner->description,
                'image' => 'data:'.$banner->mime_type.';base64,'.base64_encode($banner->image),
                'active' => $banner->active,
                'products' => $products
            );
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o banner.'];
        }

        if(isset($mounted_banner) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_banner, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($id, Request $request){
        $data = $request->all();

        $data_image = preg_split("/^data:(.*);base64,/",$data['image'], -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);

        try {
            $banner = Banner::where('id', $id)->first();

            $result_banner = banner::where('id', $id)->update([
                'title' => $data['title'],
                'description' => $data['description'],
                'value' => $data['value'],
                'start_date' => $data['start_date'],
                'active' => $data['active']
            ]);

            $result_banner_product = $banner->bannerProduct()->whereNotIn('product_id', $data['products'])->delete();

            foreach ($data['products'] as $product) {
                $banner_product = BannerProduct::updateOrCreate(
                    ['banner_id' => $id, 'product_id' => $product],
                    ['banner_id' => $id, 'product_id' => $product]
                );
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o banner.', $exception];
        }

        if(isset($result_banner) && !isset($error) && $result_banner){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o produto.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function delete($id, Request $request){
        try {
            $banner = Banner::where('id', $id)->delete();
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o banner.'];
        }

        if (isset($banner) && !isset($error) && $banner) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        } else {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o banner.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
