<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ChatController;
use App\Http\Controllers\API\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post("/login", [AuthController::class, 'login']);
Route::post("/signup", [AuthController::class, 'signup']);
// Route::post("/logout", [AuthController::class, 'logout']);

Route::middleware("auth:sanctum")->group(function () {
   Route::get("/user", [AuthController::class, "user"]);
   Route::post("/logout", [AuthController::class, 'logout']);
   
   Route::get("/chat/with/{user}", [ChatController::class, "getChatBetweenUsers"]);
   Route::get("/chat/{chat}/get_users", [ChatController::class, "getChatUsers"]);
   Route::get("/chat/{chat}/get_messages", [ChatController::class, "getMessages"]);
   Route::get("/users", [ChatController::class, "getUsers"]);

   Route::post("/messages", [MessageController::class, "store"]);
   Route::get("/messages/{chat}", [MessageController::class, "getChatMessages"]);
});
