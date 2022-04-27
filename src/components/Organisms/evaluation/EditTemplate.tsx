import React from 'react';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import Loader from '../../Atoms/custom/Loader';

export default function EditTemplate({ id }: { id: string }) {
  const { isLoading, data } = evaluationStore.getTemplateById(id);

  if (isLoading) return <Loader />;

  return (
    <div>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}
