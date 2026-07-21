<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //recupero sottocategorie con nome macroCategorie
    public function specialties(): JsonResponse
    {
        $categories = Category::query()
            ->whereNotNull('parent_id')
            ->where('is_active', true)
            ->with('parent:id,name')
            ->orderBy('display_order')
            ->get(['id', 'name', 'parent_id']);

        $data = $categories->map(fn(Category $category) => [
            'id' => $category->id,
            'name' => $category->name,
            'parentName' => $category->parent->name,
        ]);

        return response()->json([
            'data' => $data
        ], 200);
    }


}
