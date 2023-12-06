<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    public function index()
    {
        // Assuming you have a model named AboutUs and a column named 'content'
        $aboutUsContent = \App\Models\AboutUs::first()->content;

        return response()->json(['content' => $aboutUsContent]);
    }
}
