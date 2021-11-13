import React, { useEffect, useState } from 'react';

import locationStore from '../../store/administration/location.store';
import { SelectData, ValueType } from '../../types';
import { getDropDownOptions } from '../../utils/getOption';
import Heading from '../Atoms/Text/Heading';
import DropdownMolecule from '../Molecules/input/DropdownMolecule';

function Locations() {
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

  const [dataToSelect, setDataToSelect] = useState<SelectData[]>([]);

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
  return (
    <div className="w-80">
      <Heading fontSize="base" fontWeight="semibold" className="py-2">
        Choose head office location
      </Heading>
      <DropdownMolecule
        width="60 md:w-80"
        options={dataToSelect}
        name="province"
        placeholder="Province"
        handleChange={locationChange}>
        Province
      </DropdownMolecule>
      <DropdownMolecule
        width="60 md:w-80"
        options={getDropDownOptions({ inputs: provinces || [] })}
        name="province"
        placeholder="Province"
        handleChange={locationChange}>
        Province
      </DropdownMolecule>
      <div className="grid grid-cols-1 md:grid-cols-2 py-2">
        <DropdownMolecule
          className="pr-3"
          width="60 md:w-40"
          placeholder="District"
          options={getDropDownOptions({ inputs: districts.data?.data || [] })}
          name="district"
          handleChange={locationChange}>
          District
        </DropdownMolecule>
        <DropdownMolecule
          width="60 md:w-40"
          options={getDropDownOptions({ inputs: sectors.data?.data || [] })}
          name="sector"
          placeholder="Sector"
          handleChange={locationChange}>
          Sector
        </DropdownMolecule>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-2">
        <DropdownMolecule
          className="pr-3"
          width="60 md:w-40"
          placeholder="Cell"
          options={getDropDownOptions({ inputs: cells.data?.data || [] })}
          name="cell"
          handleChange={locationChange}>
          Cell
        </DropdownMolecule>
        <DropdownMolecule
          width="60 md:w-40"
          placeholder="Village"
          options={getDropDownOptions({ inputs: villages.data?.data || [] })}
          name="village"
          handleChange={locationChange}>
          Village
        </DropdownMolecule>
      </div>
    </div>
  );
}

export default Locations;
