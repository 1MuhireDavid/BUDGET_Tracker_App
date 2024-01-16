<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\User;
use App\Models\Transaction;
use App\Models\Account; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
class IncomeController extends Controller
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
        return Inertia::render('Budget/NewIncome');
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
         $this->validate($request, [
            'category' => 'required|numeric',
            'income' => 'required|numeric',
            'account' => 'required|numeric',
            'date' => 'required|date',
            'time' => 'required',
            'notes' => 'nullable|string',
            'senders' => 'nullable|string',
        ]);

        $income = new Income;
        $transaction = new Transaction;

        // Retrieve the account based on the account name
        $account = Account::where('name', $request->input('account'))
        ->where('user_id', auth()->user()->id)
        ->first();

        if (!$account) {
        // Handle the case where the account is not found
        return redirect()->back()->with('error', 'Account not found');
        }

        DB::transaction(function () use ($request, $account) {
 //        Create a new income entry in the database
 //       $income = Income::create($validatedData);
            $transaction->amount = $request->input('income');
            $transaction->category_id = $request->input('category');
            $transaction->account_id = $request->input('account');
            $transaction->date = $request->input('date');
            $transaction->time = $request->input('time');
            $transaction->notes = $request->input('notes');
            $transaction->type = "income";
            $transaction->receiver = $request->input('senders');
            $transaction->user_id = auth()->user()->id;
            $transaction->save();

// Update the account amount
            $account->value += $request->input('income');
            $account->save();

            //  // Create a new transaction
            // Transaction::create([
            //     'category_id' => $request->input('category'),
            //     'account_id' => $request->input('account'),
            //     'amount' => $request->input('income'),
            //     'user_id' => auth()->user()->id,
            // ]);
        });

        // Optionally, return a response or redirect as needed
        return Redirect::to('/Account')->with('message' , 'Income added successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Income  $income
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
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
