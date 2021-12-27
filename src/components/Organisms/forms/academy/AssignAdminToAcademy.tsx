import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { authenticatorStore } from '../../../../store/administration';
import academyStore from '../../../../store/administration/academy.store';
import usersStore from '../../../../store/administration/users.store';
import { ParamType, ValueType } from '../../../../types';
import { AcademyCreateInfo } from '../../../../types/services/academy.types';
import { UserType } from '../../../../types/services/user.types';
import { getInchargeDropdown } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';

function AssignAdminToAcademy() {
  const history = useHistory();

  const { data: authUser } = authenticatorStore.authUser();
  const users = usersStore.getUsersByInstitution(authUser?.data.data.institution_id + '');
  const { mutateAsync } = academyStore.modifyAcademy();

  const admins = users.data?.data.data.filter(
    (user) => user.user_type === UserType.ADMIN,
  );

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

  useEffect(() => {
    data?.data.data &&
      setDetails({
        ...data?.data.data,
        institution_id: data?.data.data.institution.id + '',
        head_office_location_id: data.data.data.village.id,
      });
  }, [data]);

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  async function saveAdmin<T>(e: FormEvent<T>) {
    e.preventDefault();
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

  return (
    <form onSubmit={saveAdmin}>
      <p className="text-txt-secondary pt-2 pb-6">
        Choose an academy admin to be incharge of this academy
      </p>
      <DropdownMolecule
        width="full"
        placeholder={users.isLoading ? 'Loading admins' : 'select academy admin'}
        defaultValue={getInchargeDropdown(admins).find(
          (ad) => ad.value === data?.data.data.current_admin_id,
        )}
        options={getInchargeDropdown(admins)}
        name="current_admin_id"
        handleChange={handleChange}>
        Academy Admin
      </DropdownMolecule>
      <div className="mt-5">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

export default AssignAdminToAcademy;
