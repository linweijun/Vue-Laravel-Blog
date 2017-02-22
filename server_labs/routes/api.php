<?php

use Illuminate\Http\Request;
use App\http\Controllers\Auth;

Route::get('test', function(){
  return response([1,2,3,4],200);
});
Route::post('/register',"Auth\RegisterController@register");
Route::get('/register', "Auth\RegisterController@showRegistrationForm");
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
