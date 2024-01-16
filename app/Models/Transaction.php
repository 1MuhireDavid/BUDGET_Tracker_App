<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{  
    use HasFactory;
    protected $fillable = [
        'category_id',
        'account_id',
        'type',
        'date',
        'time',
        'notes',
        'receiver',
        'amount',
        'user_id',
    ];
    public function User(){
        return $this->belongsTo('App\Models\User');
    }
    public function category(){
        return $this->belongsTo('App\Models\Category');
    }
    public function account(){
        return $this->belongsTo('App\Models\Account');
    }
}
