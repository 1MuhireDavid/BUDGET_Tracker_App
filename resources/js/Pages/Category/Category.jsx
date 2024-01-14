import { useEffect, useState, useTransition } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react'
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TabButton from '@/Components/TabButton';
import ExpenseTab from './ExpenseTab';
import IncomeTab from './IncomeTab';


export default function Category(props) {
  const { budgets} = usePage().props; 
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('income');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }


 

  return (
    <AuthenticatedLayout
    auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Category</h2>}
    
    >
      
    <div className='mx-4 space-y-4'>
    <Head title="Category" />

    <div className="flex justify-center items-center gap-4">
      <TabButton
        isActive={tab === 'income'}
        onClick={() => selectTab('income')}
      >
        Income
      </TabButton>
      <TabButton
        isActive={tab === 'expense'}
        onClick={() => selectTab('expense')}
      >
        Expense
      </TabButton>
      </div>
      <hr />
      {tab === 'income' && <IncomeTab Category={props.Category}/>}
      {tab === 'expense' && <ExpenseTab Category={props.Category}/>}
    </div>
    </AuthenticatedLayout>
  );
}
