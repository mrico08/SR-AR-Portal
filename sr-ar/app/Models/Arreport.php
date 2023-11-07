<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arreport extends Model
{
    use HasFactory;

    protected $casts = [
        'assignse' => 'array',
        'seinfo' => 'array',
        's_information' => 'array',
        't_activity' => 'array',
        'se_sign' => 'array',
        'c_details' => 'array'
    ];

    public $timestamps=false;
}
