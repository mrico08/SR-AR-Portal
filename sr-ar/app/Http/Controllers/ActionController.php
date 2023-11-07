<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Srreport;
use App\Models\Arreport;
use App\Models\Reporthistory;
use Validator;

class ActionController extends Controller
{
    public function update_srreport(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");
        
        $u = Srreport :: where('sr_no','=',$req->srno);
        if($u->count()==0){
            return response(
                ['message'=>'Request Failed','notification' => 2]
            );            
        }

        $u->update([
            's_information'=>$req->serviceinformation,
            't_service'=>$req->t_service,
            'p_information'=>$req->productinformation,
            'purpose'=>$req->purpose,
            'action_taken'=>$req->a_taken,
            'finding'=>$req->findings,
            'pending'=>$req->n_action,
            'recommendation'=>$req->recommendation,
            'remarks'=>$req->remarks,
            'last_update'=>$date,
        ]);

        return response(
            ['message'=>'Record has been updated successfully.','notification' => 1]
        );
    }

    public function update_arreport(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");
        
        $u = Arreport :: where('sr_no','=',$req->srno);
        if($u->count()==0){
            return response(
                ['message'=>'Request Failed','notification' => 2]
            );            
        }
        

        $u->update([
            's_information'=>$req->serviceinformation,
            't_activity'=>$req->t_activity,
            'p_information'=>$req->productinformation,
            'a_description'=>$req->a_description,
            'a_assessment'=>$req->a_assessment,
            'pending'=>$req->n_action,
            'remarks'=>$req->remarks,
            'last_update'=>$date
        ]);

        return response(
            ['message'=>'Record has been updated successfully.','notification' => 1]
        );
    }

    public function sign_report(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d-H:i:s");

        if($req->rtype==1){
            $r = Srreport :: where('sr_no','=',$req->sr_no);
        }else if($req->rtype==2){
            $r = Arreport :: where('sr_no','=',$req->sr_no);
        }

        if($r->count()==0){
            return response(
                ['message'=>'Request Failed.','notification' => 2]
            );
        }

        $u=$r->first();

        $selist =$u->assignse;
        $creator =$u->creator;
        $sesign = $u->se_sign;

        if($sesign==null){
            return response(
                ['message'=>'Request Failed.','notification' => 2]
            );
        }


        foreach ($selist as $s) {            
            if(array_key_exists($s, $sesign)==false){
                return response(
                    ['message'=>'Request Failed.','notification' => 2]
                );
            }
        }

        $r->update([
            'for_approval_date'=>$date,
            'status'=>1
        ]);

        $h = Reporthistory :: where([
            ['sr_no','=',$req->sr_no],
            ['type','=',$req->rtype],
        ]);

        $r_array = array($req->email=>[$req->name,$req->email,$req->profile,$date]);
        if($h->count()>0){
            $h->update(['forapproval'=>$r_array]);
        }else{
            $hi = New Reporthistory;
            $hi->sr_no = $req->sr_no;
            $hi->type = $req->rtype;
            $hi->forapproval = $r_array;
            $hi->save();
        }

        return response(
            ['message'=>'Record has been submitted successfully.','notification' => 1,'selist' => [...$selist,$creator]]
        );
    }

