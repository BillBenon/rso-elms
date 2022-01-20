import React, { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { rankStore } from '../../../../store/administration/rank.store';
import { FormPropType, ValueType } from '../../../../types';
import { CreateRankReq, RankCategory } from '../../../../types/services/rank.types';
import { getDropDownStatusOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewRank({ onSubmit }: FormPropType) {
  const [form, setForm] = useState<CreateRankReq>({
    name: '',
    description: '',
    category: RankCategory.GENERALS,
    institution_id: '',
  });
  const { mutateAsync } = rankStore.addRank();
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
        toast.success('Rank created');
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
      {/* model category */}
      <DropdownMolecule
        defaultValue={getDropDownStatusOptions(RankCategory).find(
          (categ) => categ.label === form.category,
        )}
        options={getDropDownStatusOptions(RankCategory)}
        name="category"
        placeholder={'Select the Rank Category'}
        handleChange={handleChange}>
        Rank Category
      </DropdownMolecule>
      {/* model name */}
      <InputMolecule
        required
        value={form.name}
        error=""
        handleChange={handleChange}
        name="name">
        Rank name
      </InputMolecule>
      {/* model code
      {/* module description */}
      <TextAreaMolecule
        value={form.description}
        name="description"
        required
        handleChange={handleChange}>
        Description
      </TextAreaMolecule>

      {/* save button */}
      <div className="mt-5">
        <Button type="submit" full>
          Create Rank
        </Button>
      </div>
    </form>
  );
}
