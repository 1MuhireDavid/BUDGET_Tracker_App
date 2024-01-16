<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Account; 
use App\Models\Expense;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $user = auth()->user();
        $transactions = Transaction::with(['Category', 'Account'])->get();
        return Inertia::render('Transaction/Transaction', ['Transactions' => $transactions]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $transaction = new Transaction;
        $this->validate($request, [
            'category' => 'required|numeric',
            'income' => 'numeric',
            'value' => 'numeric',
            'account' => 'required|numeric',
            'date' => 'required|date',
            'time' => 'required',
            'notes' => 'nullable|string',
            'senders' => 'nullable|string',
        ]);


         // Retrieve the account based on the account name
         $account = Account::where('id', $request->input('account'))
         ->where('user_id', auth()->user()->id)
         ->first();
 
         if (!$account) {
         // Handle the case where the account is not found
         return redirect()->back()->with('error', 'Account not found');
         }
         //dd($request->input('income') ?: $request->input('value'));
 
         DB::transaction(function () use ($request, $account, $transaction) {
             $transaction->amount = $request->input('income');
             $transaction->category_id = $request->input('category');
             $transaction->account_id = $request->input('account');
             $transaction->date = $request->input('date');
             $transaction->time = $request->input('time');
             $transaction->notes = $request->input('notes');
             $transaction->type = $request->input('type');
             $transaction->receiver = $request->input('senders');
             $transaction->user_id = auth()->user()->id;
             $transaction->save();
 
 // Update the account amount
            if($request->input('type') === 'income'){
                $account->value += $request->input('income');
                        $account->save();
            }
            else
            {
                $account->value -= $request->input('income');
                        $account->save();
            }
                        
 
         });
 
         // Optionally, return a response or redirect as needed
         return Redirect::to('/Account')->with('message' , 'Income added successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\transaction  $transaction
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
     * @param  \App\Models\transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $transaction =Transaction::find($id);
        $this->validate($request, [
            'category' => 'required|numeric',
            'income' => 'numeric',
            'value' => 'numeric',
            'account' => 'required|numeric',
            'date' => 'required|date',
            'time' => 'required',
            'notes' => 'nullable|string',
            'senders' => 'nullable|string',
        ]);


         // Retrieve the account based on the account name
         $account = Account::where('id', $request->input('account'))
         ->where('user_id', auth()->user()->id)
         ->first();
 
         if (!$account) {
         // Handle the case where the account is not found
         return redirect()->back()->with('error', 'Account not found');
         }
         //dd($request->input('income') ?: $request->input('value'));
 
         DB::transaction(function () use ($request, $account, $transaction) {
             $transaction->amount = $request->input('income');
             $transaction->category_id = $request->input('category');
             $transaction->account_id = $request->input('account');
             $transaction->date = $request->input('date');
             $transaction->time = $request->input('time');
             $transaction->notes = $request->input('notes');
             $transaction->type = $request->input('type');
             $transaction->receiver = $request->input('senders');
             $transaction->user_id = auth()->user()->id;
             $transaction->save();
 
 // Update the account amount
            if($request->input('type') === 'income'){
                $account->value += $request->input('income');
                        $account->save();
            }
            else
            {
                $account->value -= $request->input('income');
                        $account->save();
            }
                        
 
         });
 
         // Optionally, return a response or redirect as needed
         return Redirect::to('/Account')->with('message' , 'Income updated successfully');
   
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transaction = Transaction::find($id);
        $transaction -> delete();
        return Redirect::to('/Transaction');
    }
}