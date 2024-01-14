<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Transaction;

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
        return $this->hasMany('App\Models\Income');
    }
    public function expense(){
        return $this->hasMany('App\Models\Expense');
    }
    public function Transaction(){
        return $this->belongsToMany(Transaction::class, 'account_id');
    }
} 
