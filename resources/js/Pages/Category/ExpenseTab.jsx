import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ExpenseTab(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAccountId, setEditAccountId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data, setData, post, processing } = useForm({
    name: '',
    type: "expense",
  }); 

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('Category.store'), data); // Assuming your API expects the entire data object.
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
    <div className="">
    {props.Category.filter((category) => category.type === "expense").map((category) => (
        <div className="flex justify-between items-center h-14 bg-white m-3 p-2 rounded-lg" key={category.id} >
          <div className="">
          <p>{category.name}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="absolute bottom-4 right-4 bottom-3 fixed">
    <button onClick={toggleModal}><FontAwesomeIcon icon={faCirclePlus} className="w-12 h-12 mr-2 fa-4x" color="red"/></button>
      <Modal show={showModal} onClose={toggleModal}>
      <div className='mx-4 space-y-4'>
      <Head title="Budget" />

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
      
    </div>
          </Modal>
          </div>
    </>
  )
}
