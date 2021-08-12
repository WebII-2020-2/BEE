<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Log;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request){
        $data = $request->all();

        try{
            $result_category = Category::create([
                'name' => $data['name'],
                'description' => $data['description']
            ]);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar a categoria.'];
            Log::create([
                'type' => 'category',
                'information' => 'add category - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if(isset($result_category) && !isset($error)){
            return response()->json(['success' => true, 'data' => $result_category, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);


    }

    public function show(){
        try{
            $categories = Category::orderBy('name', 'asc')->get();
            $mounted_categories = [];
            foreach($categories as $category){
                $products = Product::where('category_id', $category->id)->get();

                $mounted_products = [];
                foreach($products as $product){
                    array_push($mounted_products, $product->id);
                }

                array_push($mounted_categories, array(
                    'id' => $category->id,
                    'name' => $category->name,
                    'description' => $category->description,
                    'count_products' => count($mounted_products),
                    'products' => $mounted_products
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar as categorias.'];
            Log::create([
                'type' => 'category',
                'information' => 'show category - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if(isset($mounted_categories) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_categories, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($id){
        try{
            $category = Category::find($id);
            $products = Product::where('category_id', $category->id)->get();

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
                    'category_id' => $product->category_id
                ));
            }

            $mounted_categoriy = array(
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'count_products' => $products->count('id'),
                'products' => $mounted_products
            );
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a categoria.'];
            Log::create([
                'type' => 'category',
                'information' => 'get category - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if(isset($mounted_categoriy) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_categoriy, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function getBestSelled(){
        try{
            $categories = Order
                            ::join('product_orders as po', 'po.order_id', '=', 'orders.id')
                            ->join('products as p', 'p.id', '=', 'po.product_id')
                            ->join('categories as c', 'c.id', '=', 'p.category_id')
                            ->groupBy('c.id')
                            ->limit(10)
                            ->select('c.id', 'c.name')
                            ->get();
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar as categorias em destaque.'];
            Log::create([
                'type' => 'category',
                'information' => 'get_best_seller category - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if(isset($categories) && !isset($error)){
            return response()->json(['success' => true, 'data' => $categories, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($id, Request $request){
        $data = $request->all();

        try{
            if(isset($data['name'])){
                $update_values['name'] = $data['name'];
            }
            if(isset($data['description'])){
                $update_values['description'] = $data['description'];
            }

            $category = Category::where('id', $id)->update($update_values);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a categoria.'];
            Log::create([
                'type' => 'category',
                'information' => 'update category - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if(isset($category) && !isset($error) && $category){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a categoria.'];
            Log::create([
                'type' => 'category',
                'information' => 'update category - ERROR',
                'data' => "no save data"
            ]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function delete($id){

        $product = Product::where('category_id', $id)->first();

        if(is_null($product)){
            try{
                $category = Category::where('id', $id)->delete();
            }catch(\Exception $exception){
                $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a categoria.'];
                Log::create([
                    'type' => 'category',
                    'information' => 'delete category - ERROR',
                    'data' => substr($exception->getMessage(), 0, 300)
                ]);
            }

            if(isset($category) && !isset($error) && $category){
                return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
            }else{
                $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a categoria.'];
                Log::create([
                    'type' => 'category',
                    'information' => 'delete category - ERROR',
                    'data' => "no delete data"
                ]);
            }
        }else{
            $error = ['code' => 2, 'error_message' => 'Essa categoria está relacionada a uma venda.'];
            Log::create([
                'type' => 'category',
                'information' => 'delete category - ERROR',
                'data' => "category is in product"
            ]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
