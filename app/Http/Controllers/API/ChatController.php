<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
   //

   public function __construct() {
   $this->middleware("auth:api")->except(["show", "chatWith"]);
   
   }

   public function show(Chat $chat) {
      abort_unless($chat->users->contains(auth()->id()), 403);

      return view("chat", ["chat" => $chat]);
   }


   public function getChatBetweenUsers(User $user) {
      $actualUser = auth()->user();
      $anotherUser = $user;
      $action = "retrieve";
      $chat = $actualUser->chats()->whereHas("users", function ($query) use ($anotherUser) {
         $query->where("chat_user.user_id", $anotherUser->id);
      })->first();

      if (!$chat) {
         $chat = Chat::create([]);
         $action = "create";
         $chat->users()->sync([$actualUser->id, $anotherUser->id]);
      }

      return response()->json([
         "status" => true,
         "message" => "Successfully retrieved chat",
         "action" => $action,
         "chat" => $chat,
      ]);
   }

   public function chatWith(User $user) {


      // return response()->json([
      //    "status" => true,
      //    "message" => "Successfully retrieved chat",
      //    "action" => $action,
      //    "chat" => $chat,
      // ]);
   }
}