    public function u_arreport(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");
        
        $validator = Validator::make($req->all(),[
            'designno' => 'required', 
            'c_cname' => 'required',
            'c_saddress' => 'required',
            'c_cperson' => 'required',
            'c_contact' => 'required',
            'r_cname' => 'required',
            'r_requested' => 'required',
            'r_cperson' => 'required',
            'r_contact' => 'required',
        ]);

        if($validator->fails()){
            return response([$validator->errors(),'notification'=>3]);
        };

        $searray = [];
        $seinfo = [];
        $sevalidator = false;
        foreach ($req->se as $c) {
            if(count($c['engineer'])>0){
                $searray[] = $c['engineer'][0];
                $seinfo1= array($c['engineer'][0]=>$c['engineer']);
                $seinfo = array_merge($seinfo,$seinfo1);
                $sevalidator=true;
            }
        }

        if($sevalidator===false){
            return response(['message'=>'Assign Engineer required.','notification'=>4]);
        }


        $sr = Arreport :: where([
                ['sr_no','=',$req->arno],
            ])
            ->whereNotIn('status',[3,4]);

        if($sr->count()==0){
            return response(['message'=>'Request Failed.','notification'=>2]);
        }

        $sr2 = $sr->first();
        $si=$sr2->s_information;
        $s_information= [];
        if(count($si)>0){
            foreach ($searray as $s) {
                $key = array_search($s, array_column($si,'se'));
                
                if($key===false){
                    $s_information[] = array('date'=>null,'timein'=>'00:00','timeout'=>'00:00','breakfrom'=>'00:00','breakto'=>'00:00','se'=>$s);
                }else{
                    $s_information[] = $si[$key];
    
                }
            }
        }

        $selist = [];
        $assign=$sr2->assignse;
        $assign2=$sr2->assignse;
        $searray2=$searray;

        foreach($assign as $s){
            if(!isset($seinfo[$s])){
                $selist[]=$s;
            }else{
                $searray2=array_diff($searray2,[$s]);
            }
        }               

        $selist = array_merge($selist,$searray2);

        $sr->update([
            'designno' => $req->designno,
            'c_cname' => $req->c_cname,
            'c_saddress' => $req->c_saddress,
            'c_cperson' => $req->c_cperson,
            'c_contact' => $req->c_contact,
            'r_cname' => $req->r_cname,
            'r_reported' => $req->r_requested,
            'r_cperson' => $req->r_cperson,
            'r_contact' => $req->r_contact,
            'assignse' => $searray,
            'seinfo' => $seinfo,
            's_information'=>$s_information
        ]);


        return response(['message'=>'AR Report has been updated successfully.','notification'=>1,'selist'=>$selist]);
    }

    public function u_srreport(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");
        
        $validator = Validator::make($req->all(),[
            'c_cname' => 'required',
            'c_contact' => 'required',
            'c_cperson' => 'required',
            'c_saddress' => 'required',
            'r_cname' => 'required',
            'r_contact' => 'required',
            'r_cperson' => 'required',
            'r_reported' => 'required',
            'project' => 'required',
            'sano' => 'required',
            'caseno' => 'required',
        ]);

        if($validator->fails()){
            return response([$validator->errors(),'notification'=>3]);
        };

        $searray = [];
        $seinfo = [];
        $sevalidator = false;
        
        foreach ($req->se as $c) {
            if(count($c['engineer'])>0){
                $searray[] = $c['engineer'][0];
                $seinfo1= array($c['engineer'][0]=>$c['engineer']);
                $seinfo = array_merge($seinfo,$seinfo1);
                $sevalidator=true;
            }
        }

        if($sevalidator===false){
            return response(['message'=>'Assign Engineer required.','notification'=>4]);
        }


        $sr = Srreport :: where([
                ['sr_no','=',$req->srno],
            ])
            ->whereNotIn('status',[3,4]);

        if($sr->count()==0){
            return response(['message'=>'Request Failed.','notification'=>2]);
        }
        $sr2 = $sr->first();
        $si=$sr2->s_information;

        $s_information= [];
        if(count($si)>0){
            foreach ($searray as $s) {
                $key = array_search($s, array_column($si,'se'));
                
                if($key===false){
                    $s_information[] = array('date'=>null,'timein'=>'00:00','timeout'=>'00:00','breakfrom'=>'00:00','breakto'=>'00:00','se'=>$s);
                }else{
                    $s_information[] = $si[$key];

                }
            }
        }

        $selist = [];
        $assign=$sr2->assignse;
        $assign2=$sr2->assignse;
        $searray2=$searray;

        foreach($assign as $s){
            if(!isset($seinfo[$s])){
                $selist[]=$s;
            }else{
                $searray2=array_diff($searray2,[$s]);
            }
        }

        $selist = array_merge($selist,$searray2);

        $sr->update([
            'project'=>$req->project,
            'sano'=>$req->sano,
            'caseno'=>$req->caseno,
            'c_cname'=>$req->c_cname,
            'c_saddress'=>$req->c_saddress,
            'c_cperson'=>$req->c_cperson,
            'c_contact'=>$req->c_contact,
            'r_cname'=>$req->r_cname,
            'r_reported'=>$req->r_reported,
            'r_cperson'=>$req->r_cperson,
            'r_contact'=>$req->r_contact,
            'assignse' => $searray,
            'seinfo' => $seinfo,
            's_information'=>$s_information
        ]);

        return response(['message'=>'SR Report has been updated successfully.','notification'=>1,'selist'=>$selist]);
    }

