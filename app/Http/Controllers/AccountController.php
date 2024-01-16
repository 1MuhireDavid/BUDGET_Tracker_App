<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $accounts = Account::all();
          return Inertia::render('Account/Account')->with('accounts', $accounts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Budget/NewAccount');
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
            'aname' => 'required', 
            'value' => 'required', 
            'notes' => 'nullable', 
        ]);

        $account = new Account;
        $account->name = $request->input('aname');
        $account->value = $request->input('value');
        $account->notes = $request->input('notes');
        $account->user_id = auth()->user()->id;
        $account->save();

        return Redirect::to('/Account')->with('success','Account_created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\account  $account
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\account  $account
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
     * @param  \App\Models\account  $account
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'aname' => 'required', 
            'value' => 'required', 
            'notes' => 'nullable', 
        ]);

        $account = Account::find($id);
        $account->name = $request->input('aname');
        $account->value = $request->input('value');
        $account->notes = $request->input('notes');
        $account->save();

        return Redirect::to('/Account')->with('success','Account_created');
  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\account  $account
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $account = Account::find($id);
        $account -> delete();
        return Redirect::to('/Account');
    }
}