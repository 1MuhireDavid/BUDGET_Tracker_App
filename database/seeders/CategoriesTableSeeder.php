<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $foodAndDrinks = Category::create(['name' => 'Food and Drinks', 'type' => 'expense']);
        $entertainment = Category::create(['name' => 'Entertainment', 'type' => 'expense']);

        // Subcategories
        $subCategory1 = $foodAndDrinks->children()->create(['name' => 'Groceries', 'type' => 'expense']);
        $subCategory2 = $foodAndDrinks->children()->create(['name' => 'Dining Out', 'type' => 'expense']);

    }
}
