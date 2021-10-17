// import { Label } from "@headlessui/react/dist/components/label/label";

import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import ILabel from '../../components/Atoms/Text/ILabel';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import academyStore from '../../store/academy.store';
import locationStore from '../../store/location.store';
import usersStore from '../../store/users.store';
import { CommonFormProps, ParamType, ValueType } from '../../types';
import { AcademyCreateInfo } from '../../types/services/academy.types';
import { LocationInfo } from '../../types/services/location.types';
import { UserType } from '../../types/services/user.types';
import { getDropDownOptions, getInchargeDropdown } from '../../utils/getOption';

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

  const users = usersStore.fetchUsers();
  const admins = users.data?.data.data.filter(
    (user) => user.user_type === UserType.ADMIN,
  );

  const [locationVillages, setLocationVillages] = useState<LocationInfo>();

  useEffect(() => {
    data?.data.data &&
      setDetails({
        ...data?.data.data,
        institution_id: data?.data.data.institution.id + '',
      });
    setLocationVillages(data?.data.data.village);
    console.log(locationVillages);
  }, [data]);

  const [locations, setLocations] = useState({
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
  });
  const provinces = locationStore.getLocationsByLevel('2').data?.data;
  let districts = locationStore.findByParent(locations.province);
  let sectors = locationStore.findByParent(locations.district);
  let cells = locationStore.findByParent(locations.sector);
  let villages = locationStore.findByParent(locations.cell);

  useEffect(() => {
    districts.refetch();
  }, [locations.province]);

  useEffect(() => {
    sectors.refetch();
  }, [locations.district]);
  useEffect(() => {
    cells.refetch();
  }, [locations.sector]);
  useEffect(() => {
    villages.refetch();
  }, [locations.cell]);

  function locationChange(e: ValueType) {
    setLocations((locations) => ({
      ...locations,
      [e.name]: e.value,
    }));
  }
  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  async function updateAcademy<T>(e: FormEvent<T>) {
    e.preventDefault();
    await mutateAsync(details, {
      onSuccess() {
        toast.success('Successfully updated academy', { duration: 1200 });
        setTimeout(() => {
          history.goBack();
        }, 900);
      },
      onError() {
        toast.error('An error occurred please try again later');
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
      <div className="p-6 rounded-lg bg-main mt-8">
        <div className="mb-3 capitalize">
          <Heading color="txt-primary" fontWeight="bold">
            Edit academy
          </Heading>
        </div>
        <form onSubmit={updateAcademy}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
            {/* first column */}
            <div>
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
            </div>
            {/* second column */}
            <div className="w-80">
              <Heading fontSize="base" fontWeight="semibold" className="py-2">
                Choose head office location
              </Heading>
              <DropdownMolecule
                width="60 md:w-80"
                defaultValue={getDropDownOptions({ inputs: provinces || [] }).find(
                  (province) =>
                    province.value ===
                    locationVillages?.parent?.parent?.parent?.parent?.id.toString(),
                )}
                options={getDropDownOptions({ inputs: provinces || [] })}
                name="province"
                placeholder="Province"
                handleChange={locationChange}>
                Province
              </DropdownMolecule>
              <div className="grid grid-cols-1 md:grid-cols-2 py-2">
                <DropdownMolecule
                  className="pr-3"
                  defaultValue={getDropDownOptions({
                    inputs: districts.data?.data || [],
                  }).find(
                    (district) =>
                      district.value ===
                      locationVillages?.parent?.parent?.parent?.id.toString(),
                  )}
                  width="60 md:w-40"
                  placeholder="District"
                  options={getDropDownOptions({ inputs: districts.data?.data || [] })}
                  name="district"
                  handleChange={locationChange}>
                  District
                </DropdownMolecule>
                <DropdownMolecule
                  width="60 md:w-40"
                  defaultValue={getDropDownOptions({
                    inputs: sectors.data?.data || [],
                  }).find(
                    (sector) =>
                      sector.value === locationVillages?.parent?.parent?.id.toString(),
                  )}
                  options={getDropDownOptions({ inputs: sectors.data?.data || [] })}
                  name="sector"
                  placeholder="Sector"
                  handleChange={locationChange}>
                  Sector
                </DropdownMolecule>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 py-2">
                <DropdownMolecule
                  defaultValue={getDropDownOptions({
                    inputs: cells.data?.data || [],
                  }).find(
                    (cell) => cell.value === locationVillages?.parent?.id.toString(),
                  )}
                  className="pr-3"
                  width="60 md:w-40"
                  placeholder="Cell"
                  options={getDropDownOptions({ inputs: cells.data?.data || [] })}
                  name="cell"
                  handleChange={locationChange}>
                  Cell
                </DropdownMolecule>
                <DropdownMolecule
                  defaultValue={getDropDownOptions({
                    inputs: villages.data?.data || [],
                  }).find((village) => village.value === locationVillages?.id.toString())}
                  width="60 md:w-40"
                  placeholder="Village"
                  options={getDropDownOptions({ inputs: villages.data?.data || [] })}
                  name="head_office_location_id"
                  handleChange={handleChange}>
                  Village
                </DropdownMolecule>
              </div>
              <InputMolecule
                className="w-60 md:w-80"
                name="full_address"
                value={details.full_address}
                handleChange={(e) => handleChange(e)}>
                academy physical address
              </InputMolecule>
              <div className="flex flex-col py-2">
                <DropdownMolecule
                  defaultValue={getInchargeDropdown(admins).find(
                    (incharge) => incharge.value === details.current_admin_id,
                  )}
                  width="60 md:w-80"
                  placeholder="Select admin"
                  options={getInchargeDropdown(admins)}
                  name="current_admin_id"
                  handleChange={handleChange}>
                  Add academy admin
                </DropdownMolecule>
                <div className="text-primary-500 py-2 text-right w-60 md:w-80">
                  <Link to="/dashboard/users/add">Create new admin</Link>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <ILabel weight="bold">academy logo</ILabel>
                </div>
                <Button styleType="outline">upload logo</Button>
              </div>
              <div className="mt-5">
                <Button type="submit">Save</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
