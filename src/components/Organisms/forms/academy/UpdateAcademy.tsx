// import { Label } from "@headlessui/react/dist/components/label/label";

import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import academyStore from '../../../../store/administration/academy.store';
import { Link, ParamType, ValueType } from '../../../../types';
import { AcademyCreateInfo } from '../../../../types/services/academy.types';
import Button from '../../../Atoms/custom/Button';
import FileUploader from '../../../Atoms/Input/FileUploader';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import BreadCrumb from '../../../Molecules/BreadCrumb';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import LocationMolecule from '../../../Molecules/input/LocationMolecule';
import Stepper from '../../../Molecules/Stepper/Stepper';

interface IProps {
  details: AcademyCreateInfo;
  display_label: string;
  handleChange: (_e: ValueType) => any;
  handleNext: <T>(_e: FormEvent<T>) => any;
}

export default function UpdateAcademy() {
  const history = useHistory();

  const { mutateAsync } = academyStore.modifyAcademy();

  const { id } = useParams<ParamType>();

  const { url } = useRouteMatch();
  const [currentStep, setCurrentStep] = useState(0);

  const { data } = academyStore.getAcademyById(id);

  const [details, setDetails] = useState<AcademyCreateInfo>({
    current_admin_id: '',
    email: '',
    fax_number: '',
    full_address: '',
    head_office_location_id: 0,
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
      });
  }, [data]);

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  const list: Link[] = [
    { to: '', title: 'Institution admin' },
    { to: '/dashboard/academies', title: 'academies' },
    { to: `${url}`, title: 'edit academy' },
  ];

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (currentStep === 0) setCurrentStep(currentStep + 1);
    else {
      await mutateAsync(details, {
        onSuccess(data) {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['academies/instutionId']);
          history.goBack();
        },
        onError(error: any) {
          toast.error(error.response.data.message);
        },
      });
    }
  }

  return (
    <>
      <section>
        <BreadCrumb list={list} />
      </section>
      <Heading className="py-4" fontSize="2xl" fontWeight="semibold">
        Edit Academy
      </Heading>
      <div className="bg-main w-1/3 px-8 pt-8">
        <Stepper
          currentStep={currentStep}
          completeStep={currentStep}
          width="w-64"
          isVertical={false}
          isInline={false}
          navigateToStepHandler={() => {}}>
          <AcademyInfoComponent
            display_label=""
            details={details}
            handleChange={handleChange}
            handleNext={handleSubmit}
          />
          <AcademyLocationComponent
            display_label=""
            details={details}
            handleChange={handleChange}
            handleNext={handleSubmit}
          />
        </Stepper>
      </div>
    </>
  );
}

function AcademyInfoComponent({ details, handleChange, handleNext }: IProps) {
  return (
    <form onSubmit={handleNext}>
      <InputMolecule
        name="name"
        placeholder="Type academy name"
        value={details.name}
        handleChange={handleChange}>
        academy name
      </InputMolecule>
      <InputMolecule
        name="short_name"
        placeholder="Type short name"
        value={details.short_name}
        handleChange={handleChange}>
        academy short name
      </InputMolecule>
      <InputMolecule name="mission" value={details.mission} handleChange={handleChange}>
        academy mission
      </InputMolecule>
      <InputMolecule name="moto" value={details.moto} handleChange={handleChange}>
        academy motto
      </InputMolecule>
      <div>
        <div className="mb-3">
          <ILabel weight="bold">academy logo</ILabel>
        </div>
        <FileUploader
          accept={'image/jpeg, image/png'}
          handleUpload={function (_files: FileList | null) {
            throw new Error('Function not implemented.');
          }}>
          <Button styleType="outline" type="button">
            upload logo
          </Button>
        </FileUploader>
      </div>
      <div className="pt-3">
        <Button type="submit" onClick={() => handleNext}>
          Next
        </Button>
      </div>
    </form>
  );
}

function AcademyLocationComponent({ details, handleChange, handleNext }: IProps) {
  return (
    <form onSubmit={handleNext}>
      <InputMolecule
        name="email"
        type="email"
        value={details.email}
        placeholder="example@gmail.com"
        handleChange={handleChange}>
        academy email
      </InputMolecule>
      <InputMolecule
        name="phone_number"
        type="tel"
        value={details.phone_number}
        placeholder="Type academy phone number"
        handleChange={handleChange}>
        academy phone number
      </InputMolecule>
      <InputMolecule
        name="fax_number"
        value={details.fax_number}
        handleChange={handleChange}>
        academy fax number
      </InputMolecule>
      <InputMolecule
        name="website_link"
        value={details.website_link}
        placeholder="Type website url"
        handleChange={handleChange}>
        academy website
      </InputMolecule>
      <LocationMolecule
        placeholder="Select head office location"
        name="head_office_location_id"
        handleChange={handleChange}>
        Head office location
      </LocationMolecule>
      <InputMolecule
        name="full_address"
        value={details.full_address}
        handleChange={handleChange}>
        academy physical address
      </InputMolecule>
      <div className="pt-3 flex justify-between w-60 md:w-80">
        <Button type="submit" onClick={() => handleNext}>
          Update
        </Button>
      </div>
    </form>
  );
}
