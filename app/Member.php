<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    // the table associated with the model
    protected $table = 'member';

    // the attributes that are mass assignable
    protected $fillable = [];

    // hidden fields
    protected $hidden = ['updated_at'];
}
