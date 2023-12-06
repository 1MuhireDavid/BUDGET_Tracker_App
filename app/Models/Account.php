<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'value', 'notes'];
    public function User(){
        return $this->belongsTo('App\Models\User');
    }
    public function budget(){
        return $this->belongsTo('App\Models\Budget');
    }
    public function income(){
        return $this->belongsTo('App\Models\Income');
    }
    public function expense(){
        return $this->belongsTo('App\Models\Expense');
    }
}
