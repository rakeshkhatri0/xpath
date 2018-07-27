<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class project extends Model
{
    // the table associated with the model
    protected $table = 'project';

    // the attributes that are mass assignable
    protected $fillable = ['project_name', 'description'];

    // hidden fields
    protected $hidden = ['updated_at'];

    // project urls
    public function url()
    {
        return $this->hasMany('App\Url');
    }

    // project keywords
    public function keyword()
    {
        return $this->hasMany('App\Keyword');
    }
}
