<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name',100);
            $table->string('cpf',11)->nullable();
            $table->string('email',100)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('level_access')->default(1);
            $table->date('birth_date')->nullable();
            $table->string('phone',14)->nullable();
            $table->string('password');
            $table->binary('image');
            $table->string('mime_type', 100);
            $table->rememberToken();
            $table->timestamps();
        });

        DB::statement("ALTER TABLE users CHANGE COLUMN image image MEDIUMBLOB NOT NULL;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
