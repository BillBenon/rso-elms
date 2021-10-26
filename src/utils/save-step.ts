import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { UseMutateAsyncFunction } from 'react-query';

import { Response } from '../types';
import { ExperienceInfo } from '../types/services/experience.types';
export async function saveData(
  experienceData: ExperienceInfo,
  mutateAsync: UseMutateAsyncFunction<
    AxiosResponse<Response<ExperienceInfo>>,
    unknown,
    ExperienceInfo,
    unknown
  >,
  fetched_id: string | number,
) {
  let isSuccess: boolean = false;
  if (experienceData) {
    await mutateAsync(
      { ...experienceData, person_id: fetched_id.toString() },
      {
        onSuccess() {
          toast.success('experience information successfully added', {
            duration: 1200,
          });
          isSuccess = true;
        },
        onError() {
          toast.error('An error occurred please try again later');
          isSuccess = false;
        },
      },
    );
  }
  return isSuccess;
}
