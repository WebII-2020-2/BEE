<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;

class JwtMiddleware
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
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['success' => false, 'data' => null, 'error' => ['code' => 1, 'error_message' => 'Token invalido']]);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['success' => false, 'data' => null, 'error' => ['code' => 1, 'error_message' => 'Token expirado']]);
            }else{
                return response()->json(['success' => false, 'data' => null, 'error' => ['code' => 1, 'error_message' => 'Token de autorização não encontrado']]);
            }
        }

        return $next($request);
    }
}
