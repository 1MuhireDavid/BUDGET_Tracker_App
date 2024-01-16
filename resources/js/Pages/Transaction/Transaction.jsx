import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function Transaction(props) {
    console.log(props.Transactions)
  return (
      <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Transactions</h2>}
      >
        {props.Transactions.map((transaction) => (
        <div className="flex justify-between items-center h-14 bg-white m-3 p-2 shadow-sm sm:rounded-lg"  key={transaction.id} >
        <div className="">
        <p>{transaction.category.name}</p>
        <p>{transaction.account.name}</p>
        </div>
        <div className="text-end">
            <p>{transaction.amount}</p>
            <p>{transaction.date}</p>
            </div>
          
        </div>
      ))}
      </AuthenticatedLayout>
  )
}
