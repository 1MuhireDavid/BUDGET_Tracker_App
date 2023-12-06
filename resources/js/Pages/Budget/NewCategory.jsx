import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function NewCategory(props) {
  const { data, setData, post, processing } = useForm({
    name: '',
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('Category.store'), data); // Assuming your API expects the entire data object.
  };

  return ( 
    <AuthenticatedLayout
    auth={props.auth}
      errors={props.errors}
    >
      <Head title="New Category" />

      <form onSubmit={submit}>
        <div>
          <h3>Category Name</h3>
          <TextInput
            id="name"
            type="text"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            onChange={handleOnChange}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" disabled={processing}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}
