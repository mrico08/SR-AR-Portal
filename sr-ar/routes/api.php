<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DropdownController;
use App\Http\Controllers\ActionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;

Route::post('image', function (Request $req) {
    $dataUrl1 = [];
    if(isset($req->sesign)){
        foreach ($req->sesign as $c) {
            $imagePath =  public_path("signature/".$c[1]);
            $imageData = base64_encode(file_get_contents($imagePath));
            $dataUrl1[] = [$c[0],'data:image/png;base64,' . $imageData];
        }
    }

    $dataUrl2 = null;
    if(isset($req->conformesign)){
        $imagePath =  public_path("signature/".$req->conformesign);
        $imageData = base64_encode(file_get_contents($imagePath));
        $dataUrl2 = 'data:image/png;base64,' . $imageData;
    }

    $dataUrl3 = null;
    if(isset($req->approversign)){
        $imagePath =  public_path("signature/".$req->approversign);
        $imageData = base64_encode(file_get_contents($imagePath));
        $dataUrl3 = 'data:image/png;base64,' . $imageData;
    }
    
    return response()->json(['dataUrl1' => $dataUrl1,'dataUrl2' => $dataUrl2,'dataUrl3' => $dataUrl3]);
});
 
// AuthController
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
    Route::post('change_status',[AuthController::class,'change_status']);
    Route::post('change_profile',[AuthController::class,'change_profile']);
    Route::post('reset_password',[AuthController::class,'reset_password']);
});

// Usercontrolle
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('userlist',[UserController::class,'userlist']);
    Route::get('profile_info/{id}',[UserController::class,'profile_info']);
    Route::post('changedesig',[UserController::class,'changedesig']);
});

// Otpcontroller
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::get('sample',[OtpController::class,'sample']);
    Route::post('send_otp',[OtpController::class,'send_otp']);
    Route::post('v_code',[OtpController::class,'v_code']);
});

// ReportController
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('c_srreport',[ReportController::class,'c_srreport']);
    Route::post('c_arreport',[ReportController::class,'c_arreport']);
    Route::post('g_report',[ReportController::class,'g_report']);
    Route::post('seg_report',[ReportController::class,'seg_report']);
    Route::post('creatorg_report',[ReportController::class,'creatorg_report']);
    Route::post('v_details',[ReportController::class,'v_details']);
    Route::post('ar_sr_search',[ReportController::class,'ar_sr_search']);
    Route::post('r_details',[ReportController::class,'r_details']);    
});

// NotificationController
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    // Route::post('noticounter',[NotificationController::class,'noticounter']);
    // Route::post('notificationlist',[NotificationController::class,'notificationlist']);
    // Route::post('viewnotification',[NotificationController::class,'viewnotification']);
});

// ActionController
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('update_srreport',[ActionController::class,'update_srreport']);
    Route::post('update_arreport',[ActionController::class,'update_arreport']);
    Route::post('s_report',[ActionController::class,'sign_report']);
    Route::post('conforme_report',[ActionController::class,'conforme_report']);   
    Route::post('se_report',[ActionController::class,'se_report']); 
    Route::post('u_arreport',[ActionController::class,'u_arreport']);
    Route::post('u_srreport',[ActionController::class,'u_srreport']);
    Route::post('r_se',[ActionController::class,'returntose']);
    Route::post('a_report',[ActionController::class,'approvereport']);
    Route::post('c_report',[ActionController::class,'cancel_report']);
});

// DropdownController
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('g_partnerenduser',[DropdownController::class,'g_partnerenduser']);
    Route::get('selist',[DropdownController::class,'selist']);
    Route::post('categorylist',[DropdownController::class,'categorylist']);
    Route::post('addcategory',[DropdownController::class,'addcategory']);
    Route::post('action',[DropdownController::class,'action']);
    Route::post('change_password',[AuthController::class,'change_password']);
});

// Dashboard
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::get('se_dashboard/{email}',[DashboardController::class,'se_dashboard']);
    Route::get('creator_dashboard/{email}',[DashboardController::class,'creator_dashboard']);
    Route::get('delegator_dashboard',[DashboardController::class,'delegator_dashboard']);
});