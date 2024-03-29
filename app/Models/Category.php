<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'parent_id'];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
    public function User(){
        return $this->belongsTo('App\Models\User');
    }
    public function budget(){
        return $this->belongsTo('App\Models\Budget');
    }
    public function Transaction(){
        return $this->belongsTo('App\Models\Transaction');
    }

}
