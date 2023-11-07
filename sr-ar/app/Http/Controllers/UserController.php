<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Access_page;


class UserController extends Controller
{
    public function userlist(Request $req){
        $user = User::where('verified', '=', $req->status1);
        if (isset($req->value))
        {
            $user = $user->where('name','Like', "%$req->value%");
        } 
        return response($user->get());
    }

    public function profile_info($id){
        return User::find($id);
    }

    public function changedesig(Request $req){
        $u = User :: where([
            ['id','=',$req->uid],
            ['verified','=',1]
        ])
        ->whereJsonContains('role',$req->value);

        if($u->count()>0){
            $u1=$u->first();
            $user_access = $u1->user_access;
            $role = $u1->role;
            $key =array_search($req->value,$role,true);

            unset($user_access[$req->value]);
            $role1=[];
            foreach($role as $r){
                if($r!==$req->value){
                    $role1[]=$r;
                }
            }

            $u->update([
                'user_access'=>$user_access,
                'role'=>$role1
            ]);

            $user = User :: where('id','=',$req->uid);
        }else{
            $user = User :: where('id','=',$req->uid);
            $user_access = $user->first()->user_access;
            $role = $user->first()->role;

            $credential = Access_page::where('role','=',$req->value)
                ->first();

            $user->update(['user_access'=>array_merge($user_access,$credential->credentials)]);


            $user->update([
                'user_access'=>array_merge($user_access,$credential->credentials),
                'role'=>array_merge($role,[$req->value])
            ]);
        }

        return response($user->first());


    }
}
