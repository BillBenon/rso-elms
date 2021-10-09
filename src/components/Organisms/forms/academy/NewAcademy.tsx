// import { Label } from "@headlessui/react/dist/components/label/label";

import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authenticatorService } from '../../../../services';
import academyStore from '../../../../store/academy.store';
import { CommonFormProps, ValueType } from '../../../../types';
import { AcademyCreateInfo } from '../../../../types/services/academy.types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import InputMolecule from '../../../Molecules/input/InputMolecule';

export default function NewAcademy<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();

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

  useEffect(() => {
    const getUser = async () => {
      const user = await authenticatorService.authUser();
      setDetails((details) => ({
        ...details,
        current_admin_id: user.data.data.id + '',
      }));
    };

    getUser();
  }, []);

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
      onSuccess() {
        history.push('/academies');
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
          New Academy
        </ILabel>
      </div>

      <div className="p-6 w-5/12 pl-6 gap-3 rounded-lg bg-main mt-8">
        <div className="py-5 mb-3 capitalize">
          <Heading color="txt-primary" fontWeight="bold">
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
          {/* <TextAreaMolecule
            name="website"
            value={''}
            placeholder="Type website url"
            handleChange={(e) => handleChange(e)}>
            academy description
          </TextAreaMolecule> */}
          <div>
            <div className="mb-3">
              <ILabel weight="bold">academy logo</ILabel>
            </div>
            <Button styleType="outline">upload logo</Button>
          </div>
          <div className="mt-5">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </>
  );
}
