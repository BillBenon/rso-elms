import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { LocationInfo } from './../../types/services/location.types';

class LocationService {
  public async getLocations(): Promise<AxiosResponse<LocationInfo[]>> {
    return await adminstrationAxios.get('/locations');
  }
  public async getLocationsByLevel(
    levelId: string,
  ): Promise<AxiosResponse<LocationInfo[]>> {
    return await adminstrationAxios.get(`/locations/findByLevel/${levelId}`);
  }
  public async getAllChildreen(parentId: string): Promise<AxiosResponse<LocationInfo[]>> {
    return await adminstrationAxios.get(`/locations/getAllChildreen/${parentId}`);
  }
  public async findByParent(parentId: string): Promise<AxiosResponse<LocationInfo[]>> {
    return await adminstrationAxios.get(`/locations/findByParent/${parentId}`);
  }
  public async getLocationsById(
    id: string,
  ): Promise<AxiosResponse<Response<LocationInfo>>> {
    return await adminstrationAxios.get(`/locations/${id}`);
  }
}

export const locationService = new LocationService();
