<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateAdminDefault extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Fabio',
            'email' => 'fabio@banana.com',
            'password' => Hash::make('fabiobanana123'),
            'level_access' => 2
        ]);

        return 'OK';
    }
}
