<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = [
          'name' => 'admin',
          'email' => 'admin@admin.com',
          'password' => Hash::make('admin'),
        ];

        User::create($user1);
    }
}
