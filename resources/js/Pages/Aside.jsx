import React from "react";
import NavLink from '@/Components/NavLink';

export default function Aside() {
    return (
      <div className="flex flex-col bg-white min-h-screen w-64">
      <div className="flex flex-col justify-between px-2 mt-4">
          <NavLink href={route('dashboard')} active={route().current('dashboard')}>
              Dashboard
          </NavLink>
          <NavLink href={route('Category.index')} active={route().current('Category.create')}>
              Category
          </NavLink>
          <NavLink href={route('Budget.index')} active={route().current('Budget.index')}>
             Budget
          </NavLink>
          <NavLink href={route('Transaction.index')} active={route().current('Transaction.index')}>
             Transaction
          </NavLink>
          <NavLink href={route('Account.index')} active={route().current('Account.index')}>
             Account
          </NavLink>
      </div>
  </div>
    );
}
