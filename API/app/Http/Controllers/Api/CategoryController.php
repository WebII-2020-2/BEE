<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
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
        }

        if(isset($result_category) && !isset($error)){
            return response()->json(['success' => true, 'data' => $result_category, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);


    }

    public function show(){
        try{
            $categories = Category::all();
            $mounted_categories = [];
            foreach($categories as $category){
                $count = Product::where('category_id', $category->id)->count("id");
                array_push($mounted_categories, array(
                    'id' => $category->id,
                    'name' => $category->name,
                    'description' => $category->description,
                    'count_products' => $count
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar as categorias.'];
        }

        if(isset($mounted_categories) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_categories, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update(Request $request){
        $data = $request->all();

        try{
            if(isset($data['name'])){
                $update_values['name'] = $data['name'];
            }
            if(isset($data['description'])){
                $update_values['description'] = $data['description'];
            }

            $category = Category::where('id', $data['id'])->update($update_values);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a categoria.'];
        }

        if(isset($category) && !isset($error) && $category){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function delete(Request $request){
        $data = $request->all();

        try{
            $category = Category::where('id', $data['id'])->delete();
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar a categoria.'];
        }

        if(isset($category) && !isset($error) && $category){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
