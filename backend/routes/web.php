<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Patient Registration API',
        'status' => 'running',
    ]);
});
