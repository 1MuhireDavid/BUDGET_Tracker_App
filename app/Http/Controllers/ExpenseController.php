<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Account;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $account = Account::all();
        $category = Category::all();
        return Inertia::render('Budget/NewExpense')->with(['categorys' => $category, 'accounts' => $account]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
          // Validate the incoming request data
          $validatedData = $request->validate([
            'category' => 'required|string',
            'value' => 'required|numeric',
            'account' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'notes' => 'nullable|string',
            'to'=> 'nullable|string',
        ]);

        
       // $expense = Expense::create($validatedData);
       $expense = new Expense;
       $transaction = new Transaction;
       // Retrieve the account based on the account name
       $account = Account::where('name', $request->input('account'))
       ->where('user_id', auth()->user()->id)
       ->first();

       if (!$account) {
       // Handle the case where the account is not found
       return redirect()->back()->with('error', 'Account not found');
       }
       
       DB::transaction(function () use ($expense, $account, $request) {

            // Create a new expense entry in the database

            $transaction->type = "expense";
            $expense->amount = $request->input('value');
            $expense->category = $request->input('category');
            $expense->account = $request->input('account');
            $expense->date = $request->input('date');
            $expense->time = $request->input('time');
            $expense->notes = $request->input('notes');
            $expense->receiver = $request->input('to');
            $expense->user_id = auth()->user()->id;
            $expense->save();

          // Update the account amount
                $account->value -= $request->input('value');
                $account->save(); 
// think about category amount by the budget
          // Create a new transaction
            // Transaction::create([
            //     'category_id' => $request->input('category'),
            //     'account_id' => $request->input('account'),
            //     'amount' => $request->input('value'),
            //     'user_id' => auth()->user()->id,
            // ]);



        
    });
            

        // Optionally, return a response or redirect as needed
        return Redirect::to('/dashboard')->with('message','Expense added successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
