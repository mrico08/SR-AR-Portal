<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Srreport extends Model
{
    use HasFactory;

    protected $casts = [
        'assignse' => 'array',
        'seinfo' => 'array',
        's_information' => 'array',
        'p_information' => 'array',
        'se_sign' => 'array',
        'c_details' => 'array'

    ];
    
    public $timestamps=false;
}