    public function returntose(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");
        
        $validator = Validator::make($req->all(),[
            'email' => 'required', 
            'name' => 'required',
            'notes' => 'required',
            'profile' => 'required',
            'reporttype' => 'required',
            'srno'=>'required',
        ]);

        if($validator->fails()){
            return response(['message'=>'Request Failed','notification'=>2]);
        };

        if($req->reporttype==1){
            $r = Srreport::where([
                ['sr_no','=',$req->srno],
                ['status','=',1]
            ]);
        }else if($req->reporttype==2){
            $r = Arreport::where([
                ['sr_no','=',$req->srno],
                ['status','=',1]
            ]);
        }


        if($r->count()===0){
            return response(['message'=>'Request Failed','notification'=>2]);
        }

        $selist=$r->first()->assignse;
        $creator=$r->first()->creator;

        $h = Reporthistory :: where([
            ['sr_no','=',$req->srno],
            ['type','=',$req->reporttype],
        ]);

        $r->update(['status'=>2,'return_date'=>$date]);

        $r_array[] = array('date'=>$date,'update_by'=>[$req->name,$req->email,$req->profile],'notes'=>$req->notes);


        if($h->count()>0){
            $crse =$h->first()->returntose;
            $h->update(['returntose'=>array_merge($crse,$r_array)]);
        }else{
            $hi = New Reporthistory;
            $hi->sr_no = $req->srno;
            $hi->type = $req->reporttype;
            $hi->returntose = $r_array;
            $hi->save();
        }

        return response(['message'=>'Report has been returned to Engineer','notification'=>1,'selist'=>[...$selist,$creator]]);
    }

    public function approvereport(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");
        $date1=date("Ymd-His");
        
        $validator = Validator::make($req->all(),[
            'email' => 'required', 
            'name' => 'required',
            'name1' => 'required',
            'profile' => 'required',
            'reporttype' => 'required',
            'srno'=>'required',
        ]);

        if($validator->fails()){
            return response(['message'=>'Request Failed','notification'=>2]);
        };

        if($req->reporttype==1){
            $r= Srreport :: where([
                ['sr_no','=',$req->srno],
                ['status','=',1],
            ]);
        }else if($req->reporttype==2){
            $r= Arreport :: where([
                ['sr_no','=',$req->srno],
                ['status','=',1],
            ]);
        }

        if($r->count()==0){
            return response(['message'=>'Request Failed','notification'=>2]);
        }

        $str_result = 'abcdefghijklmnop123456789';
        if($req->choose=="upload"){
            $file = $req->file('url');
            $g_filename=$date1.'-'.substr(str_shuffle($str_result),0, 15);
            $filename = $g_filename.'.'.$file->extension();
            $file->move(public_path('signature'), $filename);
        }else if($req->choose=="sign"){
            $image_parts = explode(";base64,", $req->url);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $filename = $date1.'-'.substr(str_shuffle($str_result),0, 15). '.'.$image_type;
            $file = "signature/" . $filename ;
            file_put_contents($file, $image_base64);
        }

        $selist = $r->first()->assignse;
        $creator = $r->first()->creator;

        $r->update([
            'approver_name'=>$req->name,
            'approver_sign'=>$filename,
            'approved_date'=>$date,
            'status'=>3
        ]);

        $h = Reporthistory :: where([
            ['sr_no','=',$req->srno],
            ['type','=',$req->reporttype],
        ]);

        $r_array = array($req->email=>['date'=>$date,'update_by'=>[$req->name,$req->email,$req->profile],'approver'=>[$req->name1,$req->email,$req->profile]]);

        if($h->count()>0){
            $h->update(['approved'=>$r_array]);
        }else{
            $hi = New Reporthistory;
            $hi->sr_no = $req->srno;
            $hi->type = $req->reporttype;
            $hi->approved = $r_array;
            $hi->save();
        }
    
        return response(['message'=>'Report has been approved successfully.','notification'=>1,'selist'=>[...$selist,$creator]]);
    }

