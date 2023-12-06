import { useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function IndexBudget() {
  
  const { budgets } = usePage().props; 
  return (
    <div className='mx-4 space-y-4'>
      <Head title="Budget" />
      <h1>Budgets</h1>

      {/* Render the budget data */}
      {budgets.map((budget) => (
        <div key={budget.id}>
          <p>{budget.category}</p>
          <p>{budget.account}</p>
          <p>{budget.value}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
}
