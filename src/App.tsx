import React, { useState } from 'react';
import Checkbox from './components/Atoms/custom/CheckBox';
import DropDown from './styles/components/atoms/custom/Dropdown';

const App = () => {
  const [checked, setChecked] = useState(false);
  const options = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'French',
      value: 'fr',
    },
    {
      label: 'Kinyarwanda',
      value: 'kiny',
    },
  ];
  return (
    <div className="p-8 flex flex-col gap-3">
      <Checkbox
        value="en"
        checked={checked}
        label="English"
        onChange={() => setChecked(!checked)}
      />
      <DropDown
        options={options}
        name="intakes"
        onChange={() => console.log('chnaged')}
        // getOptionLabel={(Option: object) => Option.value}
      />
    </div>
  );
};

export default App;
