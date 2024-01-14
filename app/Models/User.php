<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function budget(){
        return $this->hasMany('App\Models\Budget');
    }
    public function account(){
        return $this->hasMany('App\Models\account');
    }
    public function expense(){
        return $this->hasMany('App\Models\Expense');
    }
    public function income(){
        return $this->hasMany('App\Models\Income');
    }
    public function category(){
        return $this->hasMany('App\Models\Income');
    }
    public function transaction(){
        return $this->hasMany('App\Models\Transaction');
    }

}
