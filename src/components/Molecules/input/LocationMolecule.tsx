import React, { ReactNode, useEffect, useState } from 'react';

import locationStore from '../../../store/administration/location.store';
import { DropdownProps, ValueType } from '../../../types';
import { LocationInfo } from '../../../types/services/location.types';
import { getDropDownOptions } from '../../../utils/getOption';
import DropdownMolecule from './DropdownMolecule';

interface Props extends Omit<DropdownProps, 'options'> {
  children?: ReactNode | string;
  error?: string;
}
export default function LocationMolecule({
  name,
  handleChange = (_e: ValueType) => {},
  children,
  placeholder = '',
  ...attrs
}: Props) {
  const [residenceLocationLevel, setResidenceLocationLevel] = useState<number>(1);
  const [location, setLocation] = useState<LocationInfo[]>();
  const [choseResidenceLocations, setChoseResidenceLocations] = useState<string>('');
  const levels = ['country', 'province', 'district', 'sector', 'cell', 'village'];

  const [locationId, setLocationId] = useState<string>('');

  const { data: country, isFetching: isFetchingCountry } =
    locationStore.getLocationsByLevel('1');
  const { data: dbLocations, isFetching: isFetchingLocations } =
    locationStore.findByParent(locationId ? locationId.toString() : '');

  const handleLocationChange = (e: ValueType) => {
    handleChange(e);
    setLocationId(e.value.toString());
    setChoseResidenceLocations(
      (old) => `${old} ${old.length > 0 ? '-> ' : ''} ${e.label} `,
    );

    // refetchDbLocations();

    setResidenceLocationLevel((old) => old + 1);
  };

  function resetResidenceLocation() {
    setResidenceLocationLevel(1);
    country?.data.data && setLocation(country?.data.data);
    setChoseResidenceLocations('');
  }

  useEffect(() => {
    country?.data.data && setLocation(country?.data.data);
  }, [country?.data]);

  useEffect(() => {
    dbLocations?.data.data && setLocation(dbLocations?.data.data.content);
  }, [dbLocations?.data]);

  return (
    <div>
      <DropdownMolecule
        {...attrs}
        placeholder={placeholder}
        name={name}
        defaultValue={getDropDownOptions({ inputs: location! }).find(
          (location) => location.value === (locationId && locationId.toString()),
        )}
        handleChange={handleLocationChange}
        disabled={isFetchingCountry || isFetchingLocations}
        options={getDropDownOptions({ inputs: location! })}>
        {children}
        {' ' + levels[residenceLocationLevel] && (
          <span className="text-error-500">
            ( select {levels[residenceLocationLevel - 1]} )
          </span>
        )}
      </DropdownMolecule>
      <div className="flex items-center mb-4">
        <p className="text-sm text-success-500 ">{choseResidenceLocations}</p>
        {choseResidenceLocations.length > 0 && (
          <button className="ml-4 hover:bg-lightblue" onClick={resetResidenceLocation}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="15"
              height="15">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