    public function cancel_report(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");

        $validator = Validator::make($req->all(),[
            'email' => 'required', 
            'name' => 'required',
            'profile' => 'required',
            'reporttype' => 'required',
            'srno'=>'required',
        ]);

        if($validator->fails()){
            return response(['message'=>'Request Failed','notification'=>2]);
        };

        if($req->reporttype==1){
            $r = Srreport::where('sr_no','=',$req->srno)
                ->whereIn('status',[0,2]);
        }else if($req->reporttype==2){
            $r = Arreport::where('sr_no','=',$req->srno)
                ->whereIn('status',[0,2]);;
        }
        
        if($r->count()===0){
            return response(['message'=>'Request Failed','notification'=>2]);
        }

        $selist = $r->first()->assignse;
        $creator = $r->first()->creator;

        $r->update(['status'=>4,'cancelled_date'=>$date]);

        $h = Reporthistory :: where([
            ['sr_no','=',$req->srno],
            ['type','=',$req->reporttype],
        ]);
        

        $r_array[] = array('date'=>$date,'update_by'=>[$req->name,$req->email,$req->profile],'notes'=>$req->notes);

        if($h->count()>0){
            $crse =$h->first()->cancelled;        
            $h->update(['cancelled'=>array_merge($crse,$r_array)]);
        }else{
            $hi = New Reporthistory;
            $hi->sr_no = $req->srno;
            $hi->type = $req->reporttype;
            $hi->cancelled = $r_array;
            $hi->save();
        }

        return response(['message'=>'Report has been cancelled.','notification'=>1,'selist'=>[...$selist,$creator]]);
    }

    public function conforme_report(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d-H:i:s");
        $date1=date("Ymd-His");
        $str_result = 'abcdefghijklmnop123456789';
        $filename = null;
        
        if($req->rtype=='1'){
            $u = Srreport :: where('sr_no','=',$req->sr_no);
        }else if($req->rtype=='2'){
            $u = Arreport :: where('sr_no','=',$req->sr_no);
        }

        if($u->count()==0){
            return response(
                ['message'=>'Request Failed.','notification' => 2]
            );
        }

        if($req->choose2=="sign"){
            if($req->conforme==null){
                return response(
                    ['message'=>"Authorized client's name required.",'notification' => 2]
                );
            }
        }else if($req->choose2=="upload"){
            if($req->conforme!=null && $req->hasfile('url2')==false){
                return response(
                    ['message'=>"Authorized client's name and signature required.",'notification' => 2]
                );
            }
        }

        if($req->choose2=="sign"){
            $image_parts = explode(";base64,", $req->url2);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $filename = $date1.'-'.substr(str_shuffle($str_result),0, 15). '.'.$image_type;
            $file = "signature/" . $filename;
            file_put_contents($file, $image_base64);            
        }else if($req->choose2=="upload"){
            if($req->hasfile('url2')==true){
                $file = $req->file('url2'); 
                $g_filename=$date1.'-'.substr(str_shuffle($str_result),0, 15);
                $filename = $g_filename.'.'.$file->extension();
                $file->move(public_path('signature'), $filename);
            }
        }

        $u->update([
            'conforme_name'=>$req->conforme,
            'conforme_sign'=>$filename,
            'last_update'=>$date
        ]);
    
        return response(
            ['message'=>"Authorized client's signatured has been saved successfully.",'notification' => 1]
        );
    }

    public function se_report(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d-H:i:s");
        $date1=date("Ymd-His");
        $str_result = 'abcdefghijklmnop123456789';
        $filename = null;

        if($req->rtype=='1'){
            $u = Srreport :: where('sr_no','=',$req->sr_no);
        }else if($req->rtype=='2'){
            $u = Arreport :: where('sr_no','=',$req->sr_no);
        }
    
        if($u->count()==0){
            return response(
                ['message'=>'Request Failed.','notification' => 2]
            );
        }


        if($req->choose=="sign"){
            if($req->se==null){
                return response(
                    ['message'=>"Authorized client's name required.",'notification' => 2]
                );
            }
        }else if($req->choose=="upload"){
            if($req->se!=null && $req->hasfile('url')==false){
                return response(
                    ['message'=>"Authorized client's name and signature required.",'notification' => 2]
                );
            }
        }


        if($req->choose=="sign"){
            $image_parts = explode(";base64,", $req->url);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $filename = $date1.'-'.substr(str_shuffle($str_result),0, 15). '.'.$image_type;
            $file = "signature/" . $filename;
            file_put_contents($file, $image_base64); 
        }else if($req->choose=="upload"){
            if($req->hasfile('url')==true){
                $file = $req->file('url'); 
                $g_filename=$date1.'-'.substr(str_shuffle($str_result),0, 15);
                $filename = $g_filename.'.'.$file->extension();
                $file->move(public_path('signature'), $filename);
            }
        }

        $sign_array = array($req->email=>[$req->se,$filename]);

        $sesign=$u->first()->se_sign;
        if($sesign!==null){
            $sign_array = array_merge($sesign,$sign_array);            
        }

        $u->update([
            'se_sign'=>$sign_array,
            'last_update'=>$date
        ]);


        return response($sign_array);
        return response($req);
    }















}