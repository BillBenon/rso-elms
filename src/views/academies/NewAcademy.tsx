import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import { authenticatorService } from '../../services';
import academyStore from '../../store/academy.store';
import { CommonFormProps, ValueType } from '../../types';
import { AcademyCreateInfo } from '../../types/services/academy.types';

export default function AddAcademy<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      const user = await authenticatorService.authUser();
      setDetails((details) => ({
        ...details,
        current_admin_id: user.data.data.id.toString(),
      }));
    };

    getUser();
  }, []);

  const [details, setDetails] = useState<AcademyCreateInfo>({
    current_admin_id: '',
    email: '',
    fax_number: '',
    full_address: '',
    head_office_location_id: 17445,
    institution_id: 'b832407f-fb77-4a75-8679-73bf7794f207',
    mission: '',
    moto: '',
    name: '',
    phone_number: '',
    postal_code: '',
    short_name: '',
    website_link: '',
  });
  const { mutateAsync } = academyStore.createAcademy();

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  async function createAcademy<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (onSubmit) onSubmit(e);

    await mutateAsync(details, {
      onSuccess(data) {
        toast.success(data.data.message);
        history.goBack();
      },
      onError() {
        toast.error('An error occurred please try again later');
      },
    });
  }

  return (
    <>
      <div className="flex flex-wrap justify-start items-center">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Academies
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <ILabel size="sm" color="primary" weight="medium">
          Academy
        </ILabel>
      </div>

      <div className="p-4 pl-6 popup-width gap-3">
        <div className="py-5 mb-3 capitalize">
          <Heading color="primary" fontWeight="bold">
            New academy
          </Heading>
        </div>
        <form onSubmit={createAcademy}>
          <InputMolecule
            name="name"
            placeholder="Type academy name"
            value={details.name}
            handleChange={(e) => handleChange(e)}>
            academy name
          </InputMolecule>
          <InputMolecule
            name="short_name"
            placeholder="Type short name"
            value={details.short_name}
            handleChange={(e) => handleChange(e)}>
            academy short name
          </InputMolecule>
          <InputMolecule
            name="email"
            type="email"
            value={details.email}
            placeholder="example@gmail.com"
            handleChange={(e) => handleChange(e)}>
            academy email
          </InputMolecule>
          <InputMolecule
            name="phone_number"
            type="tel"
            value={details.phone_number}
            placeholder="Type academy phone number"
            handleChange={(e) => handleChange(e)}>
            academy phone number
          </InputMolecule>
          <InputMolecule
            name="fax_number"
            value={details.fax_number}
            handleChange={(e) => handleChange(e)}>
            academy fax number
          </InputMolecule>
          <InputMolecule
            name="full_address"
            value={details.full_address}
            handleChange={(e) => handleChange(e)}>
            academy physical address
          </InputMolecule>
          <InputMolecule
            name="website_link"
            value={details.website_link}
            placeholder="Type website url"
            handleChange={(e) => handleChange(e)}>
            academy website
          </InputMolecule>
          <InputMolecule
            name="mission"
            value={details.mission}
            handleChange={(e) => handleChange(e)}>
            academy mission
          </InputMolecule>
          <InputMolecule
            name="moto"
            value={details.moto}
            handleChange={(e) => handleChange(e)}>
            academy motto
          </InputMolecule>
          <div>
            <div className="mb-3">
              <ILabel weight="bold">academy logo</ILabel>
            </div>
            <Button styleType="outline">upload logo</Button>
          </div>
          <div className="mt-5">
            <Button full type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
