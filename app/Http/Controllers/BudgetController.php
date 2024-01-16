<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class BudgetController extends Controller
{
    /** 
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      //  $post = Post::orderBy('created_at',' desc')->paginate(10); 
      $user = auth()->user();
          $budgets = Budget::all();
          return Inertia::render('Budget/IndexBudget', ['budgets' => $budgets]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Budget/Budget');
    } 

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'income' => 'required', 
            'category' => 'required', 
            'account' => 'required', 
        ]); 

        $budget = new Budget;
        $budget->value = $request->input('income');
        $budget->category = $request->input('category');
        $budget->account = $request->input('account');
        $budget->user_id = auth()->user()->id;
        $budget->save();

        return Redirect::to('/Budget')->with('success','budget_created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         $budget = Budget::findOrFail($id);
         
        return Inertia::render('Budget/OneBudget', ['abudget' => $budget]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function edit($id): Response
    {
        
        return Inertia::render('Budget/OneBudget', ['abudget' => $budget]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $this->validate($request, [
            'income' => 'required', 
            'category' => 'required', 
            'account' => 'required', 
        ]); 

        $budget =Budget::find($id);
        $budget->value = $request->input('income');
        $budget->category = $request->input('category');
        $budget->account = $request->input('account');
        $budget->save();

        return Redirect::to('/Budget')->with('success','budget_updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Budget  $budget
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $budget = Budget::find($id);
        $budget -> delete();
        return Redirect::to('/Budget');
    }
}
