<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
  
Route::get('/dashboard', function () {
    $account = Account::all();
    $category = Category::all();
    $transaction = Transaction::with(['Category', 'Account'])->orderBy('created_at', 'desc')->limit(5)->get();
    return Inertia::render('Dashboard')->with(['categorys' => $category, 'accounts' => $account, 'Transactions'=> $transaction]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::resource('Budget', BudgetController::class);
Route::resource('Expense', ExpenseController::class);
Route::resource('Income', IncomeController::class);
Route::resource('Category', CategoryController::class);
Route::resource('Account', AccountController::class);
Route::resource('Transaction', TransactionController::class);

Route::resource('About', AboutUsController::class);
require __DIR__.'/auth.php';
 