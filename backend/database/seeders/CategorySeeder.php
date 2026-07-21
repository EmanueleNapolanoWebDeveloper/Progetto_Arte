<?php

namespace Database\Seeders;

use App\Models\Admin\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $taxonomy = [
            'Pittura' => ['Olio su tela', 'Acrilico', 'Acquerello', 'Tempera', 'Pittura murale'],
            'Scultura' => ['Marmo', 'Bronzo', 'Legno', 'Terracotta', 'Installazioni'],
            'Fotografia' => ['Analogica', 'Digitale', 'Still life', 'Ritratto', 'Fine art print'],
            'Illustrazione e grafica' => ['Illustrazione digitale', 'Disegno a mano', 'Fumetto e concept art'],
            'Arte digitale' => ['Arte generativa', '3D art', 'Digital painting'],
            'Ceramica' => ['Raku', 'Terracotta artistica', 'Porcellana'],
            'Incisione e stampa d\'arte' => ['Xilografia', 'Acquaforte', 'Litografia', 'Serigrafia'],
            'Arte tessile' => ['Arazzo', 'Fiber art', 'Ricamo artistico'],
        ];


        $order = 0;
        foreach ($taxonomy as $parentName => $children) {
            $parent = Category::updateOrCreate(
                ['slug' => Str::slug($parentName)],
                [
                    'name' => $parentName,
                    'parent_id' => null,
                    'display_order' => $order,
                    'is_active' => true,
                ]
            );

            $childOrder = 0;
            foreach ($children as $childName) {
                Category::updateOrCreate(
                    ['slug' => Str::slug($parentName . '-' . $childName)],
                    [
                        'name' => $childName,
                        'parent_id' => $parent->id,
                        'display_order' => $childOrder,
                        'is_active' => true,
                    ]
                );
                $childOrder++;
            }

            $order++;
        }
    }
}
