<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request){
        $data = $request->all();

        $data_image = preg_split("/^data:(.*);base64,/",$data['image'], -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);

        try{
            $result_product = Product::create([
                'name' => $data['name'],
                'unity' => $data['unity'],
                'quantity' => $data['quantity'],
                'unitary_value' => $data['unitary_value'],
                'description' => $data['description'],
                'mime_type' => $data_image[0],
                'image' => base64_decode($data_image[1]),
                'category_id' => $data['category_id']
            ]);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o produto.'];
        }

        if(isset($result_product) && !isset($error)){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function show(){
        try{
            $products = Product::orderBy('name', 'asc')->join('categories as c', 'c.id', '=', 'products.category_id')->select('products.*', 'c.name as category')->get();

            $mounted_products = [];
            foreach($products as $product){
                array_push($mounted_products, array(
                    "id" => $product->id,
                    'name' => $product->name,
                    'unity' => $product->unity,
                    'quantity' => $product->quantity,
                    'unitary_value' => $product->unitary_value,
                    'description' => $product->description,
                    'image' => 'data:'.$product->mime_type.';base64,'.base64_encode($product->image),
                    'category_id' => $product->category_id,
                    'category' => $product->category
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os produtos.'];
        }

        if(isset($mounted_products) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_products, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($id){
        try{
            $product = Product::where('products.id', $id)->join('categories as c', 'c.id', '=', 'products.category_id')->select('products.*', 'c.name as category')->first();

            $mounted_product = array(
                "id" => $product->id,
                'name' => $product->name,
                'unity' => $product->unity,
                'quantity' => $product->quantity,
                'unitary_value' => $product->unitary_value,
                'description' => $product->description,
                'image' => 'data:'.$product->mime_type.';base64,'.base64_encode($product->image),
                'category_id' => $product->category_id,
                'category' => $product->category
            );
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o produto.'];
        }

        if(isset($mounted_product) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_product, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function getBestSelled(){
        try{
            $products = Order
                            ::join('product_orders as po', 'po.order_id', '=', 'orders.id')
                            ->join('products as p', 'p.id', '=', 'po.product_id')
                            ->groupBy('p.id')
                            ->limit(10)
                            ->select('p.id', 'p.name', 'p.mime_type', 'p.image', 'p.unitary_value')
                            ->get();

            $mounted_products = [];
            foreach($products as $product){
                array_push($mounted_products, array(
                    "id" => $product->id,
                    'name' => $product->name,
                    'unitary_value' => $product->unitary_value,
                    'image' => 'data:'.$product->mime_type.';base64,'.base64_encode($product->image)
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os produtos em destaque.', $exception];
        }

        if(isset($mounted_products) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_products, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function getByName($name){
        try{
            $product = Product::where('products.name', 'like', '%'.$name.'%')->join('categories as c', 'c.id', '=', 'products.category_id')->select('products.*', 'c.name as category')->first();

            $mounted_product = array(
                "id" => $product->id,
                'name' => $product->name,
                'unity' => $product->unity,
                'quantity' => $product->quantity,
                'unitary_value' => $product->unitary_value,
                'description' => $product->description,
                'image' => 'data:'.$product->mime_type.';base64,'.base64_encode($product->image),
                'category_id' => $product->category_id,
                'category' => $product->category
            );

        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o produto.'];
        }

        if(isset($mounted_product) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_product, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($id, Request $request){
        $data = $request->all();

        $data_image = preg_split("/^data:(.*);base64,/",$data['image'], -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);

        if(isset($data['name'])){
            $product['name'] = $data['name'];
        }
        if(isset($data['unity'])){
            $product['unity'] = $data['unity'];
        }
        if(isset($data['quantity'])){
            $product['quantity'] = $data['quantity'];
        }
        if(isset($data['unitary_value'])){
            $product['unitary_value'] = $data['unitary_value'];
        }
        if(isset($data['description'])){
            $product['description'] = $data['description'];
        }
        if(isset($data['image'])){
            $product['mime_type'] = $data_image[0];
        }
        if(isset($data['image'])){
            $product['image'] = base64_decode($data_image[1]);
        }
        if(isset($data['category_id'])){
            $product['category_id'] = $data['category_id'];
        }
        try{
            $result_product = Product::where('id', $id)->update($product);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o produto.', $exception];
        }

        if(isset($result_product) && !isset($error) && $result_product){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o produto.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function delete($id, Request $request){
        $data = $request->all();

        try{
            $product = Product::where('id', $id)->delete();
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o produto.'];
        }

        if(isset($product) && !isset($error) && $product){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o produto.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

}
