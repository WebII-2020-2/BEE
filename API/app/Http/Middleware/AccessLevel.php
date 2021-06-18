<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AccessLevel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try{
            $user_level = Auth::user()->level_access;
            if($user_level == 2){
                return $next($request);
            }else{
                $error = ['code' => 1, 'error_message' => 'Você não tem permissão para acessar essa area.'];
            }
        }catch(\Exception $exception){
            $error = ['code' => 1, 'error_message' => 'Não foi possivel verificar o level de acesso.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
