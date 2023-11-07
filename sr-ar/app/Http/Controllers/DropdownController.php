<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dropdown;
use Illuminate\Support\Facades\DB;

class DropdownController extends Controller
{
    public function g_partnerenduser(Request $req){
        $d = Dropdown :: where([
            ['type','=',$req->type1],
            ['status','=',0],
        ]);

        if(isset($req->search)){
            $d=$d->where('name','LIKE',"{$req->search}%");
        }
        $d=$d->limit(10);
        
        return response($d->get('name'));    
    }

    public function enduserlist(){
        $d = Dropdown :: where([
            ['type','=','enduser'],
            ['status','=',0],
        ]);
        
        return response($d->get('name'));
    }

    public function partnerlist(){
        $d = Dropdown :: where([
            ['type','=','partner'],
            ['status','=',0],
        ]);
        
        return response($d->get('name'));       
    }

    public function selist(){
        $u = DB :: table('users')
        ->where('verified','=',1)
        ->whereJsonContains('role','System Engineer')
        ->orderBy('name','asc')
        ->get();

        return response($u);
    }

    public function categorylist(Request $req){
        $dropdown = Dropdown::where('type','=',$req->typing)
        ->orderBy('name','asc');
        
        if (isset($req->value1))
        {
            $dropdown = $dropdown->where('name','Like',"%$req->value1%");
        }
        $dropdown = $dropdown->orderBy('name','asc');

        $dropdown = $dropdown->limit(10);
        return response($dropdown->get());
    }

    public function addcategory(Request $req){        
        $category = New Dropdown;
        $category->name=$req->name3;
        $category->type=$req->type3;
        $category->save();

        return response($req);
    }

    public function action (Request $req){
        $dropdown = Dropdown::find($req->id4);
        $dropdown->status=$req->status4;
        $dropdown->update();

        return response(['Success']);
    }
}
