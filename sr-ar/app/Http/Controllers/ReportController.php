<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Srreport;
use App\Models\Arreport;
use App\Models\Reporthistory;
use Carbon\Carbon;


class ReportController extends Controller
{
    public function c_srreport(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");

        $searray = [];
        $seinfo = [];
        $startDate = Carbon::parse($req->datefrom);
        $endDate = Carbon::parse($req->dateto); 
        $diff = $endDate->diffInDays($startDate);


        foreach ($req->se as $c) {
            $searray[] = $c['engineer'][0];
            $seinfo1= array($c['engineer'][0]=>$c['engineer']);
            $seinfo = array_merge($seinfo,$seinfo1);
        }

        $i=0;
        $startdate = Carbon::createFromFormat('Y-m-d', $req->datefrom);
            
        while($i<=$diff){
            $sr = New Srreport;
            $sr->sano = $req->sano;
            $sr->project = $req->project;
            $sr->caseno = $req->caseno;
            $sr->c_cname = $req->c_cname;
            $sr->c_saddress = $req->c_saddress;
            $sr->c_cperson = $req->c_cperson;
            $sr->c_contact = $req->c_contact;
            $sr->r_cname = $req->r_cname;
            $sr->r_reported = $req->r_reported;
            $sr->r_cperson = $req->r_cperson;
            $sr->r_contact = $req->r_contact;
            $sr->date_created = $date;
            $sr->assignse = $searray;
            $sr->seinfo = $seinfo;
            $sr->site_date = $startdate->toDateString();
            $sr->creator = $req->email;
            $sr->c_details = [$req->email,$req->name,$req->profile];
            $sr->save();

            $startdate=$startdate->addDay();
            $i++;
        }
        
        return response(['message'=>'New Service Report has been saved successfully.','notification'=>1,'selist'=>[...$searray,$req->email]]);
    }

    public function c_arreport(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d H:i:s");

        $startDate = Carbon::parse($req->datefrom);
        $endDate = Carbon::parse($req->dateto); 
        $diff = $endDate->diffInDays($startDate);
        
        $searray = [];
        $seinfo = [];
        foreach ($req->se as $c) {
            $searray[] = $c['engineer'][0];
            $seinfo1= array($c['engineer'][0]=>$c['engineer']);
            $seinfo = array_merge($seinfo,$seinfo1);
        }

        $i=0;
        $startdate = Carbon::createFromFormat('Y-m-d', $req->datefrom);
            
        while($i<=$diff){
            $sr = New Arreport;
            $sr->designno = $req->designno;
            $sr->c_cname = $req->c_cname;
            $sr->c_saddress = $req->c_saddress;
            $sr->c_cperson = $req->c_cperson;
            $sr->c_contact = $req->c_contact;
            $sr->r_cname = $req->r_cname;
            $sr->r_reported = $req->r_requested;
            $sr->r_cperson = $req->r_cperson;
            $sr->r_contact = $req->r_contact;
            $sr->date_created = $date;
            $sr->assignse = $searray;
            $sr->seinfo = $seinfo;
            $sr->creator = $req->email;
            $sr->c_details = [$req->email,$req->name,$req->profile];
            $sr->site_date = $startdate->toDateString();
            $sr->save();

            $startdate=$startdate->addDay();
            $i++;
        }

        return response(['message'=>'New Service Report has been saved successfully.','notification'=>1,'selist'=>[...$searray,$req->email]]);
    }

    public function g_report(Request $req){
        $date=date("Y-m-d");
        $title="";

        $r = DB:: table('viewreports');
        if(isset($req->sr_no)){
            $r= $r->where([
                ['type','=',$req->category],
                ['status','=',$req->status],
                ['sr_no','LIKE',"{$req->sr_no}%"]
            ]);
        }else{
            if($req->reporttype===1 || $req->reporttype===2){
                $r= $r->where('type','=',$req->reporttype);
            }

            if(isset($req->from) && isset($req->to)){
                $from=Carbon::parse($req->from)->startOfDay();
                $to=Carbon::parse($req->to)->endOfDay();
            }else{
                $start = date("Y-m-d",strtotime("-1 months"));
                $from=Carbon::parse($start)->startOfDay();
                $to=Carbon::parse($date)->endOfDay();
            }

            $r=$r->where([
                ['date_created','>=',$from],
                ['date_created','<=',$to],
                ['status','=',$req->status],
            ]);

            if(isset($req->from) && isset($req->to)){
                $title= "Record from ".$req->from." to ".$req->to;
            }else{
                $title= "Record from ".$start." to ".$date."(today)";
            }
        }

        $r = $r->orderBy('sr_no','asc')->get();

        return response([$r,$title]);
    }

