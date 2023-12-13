<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;
    public function User(){
        return $this->belongsTo('App\Models\User');
    }
    public function budget(){
        return $this->belongsTo('App\Models\Budget');
    }
    public function account(){
        return $this->hasMany('App\Models\account');
    }
}
