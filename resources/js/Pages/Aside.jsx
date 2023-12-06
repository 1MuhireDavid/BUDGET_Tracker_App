import React from "react";
import NavLink from '@/Components/NavLink';

export default function Aside() {
    return (
      <div className="flex flex-col bg-sky-200 min-h-screen w-64">
      <div className="flex flex-col justify-between">
          <NavLink href={route('dashboard')} active={route().current('dashboard')}>
              Dashboard
          </NavLink>
          <NavLink href={route('Category.create')} active={route().current('Category.create')}>
              Create Category
          </NavLink>
      </div>
  </div>
    );
}
