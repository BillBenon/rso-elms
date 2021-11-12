import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { authenticatorService } from '../../services/administration/authenticator.service';
import { institutionStore } from '../../store/institution.store';
import { GenericStatus, ValueType } from '../../types';
import { BasicInstitutionInfo } from '../../types/services/institution.types';

export default function NewInstitution() {
  const history = useHistory();
  const [values, setValues] = useState<BasicInstitutionInfo>({
    current_admin_id: '',
    head_office_location_id: 17445,
    email: '',
    fax_number: '',
    full_address: '',
    generic_status: GenericStatus.ACTIVE,
    mission: '',
    moto: '',
    name: '',
    phone_number: '',
    postal_code: '',
    short_name: '',
    website_link: '',
    id: '',
  });
  const handleChange = (e: ValueType) => {
    setValues({ ...values, [e.name]: e.value });
  };

  const { mutateAsync } = institutionStore.create();

  useEffect(() => {
    const getUser = async () => {
      const user = await authenticatorService.authUser();
      setValues({
        ...values,
        current_admin_id: user.data.data.id + '',
      });
    };

    getUser();
  }, []);

  function handleSubmit<T>(e: FormEvent<T>) {
    send(e);
    async function send(e: FormEvent<T>) {
      e.preventDefault();
      await mutateAsync(values, {
        onSuccess(data) {
          toast.success(data.data.message);
          history.push('/dashboard/users');
        },
        onError() {
          toast.error('error occurred');
        },
      });
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
      <div className="hidden lg:flex justify-center items-center h-screen">
        <img src="/icons/login.svg" alt="login" className="block w-10/12" />
      </div>
      <div className="py-8 md:py-12 lg:py-16 px-6">
        <Heading color="primary" fontWeight="semibold" fontSize="3xl">
          Create a new institution
        </Heading>
        <div className="pb-8"></div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2">
          <div className="py-4">
            <InputMolecule
              name="name"
              value={values.name}
              placeholder="Rwanda National Police"
              handleChange={(e) => handleChange(e)}>
              Institution name
            </InputMolecule>
          </div>
          <div className="py-4">
            <InputMolecule
              name="email"
              value={values.email}
              placeholder="rnp@gov.rw"
              handleChange={(e) => handleChange(e)}>
              Institution email
            </InputMolecule>
          </div>
          <div className="py-4">
            <InputMolecule
              name="phone_number"
              value={values.phone_number}
              placeholder="Phone number"
              handleChange={(e) => handleChange(e)}>
              Institution Phone number
            </InputMolecule>
          </div>
          <div className="py-4">
            <InputMolecule
              name="website_link"
              required={false}
              value={values.website_link}
              placeholder="www.rnp.gov.rw"
              handleChange={(e) => handleChange(e)}>
              Institution website(optional)
            </InputMolecule>
          </div>
          <div className="py-4">
            <TextAreaMolecule
              name="moto"
              value={values.moto}
              placeholder="Motto"
              handleChange={(e) => handleChange(e)}>
              Institution motto
            </TextAreaMolecule>
          </div>
          <div className="py-4">
            <TextAreaMolecule
              name="mission"
              value={values.mission}
              placeholder="Mission"
              handleChange={(e) => handleChange(e)}>
              Institution mission
            </TextAreaMolecule>
          </div>
          <div className="py-4">
            <TextAreaMolecule
              name="full_address"
              value={values.full_address}
              placeholder="Address"
              handleChange={(e) => handleChange(e)}>
              Institution HQ address
            </TextAreaMolecule>
          </div>
          <div className="py-4 col-span-2">
            <ILabel className="block pb-1">Institution logo</ILabel>
            <Button styleType="outline">Upload logo</Button>
          </div>
          <div className="py-4 col-span-2">
            <Button onClick={() => handleSubmit} type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
