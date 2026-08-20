<?php

namespace App\Http\Controllers;

class ContactController extends Controller
{
 
//
public function index()
    {
        return view('contacts.index');
    }

    public function store(Request $request)
    {
        // Validate and store the contact data
    }
    public function show($id)
    {
        // Retrieve and display the contact details
    }
    public function update(Request $request, $id)
    {
        // Validate and update the contact data
    }
    public function destroy($id)
    {
        // Delete the contact
    }   
}