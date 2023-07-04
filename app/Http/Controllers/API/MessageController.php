<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    //
    public function __construct() {
      // $this->middleware("auth:api");
   }

    public function getChatMessages(Chat $chat) {
      if (!$chat->users()->find(auth()->id()) ) {
         return response()->json([
            "status" => false,
            "message" => "Unauthorized",
         ], 403);
      }
      $messages = $chat->messages()->with("user")->get();

      return response()->json([
         "status" => true,
         "message" => "Successfully retrieved messages",
         "messages" => $messages,
      ]);
   }

   public function store(Request $request) {
      $rules = [
         "chat_id" => "required|exists:chats,id",
         "content" => "required|string",
      ];

      $validator = validator($request->all(), $rules);
      if ($validator->fails()) {
         return response()->json([
            "status" => false,
            "content" => $validator->errors(),
         ], 400);
      }

      $chat = Chat::find($request->chat_id);
      if (!$chat->users()->find(auth()->id()) ) {
         return response()->json([
            "status" => false,
            "content" => "Unauthorized",
         ], 403);
      }
      

      $message = auth()->user()->messages()->create([
         "chat_id" => $request->chat_id,
         "content" => $request->content,
      ])->load("user");
      
      broadcast(new MessageSent($message))->toOthers();

      return response()->json([
         "status" => true,
         "message" => "Successfully stored message",
         "messageCreated" => $message,
      ]);
   }
}