    public function creatorg_report(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d");
        $title="";
        
        if(isset($req->sr_no)){            
            $r = DB:: table('viewreports')
            ->where([
                ['creator','=',$req->email],                
                ['type','=',$req->category],
                ['status','=',$req->status],
                ['sr_no','LIKE',"{$req->sr_no}%"]
            ]);
        }else{
            $r = DB:: table('viewreports')
                ->where([
                    ['status','=',$req->status],
                    ['creator','=',$req->email]
                ]);

            if(isset($req->from) && isset($req->to)){
                $from=Carbon::parse($req->from)->startOfDay();
                $to=Carbon::parse($req->to)->endOfDay();
                $r=$r->where([
                    ['date_created','>=',$from],
                    ['date_created','<=',$to],
                ]);

                $title= "Record from ".$req->from." to ".$req->to ;
            }else{
                $start = date("Y-m-d",strtotime("-1 months"));
                $from=Carbon::parse($start)->startOfDay();
                $to=Carbon::parse($date)->endOfDay();
                $r=$r->where([
                    ['date_created','>=',$from],
                    ['date_created','<=',$to],
                ]);


                $title= "Record from ".$start." to ".$date."(today)";
            }
        }

        $r = $r->orderBy('sr_no','asc')->get();
        return response([$r,$title]);
    }

    public function seg_report(Request $req){
        date_default_timezone_set('Asia/Manila');
        $date=date("Y-m-d");
        $title="";
        if(isset($req->sr_no)){            
            $r = DB:: table('viewreports')
            ->whereJsonContains('assignse',$req->email);
            
            $r= $r->where([
                ['type','=',$req->category],
                ['status','=',$req->status],
                ['sr_no','LIKE',"{$req->sr_no}%"]
            ]);
        }else{
            $r = DB:: table('viewreports')
                ->whereJsonContains('assignse',$req->email)
                ->where('status','=',$req->status);

            if(isset($req->from) && isset($req->to)){
                $from=Carbon::parse($req->from)->startOfDay();
                $to=Carbon::parse($req->to)->endOfDay();
                $r=$r->where([
                    ['date_created','>=',$from],
                    ['date_created','<=',$to],
                ]);

                $title= "Record from ".$req->from." to ".$req->to ;
            }else{
                $start = date("Y-m-d",strtotime("-1 months"));
                $from=Carbon::parse($start)->startOfDay();
                $to=Carbon::parse($date)->endOfDay();
                $r=$r->where([
                    ['date_created','>=',$from],
                    ['date_created','<=',$to],
                ]);


                $title= "Record from ".$start." to ".$date."(today)";
            }
        }

        $r = $r->orderBy('sr_no','asc')->get();
        return response([$r,$title]);
    }

    public function v_details(Request $req){
        if($req->rtype===1){
            $r = DB :: table('srreports');
        }else if($req->rtype===2){
            $r = DB :: table('arreports');
        }

        $r=$r->where('sr_no','=',$req->value)->first();
        return ($r);
    }

    public function ar_sr_search(Request $req){
        if($req->rtype2==='1'){    
            $report = Srreport::where('type','=',1);
        }
        else if ($req->rtype2==='2'){
            $report = Arreport::where('type','=',2);
        }
        
        if (isset($req->rnum))
        {
            $report = $report->where('sr_no','Like',"%$req->rnum%");
        }
        $report = $report->limit(10);
        
        return response($report->get());        
    }

    public function r_details(Request $req){
        $r = Reporthistory :: where([
            ['sr_no','=',$req->srno],
            ['type','=',$req->reporttype]
        ]);
        


        if($req->status==1){
            return response($r->first()->forapproval);
        }else if($req->status==2){
            return response($r->first()->returntose);
        }else if($req->status==3){
            return response($r->first()->approved);
        }else if($req->status==4){
            return response($r->first()->cancelled[0]);
        }

        
    }




}