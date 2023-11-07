<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function creator_dashboard($email){
        $r = DB:: table('viewreports')
            ->where('creator','=',$email)
            ->selectRaw('count(sr_no) as count_report,status')
            ->groupby('status')
            ->orderBy('status','asc')
            ->get();

        return response($r);
    }

    public function se_dashboard($email){
        $r = DB:: table('viewreports')
            ->whereJsonContains('assignse',$email)
            ->selectRaw('count(sr_no) as count_report,status')
            ->groupby('status')
            ->orderBy('status','asc')
            ->get();

        return response($r);
    }
    
    public function delegator_dashboard(){
        $r = DB:: table('viewreports')
            // ->whereJsonContains('assignse',$email)
            ->selectRaw('count(sr_no) as count_report,status')
            ->groupby('status')
            ->orderBy('status','asc')
            ->get();

        return response($r);
    }

    public function admin_dashboard(){

    }
}
