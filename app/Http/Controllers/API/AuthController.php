<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
    //
   public function login(Request $request) {
      $rules = [
         "email" => "required|string|email",
         "password" => "required|string",
      ];

      $validator = Validator::make($request->all(), $rules);
      
      if ($validator->fails()) {
         return response()->json([
               "message" => $validator->errors(),
         ], 400);
      }
      
      $credentials = $request->only("email", "password");
      $authToken = Auth::attempt($credentials);
      
      if (!$authToken) {
         return response()->json([
               "status" => false,
               "message" => "Provided email or password is incorrect",
         ], 401);
      }

      $user = Auth::user();
      $token = $user->createToken("main")->plainTextToken;

      return response()->json([
         "message" => "Successfully logged in",
         "user" => $user,
         "token" => $token,
      ]);
   }

   public function signup(Request $request) {
      
      $rules = [
         "name" => "required|string|max:255",
         "email" => "required|string|email|max:255|unique:users",
         "password" => "required|string|min:6",
      ];

      $validator = Validator::make($request->all(), $rules);

      if ($validator->fails()) {
         return response()->json([
               "message" => $validator->errors(),
         ], 400);
      }
      
      $user = User::create([
         "name" => $request->name,
         "email" => $request->email,
         "password" => Hash::make($request->password),
      ]);

      $token = $user->createToken("main")->plainTextToken;

      return response()->json([
         "user" => $user,
         "token" => $token,
         "message" => "User created successfully",
      ]);
   }

   public function logout(Request $request) {
      $user = $request->user();
      $user->currentAccessToken()->delete();

      return response()->json([
         'message' => "Successfully logged out"
      ], 200);
   }
}
