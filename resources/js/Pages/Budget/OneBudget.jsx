import { useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react'

export default function OneBudget(props) {
    const { abudget } = usePage().props; 
    console.log(abudget);
    return (
      <AuthenticatedLayout
      auth={props.auth}
        errors={props.errors}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{abudget.category}</h2>}
      
      >
        
      <div className='mx-4 space-y-4'>
        <Head title="Budget" />
        <h1>{abudget.category}</h1>
        <p>{abudget.account}</p>
        <p>{abudget.value}</p>

      </div>
      </AuthenticatedLayout>
    );
}
