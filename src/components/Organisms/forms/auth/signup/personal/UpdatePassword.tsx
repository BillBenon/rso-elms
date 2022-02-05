import React, { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import useAuthenticator from '../../../../../../hooks/useAuthenticator';
import { authenticatorStore } from '../../../../../../store/administration';
import { ChangePassword, FormPropType, ValueType } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

export default function UpdatePassword({ onSubmit }: FormPropType) {
  const [form, setForm] = useState<ChangePassword>({
    currentPassword: '',
    newPassword: '',
  });
  const { mutateAsync } = authenticatorStore.passwordChange();
  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      const { user } = useAuthenticator();
      setForm((form) => ({
        ...form,
        institution_id: user?.institution_id || 'b832407f-fb77-4a75-8679-73bf7794f207',
        current_admin_id: user?.id + '',
      }));
    };
    getUser();
  }, []);

  function handleChange({ name, value }: ValueType) {
    setForm((old) => ({ ...old, [name]: value }));
  }
  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(form, {
      onSuccess: () => {
        toast.success('Password updated');
        history.goBack();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
    if (onSubmit) onSubmit(e);
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule
        name="currentPassword"
        placeholder="currentPassword"
        type="password"
        value={form.currentPassword}
        handleChange={handleChange}>
        Current Password
      </InputMolecule>
      <InputMolecule
        name="newPassword"
        placeholder="new password"
        type="password"
        value={form.newPassword}
        handleChange={handleChange}>
        New Password
      </InputMolecule>
      <div>
        <Button type="submit" full>
          Save
        </Button>
      </div>
    </form>
  );
}
