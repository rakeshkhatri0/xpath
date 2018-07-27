<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    // the table associated with the model
    protected $table = 'url';

    // the attributes that are mass assignable
    protected $fillable = ['url'];

    // hidden fields
    protected $hidden = ['updated_at'];

    // project for the url
    public function project()
    {
        return $this->hasOne('App\Project');
    }

    // keyword for the url
    public function keyword()
    {
        return $this->hasOne('App\Keyword');
    }
}
