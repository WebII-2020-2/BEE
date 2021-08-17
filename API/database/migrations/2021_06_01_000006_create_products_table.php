<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->string('name', 100);
            $table->string('unity', 100);
            $table->integer('quantity');
            $table->float('unitary_value');
            $table->text('description');
            $table->string('mime_type', 100);
            $table->binary('image');
            $table->text('stripe_product_id')->nullable();
            $table->text('stripe_sku_id')->nullable();
            $table->timestamps();
        });

        DB::statement("ALTER TABLE products CHANGE COLUMN image image MEDIUMBLOB NOT NULL;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
