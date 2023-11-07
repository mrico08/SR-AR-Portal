<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Otp;


class AuthController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login','register','reset_password']]);
    }

    public function register(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");

        $user1 = User :: where('email','=',$req->email);
        if($user1->count()>0){
            return response(
                ['message'=>'Sorry email is already exists, Username must have unique value.','notification' => 2]
            );
        }

        $otp = Otp :: where([
            ['otp','=',$req->otp],
            ['primarykey','=',$req->email],
            ['type','=','signup'],
            ['status','=',0],
        ]);

        if($otp->count()===0){
            return response(
                ['message'=>'Invalid verification code.','notification' => 2]
            );
        }

        // update as used
        $otp->update(['status'=>1]);

        // upload
        $file=$req->file('upload_image');
        $filename=$file->store('profile_picture', ['disk' => 'public']);

        $credential = DB :: table('access_pages')->where([
            ['role','=',$req->designation],
            ['type','=',0],
            ['status','=',0],
        ])->first();


        $user= New User;
        $user->name=$req->fullname;
        $user->email=$req->email;
        $user->password=Hash::make($req->password);
        $user->role=[$req->designation];
        $user->se_team=$req->se_unit;
        $user->sales_team=$req->s_unit;
        $user->profile=basename($filename);
        $user->created_at=$date;
        $user->updated_at=$date;
        $user->user_access = json_decode($credential->credentials);
        $user->save();


        return response(
            ['message'=>'Registration successfully completed.','notification' => 1]
        );
    }
 
    public function login(Request $req){        
        $validator = Validator::make($req->all(),[
            // 'email'=>'required|email',
            'password'=>'required|string|min:6',
        ]);

        if($validator->fails()){
            return response(['message'=>'Invalid Request','notification'=>2]);
        };

        if(!$token=Auth::attempt(['email'=>$req->username,'password'=>$req->password])){
            return response(['message'=>'Invalid Request','notification'=>2]);
        }


        
        $user=auth()->user();

        if($user->email!=$req->username){
            return response(['message'=>'Invalid Request','notification'=>2]);
        }else if($user->verified===0){
            return response(['message'=>'Invalid Request','notification'=>2]);
        }else if($user->verified===2){
            return response(['message'=>'Invalid Request','notification'=>2]);
        }

        return $this->createNewToken($token);
    }

    public function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'user'=> auth() -> user(),
            'notification'=>1,
        ]);
    }

    

    public function change_status(Request $req){
        $user = User::find($req->id1);
        $user->verified=$req->status;

        $user->update();
        return response(['Update Successful']);
    }

    public function change_profile(Request $req){
        $file=$req->file('upload_image');

        $user=User :: where('email','=',$req->email);        
        $user1=$user->first();

        // unlink("profile_picture/".$user1->profile_image);
        
        $filename=$file->store('profile_picture', ['disk' => 'public']);

        $user->update(array(
            'profile'=>basename($filename),
        ));
        
        return response ([
            'message'=>'Profile picture has been updated successfully.',
            'notification'=>1,
            'profile'=>basename($filename),
        ]);
    }

    public function reset_password(Request $req){
        $otp= Otp::where ([
            ['otp','=',$req->otp],
            ['status','=',0]
        ]);
        
        if($otp->count()==0){
            return response([
                'message'=>'Invalid Verication Code',
                'notification'=>2,
            ]);
        }


        if($req->email != $otp->first()->primarykey){
            return response([
                'message'=>'Request Failed',
                'notification'=>2,
            ]);
        }


        $user = User::where([
            ['email','=',$req->email],
        ]);


        if(Hash::check($req->password, $user->first()->password)){
            return response([
                'message'=>'Your new password should not be the same as your current password.',
                'notification'=>3,
            ]);
        }

        $user->update(array('password'=>Hash::make($req->password)));
        $otp->update(array('status'=>1));
        
        return response([
            'message'=>'Password has been reset successfully',
            'notification'=>1,
        ]);
    }

    public function change_password(Request $req){
        $user = User::find($req->id);

        $otp = Otp :: where([
            ['otp','=',$req->otp],
            ['primarykey','=',$req->email],
            ['type','=','change_pass'],
            ['status','=',0],
        ]);

        if($otp->count()===0){
            return response(
                ['message'=>'Invalid verification code.','notification' => 2]
            );
        }

        // update as used
        $otp->update(['status'=>1]);

        if (!Hash::check($req->passwordInput1, $user->password))
        {
            return response(["message"=>"Current Password is Invalid.","notification"=>2]);
        }

        if ($req->passwordInput1 == $req->passwordInput2)
        {
            return response(["message"=>"Old Password and New Password cannot be the same.","notification"=>2]);
        }

        $user->password = Hash::make($req->passwordInput2);
        $user->save();

       return response(["message"=>"Password changed successfully","notification"=>1]);
    }
}
