// import { Label } from "@headlessui/react/dist/components/label/label";

import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import academyStore from '../../store/academy.store';
import { CommonFormProps, ValueType } from '../../types';
import { AcademyCreateInfo } from '../../types/services/academy.types';

interface ParamType {
  id: string;
}

export default function UpdateAcademy<E>({ onSubmit }: CommonFormProps<E>) {
  const history = useHistory();

  const { mutateAsync } = academyStore.modifyAcademy();

  const { id } = useParams<ParamType>();

  const { data } = academyStore.getAcademyById(id);

  const [details, setDetails] = useState<AcademyCreateInfo>({
    current_admin_id: '',
    email: '',
    fax_number: '',
    full_address: '',
    head_office_location_id: 17445,
    institution_id: '',
    mission: '',
    moto: '',
    name: '',
    phone_number: '',
    postal_code: '',
    short_name: '',
    website_link: '',
  });

  useEffect(() => {
    data?.data.data &&
      setDetails({
        ...data?.data.data,
        institution_id: data?.data.data.institution.id + '',
        head_office_location_id: data?.data.data.head_office_location_id || 17445,
      });
  }, [data]);

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  function updateAcademy<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(details, {
      onSuccess() {
        history.goBack();
      },
    });
    if (onSubmit) onSubmit(e);
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
          Update Academy
        </ILabel>
      </div>
      <div className="p-6 w-5/12 pl-6 gap-3 rounded-lg bg-main mt-8">
        <div className="py-5 mb-3 capitalize">
          <Heading color="txt-primary" fontWeight="bold">
            Edit academy
          </Heading>
        </div>
        <form onSubmit={updateAcademy}>
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
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </>
  );
}
