<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reporthistory extends Model
{
    use HasFactory;

    protected $casts = [
        'forapproval' => 'array',
        'returntose' => 'array',
        'approved' => 'array',
        'cancelled' => 'array'
    ];

    public $timestamps=false;
}
