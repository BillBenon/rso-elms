import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { institutionStore } from '../../store/institution.store';
import { GenericStatus, ParamType, ValueType } from '../../types';
import { BasicInstitutionInfo } from '../../types/services/institution.types';

export default function UpdateInstitution() {
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const { data } = institutionStore.getInstitutionById(id);

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

  useEffect(() => {
    const institution = data?.data.data;

    institution &&
      setValues({
        current_admin_id: institution.current_admin_id,
        head_office_location_id: institution.head_office_location_id,
        email: institution.email,
        fax_number: institution.fax_number,
        full_address: institution.full_address,
        generic_status: institution.generic_status,
        mission: institution.mission,
        moto: institution.moto,
        name: institution.name,
        phone_number: institution.phone_number,
        postal_code: institution.postal_code || '',
        short_name: institution.short_name,
        website_link: institution.website_link,
        id: id,
      });
  }, [data]);

  const handleChange = (e: ValueType) => {
    setValues({ ...values, [e.name]: e.value });
  };

  const { mutateAsync } = institutionStore.updateInstitution();

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    await mutateAsync(values, {
      onSuccess(data) {
        toast.success(data.data.message, { duration: 1200 });
        setTimeout(() => {
          history.goBack();
        }, 900);
      },
      onError() {
        toast.error('An error occurred please try again later');
      },
    });
  }

  return (
    <div className="py-8 md:py-12 lg:py-16 px-6">
      <Heading color="primary" fontWeight="semibold" fontSize="3xl">
        Edit a new institution
      </Heading>
      <div className="pb-8"></div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2">
        <div className="py-4">
          <InputMolecule
            name="name"
            value={values.name}
            placeholder="institution name"
            handleChange={(e) => handleChange(e)}>
            Institution name
          </InputMolecule>
        </div>
        <div className="py-4">
          <InputMolecule
            name="short_name"
            value={values.short_name}
            placeholder="institution short name"
            handleChange={(e) => handleChange(e)}>
            Institution short name (abbreviations)
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
  );
}
