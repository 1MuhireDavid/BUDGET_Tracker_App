import React from "react";
import NavLink from '@/Components/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faMoneyCheck, faExchangeAlt, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Aside() {
    return (
      <div className="flex flex-col bg-white min-h-screen w-64">
      <div className="flex flex-col justify-between px-4 mt-4 gap-3">
          <NavLink className="gap-2" href={route('dashboard')} active={route().current('dashboard')}>
          <FontAwesomeIcon icon={faHome} />  Dashboard
          </NavLink>
          <NavLink className="gap-2" href={route('Category.index')} active={route().current('Category.create')}>
          <FontAwesomeIcon icon={faList}/>  Category
          </NavLink>
          <NavLink className="gap-2" href={route('Budget.index')} active={route().current('Budget.index')}>
          <FontAwesomeIcon icon={faMoneyCheck} /> Budget
          </NavLink>
          <NavLink className="gap-2" href={route('Transaction.index')} active={route().current('Transaction.index')}>
          <FontAwesomeIcon icon={faExchangeAlt} />  Transaction
          </NavLink>
          <NavLink className="gap-2" href={route('Account.index')} active={route().current('Account.index')}>
          <FontAwesomeIcon icon={faUser} />  Account
          </NavLink>
      </div>
  </div>
    );
}
