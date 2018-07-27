<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthMember
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->session()->get('is_logged')) {
            return $next($request);
        } else {
            return response([
                'status' => false,
                'is_redirect' => true,
                'msg' => 'Session expired. Redirect to login.'
            ]);
        }
    }
}
