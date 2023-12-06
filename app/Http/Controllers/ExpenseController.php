<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

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
        return Inertia::render('Budget/NewExpense');
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

        // Create a new expense entry in the database
       // $expense = Expense::create($validatedData);
        

       $expense = new Expense;
            $expense->value = $request->input('value');
            $expense->category = $request->input('category');
            $expense->account = $request->input('account');
            $expense->date = $request->input('date');
            $expense->time = $request->input('time');
            $expense->notes = $request->input('notes');
            $expense->to = $request->input('to');
            $expense->user_id = auth()->user()->id;
            $expense->save();

        // Optionally, return a response or redirect as needed
        return Redirect::to('/dashboard')->with('message','Expense added successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function edit(Expense $expense)
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
    public function update(Request $request, Expense $expense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expense $expense)
    {
        //
    }
}
