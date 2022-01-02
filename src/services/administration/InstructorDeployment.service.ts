import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  DeployInstructor,
  Instructor,
  InstructorDeployed,
} from '../../types/services/instructor.types';

class InstructorDeployment {
  public async getInstructorsDeployedInAcademy(
    academyId: string,
  ): Promise<AxiosResponse<Response<InstructorDeployed[]>>> {
    return await adminstrationAxios.get(
      `instructorDeployments/getInstructorsDeployedInAcademy/${academyId}`,
    );
  }

  public async getInstructorsRegisteredInAcademy(
    academyId: string,
  ): Promise<AxiosResponse<Response<Instructor[]>>> {
    return await adminstrationAxios.get(
      `instructorDeployments/getInstructorsRegisteredInAcademy/${academyId}`,
    );
  }

  public async getInstructorById(
    id: string,
  ): Promise<AxiosResponse<Response<Instructor[]>>> {
    return await adminstrationAxios.get(`instructorDeployments/getInstructorById/${id}`);
  }

  public async getInstructorByUserId(
    userId: string,
  ): Promise<AxiosResponse<Response<Instructor[]>>> {
    return await adminstrationAxios.get(
      `instructorDeployments/getInstructorByUserId/${userId}`,
    );
  }

  public async getInstructors(): Promise<AxiosResponse<Response<Instructor[]>>> {
    return await adminstrationAxios.get(`instructorDeployments/getInstructors`);
  }

  public async deploy(
    instructor: DeployInstructor,
  ): Promise<AxiosResponse<Response<InstructorDeployed>>> {
    return await adminstrationAxios.post('instructorDeployments/deploy', instructor);
  }
}

export const instructorDeployment = new InstructorDeployment();
