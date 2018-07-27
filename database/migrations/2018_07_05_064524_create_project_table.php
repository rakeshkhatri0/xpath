<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('owner_id');
            $table->unsignedInteger('assign_id')->nullable();
            $table->string('project_name', 100);
            $table->string('version', 50)->nullable();
            $table->enum('status', ['NEW', 'INPROGRESS', 'CANCELLED', 'COMPLETED'])->default('NEW');
            $table->unsignedTinyInteger('is_active')->default(1);
            $table->Text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project');
    }
}
