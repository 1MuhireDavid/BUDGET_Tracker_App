<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;
    public function User(){
        return $this->belongsTo('App\Models\User');
    }
    public function income(){
        return $this->hasMany('App\Models\Income');
    }
    public function expense(){
        return $this->hasMany('App\Models\Expense');
    }
    public function category(){
        return $this->hasMany('App\Models\Category');
    }
    public function account(){
        return $this->hasMany('App\Models\account');
    }

}
