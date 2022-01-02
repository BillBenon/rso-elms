import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import FileUploader from '../../components/Atoms/Input/FileUploader';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { institutionStore } from '../../store/administration/institution.store';
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

  const [logoFile, setlogoFile] = useState<File | null>(null);

  useEffect(() => {
    const institution = data?.data.data;

    institution &&
      setValues({
        current_admin_id: institution.current_admin_id,
        head_office_location_id: 17445,
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

  const handleUpload = (files: FileList | null) => {
    setlogoFile(files ? files[0] : null);
  };

  const { mutateAsync } = institutionStore.updateInstitution();
  const { mutateAsync: mutateAddLogo } = institutionStore.addLogo();

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    let toastId = toast.loading('Updating insitution');
    await mutateAsync(values, {
      onSuccess(data) {
        toast.success(data.data.message, { duration: 1200, id: toastId });
        addLogo(data.data.data.id + '');
        history.goBack();
      },
      onError(error: any) {
        toast.error(error.response.data.message, { id: toastId });
      },
    });
  }

  async function addLogo(institutionId: string) {
    if (logoFile) {
      let data = new FormData();

      data.append('description', `${values.name}'s public logo`);
      data.append('purpose', 'Add a design identifier for academy');
      data.append('logoFile', logoFile);

      await mutateAddLogo(
        { id: institutionId, info: data },
        {
          onSuccess(_data) {
            toast.success('Logo added successfully');
          },
          onError(error: any) {
            toast.error(error.response.data.message || 'error occurred');
          },
        },
      );
    }
  }

  return (
    <div className="py-8 lg:py-8 px-8">
      <Heading color="primary" fontWeight="semibold" fontSize="3xl">
        Edit a new institution
      </Heading>
      <div className="pb-8"></div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <>
            <div className="py-2">
              <InputMolecule
                name="name"
                value={values.name}
                placeholder="institution name"
                handleChange={(e) => handleChange(e)}>
                Institution name
              </InputMolecule>
            </div>
            <div className="py-2">
              <InputMolecule
                name="short_name"
                value={values.short_name}
                placeholder="institution short name"
                handleChange={(e) => handleChange(e)}>
                Institution short name (abbreviations)
              </InputMolecule>
            </div>
            <div className="py-2">
              <InputMolecule
                name="email"
                value={values.email}
                placeholder="rnp@gov.rw"
                handleChange={(e) => handleChange(e)}>
                Institution email
              </InputMolecule>
            </div>
            <div className="py-2">
              <InputMolecule
                name="phone_number"
                value={values.phone_number}
                placeholder="Phone number"
                handleChange={(e) => handleChange(e)}>
                Institution Phone number
              </InputMolecule>
            </div>
          </>
          <>
            <div className="py-2">
              <InputMolecule
                name="website_link"
                required={false}
                value={values.website_link}
                placeholder="www.rnp.gov.rw"
                handleChange={(e) => handleChange(e)}>
                Institution website(optional)
              </InputMolecule>
            </div>
            <div className="py-2">
              <TextAreaMolecule
                name="moto"
                value={values.moto}
                placeholder="Motto"
                handleChange={(e) => handleChange(e)}>
                Institution motto
              </TextAreaMolecule>
            </div>
            <div className="py-2">
              <TextAreaMolecule
                name="mission"
                value={values.mission}
                placeholder="Mission"
                handleChange={(e) => handleChange(e)}>
                Institution mission
              </TextAreaMolecule>
            </div>
            <div className="py-2">
              <TextAreaMolecule
                name="fax number"
                value={values.fax_number}
                placeholder="Fax number"
                handleChange={(e) => handleChange(e)}>
                Fax Number
              </TextAreaMolecule>
            </div>
            <div className="py-2">
              <TextAreaMolecule
                name="postal code"
                value={values.postal_code}
                placeholder="Postal Cide"
                handleChange={(e) => handleChange(e)}>
                Postal Code
              </TextAreaMolecule>
            </div>
          </>
        </div>

        <div className="py-2 col-span-2">
          <ILabel className="block pb-2">Institution logo</ILabel>

          <FileUploader
            allowPreview={false}
            handleUpload={handleUpload}
            accept={'image/jpeg, image/png'}>
            <Button type="button" styleType="outline">
              <span className="flex items-center">
                <Icon name="attach" useheightandpadding={false} fill="primary" />
                <span className="">Upload logo</span>
              </span>
            </Button>
          </FileUploader>
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
