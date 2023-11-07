<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Otp;

class OtpController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['send_otp','sample','v_code']]);
    }

    public function sample(){
        // $end_user = DB :: table('enduser')->get();
        // foreach ($end_user as $p) {
        //     echo $p->end_user;

        //     $d = New Dropdown;
        //     $d->name=$p->end_user;
        //     $d->type = 'enduser';
        //     $d->save();
        // }

        // return response([$p]);
    }


    public function send_otp(Request $req){
        $u = User :: where('email','=',$req->email)->count();

        if($u>0){
            return response([
                'message'=>'email is already exists',
                'notification'=>2
            ]);
        }

        $otp = Otp :: where([
            ['primarykey','=',$req->email],
            ['type','=',$req->otptype],
            ['status','=',0]
        ])
        ->limit(1)
        ->orderBy('id','desc');

        $str_result = '0123456789';
        $v_code=substr(str_shuffle($str_result),0, 6);
        
        if($otp->count()==0){
            $otp= New Otp;
            $otp->otp=$v_code;
            $otp->primarykey=$req->email;
            $otp->type=$req->otptype;
            $otp->save();
        }else{
            $otp->update(array(
                'otp'=>$v_code
            ));
        }

        $activeemail = DB :: table('activeemails')->first();

        require base_path("vendor/autoload.php");
        $mail = new PHPMailer();

        try {
            $mail->isSMTP(); 
            $mail->Host = 'smtp.office365.com';
            $mail->SMTPAuth   = true; 
            $mail->Username   = $activeemail->email; // SMTP username
            $mail->Password   = $activeemail->password; // SMTP password
            $mail->SMTPSecure = 'TLS'; 
            
            $mail->Port = 587;
            $mail->setFrom($activeemail->email, $activeemail->fullname);
            $mail->addAddress($req->email);

            $mail->isHTML(true);  // Set email content format to HTML

            $mail->Subject = "One time password";
            $html = $this->send_email($v_code);
            $mail->Body = $html;

            if($mail->send() ) {
                return response(['message'=>'Verification code has been sent to your email','notification'=>1]);
            }
            return response(['message'=>'Verification code has been sent to your email','notification'=>1]);
        }catch (Exception $e) {
            return response(['message'=>'Email Sending Failed. INFO:'.$mail->ErrorInfo,'notification'=>2]);
        }
    }

    public function v_code(Request $req){
        $u = User :: where('email','=',$req->email)->count();
        if($u===0){
            return response([
                'message'=>"Invalid email",
                'notification'=>2
            ]);
        }

        $otp = Otp :: where([
            ['primarykey','=',$req->email],
            ['type','=',$req->otptype],
            ['status','=',0]
        ])
        ->limit(1)
        ->orderBy('id','desc');

        $str_result = '0123456789';
        $v_code=substr(str_shuffle($str_result),0, 6);

        if($otp->count()==0){
            $otp= New Otp;
            $otp->otp=$v_code;
            $otp->primarykey=$req->email;
            $otp->type=$req->otptype;
            $otp->save();
        }else{
            $otp->update(array(
                'otp'=>$v_code
            ));
        }

        $activeemail = DB :: table('activeemails')->first();

        require base_path("vendor/autoload.php");
        $mail = new PHPMailer();

        try {
            $mail->isSMTP(); 
            $mail->Host = 'smtp.office365.com';
            $mail->SMTPAuth   = true; 
            $mail->Username   = $activeemail->email; // SMTP username
            $mail->Password   = $activeemail->password; // SMTP password
            $mail->SMTPSecure = 'TLS'; 
            
            $mail->Port = 587;
            $mail->setFrom($activeemail->email, $activeemail->fullname);
            $mail->addAddress($req->email);

            $mail->isHTML(true);  // Set email content format to HTML

            $mail->Subject = "One time password";
            $html = $this->send_email($v_code);
            $mail->Body = $html;

            if($mail->send() ) {
                return response(['message'=>'Verification code has been sent to your email','notification'=>1]);
            }
            return response(['message'=>'Verification code has been sent to your email','notification'=>1]);
        }catch (Exception $e) {
            return response(['message'=>'Email Sending Failed. INFO:'.$mail->ErrorInfo,'notification'=>2]);
        }
    }

    public function send_email($otp){
        return(
            '
            <html>
                <style>
                    .img_logo{
                        margin:30px;
                        width:200px;
                        align:center;
                    }

                    .txt_style{
                        color:gray;
                        font-family:verdana;
                    }

                    .div_1{
                        margin-left:20px;
                    }

                    .div_2{
                        margin-right:200px;
                    }

                    .card_1{
                        background-color: rgb(255, 255, 255);
                        width:600px;
                        position:absolute;
                        left: 0;
                        right: 0;
                        margin: auto;
                        margin-bottom:60px;
                    }
                </style>

                <body style="background-color:#f7f9fc">
                        <br><br><br><br><br>
                        <div class="card_1">
                            <center>
                                <img class="img_logo" src="https://storage.googleapis.com/stateless-mec-ph-storage/2019/11/0f576898-cropped-316200ef-mec-menu-logo-blue.png" />
                            </center>
                            <div class="div_1" style="margin-top:30px">
                                <h5 class="txt_style">Hi there!</h5>
                            </div>
                            <div class="div_1" style="margin-top:30px">
                                <h5 class="txt_style">Here is your One Time Password '.$otp.'. Please do not share this code to anyone.</h5>
                            </div>
                            <div class="div_1" style="margin-top:30px">
                                <h5 class="txt_style">If you have any questions please contact us directly with this email.</h5>
                            </div>
                            <div class="div_2" style="margin-top:50px">
                                <h5 style="text-align:right;" class="txt_style">Regards,</h5>
                            </div>
                            <div class="div_3" style="margin-top:0px">
                                <h5 style="text-align:right;margin-right:130px" class="txt_style">TPO DEPARTMENT</h5>
                            </div>
                            <br><br>
                        </div>                    
                </body>
            </html>
            '
        );
    }
}
