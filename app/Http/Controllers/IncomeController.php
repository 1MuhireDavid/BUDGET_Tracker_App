<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

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
            'category' => 'required|string',
            'income' => 'required|numeric',
            'account' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'notes' => 'nullable|string',
            'senders' => 'nullable|string',
        ]);

 //        Create a new income entry in the database
 //       $income = Income::create($validatedData);
            $income = new Income;
            $income->value = $request->input('income');
            $income->category = $request->input('category');
            $income->account = $request->input('account');
            $income->date = $request->input('date');
            $income->time = $request->input('time');
            $income->notes = $request->input('notes');
            $income->from = $request->input('senders');
            $income->user_id = auth()->user()->id;
            $income->save();


        // Optionally, return a response or redirect as needed
        return Redirect::to('/dashboard')->with('message' , 'Income added successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function show(Income $income)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function edit(Income $income)
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
    public function update(Request $request, Income $income)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function destroy(Income $income)
    {
        //
    }
}
