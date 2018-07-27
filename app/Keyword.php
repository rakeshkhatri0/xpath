<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    // the table associated with the model
    protected $table = 'keyword';

    // the attributes that are mass assignable
    protected $fillable = ['keyword'];

    // hidden fields
    protected $hidden = ['updated_at'];

    // project for the keyword
    public function project()
    {
        return $this->hasOne('App\Project');
    }

    // urls for the keyword
    public function url()
    {
        return $this->hasMany('App\Url');
    }
}
