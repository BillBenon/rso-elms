import React, { JSXElementConstructor, ReactElement, useState } from 'react';

import Panel from '../Atoms/custom/Panel';

type PanelChildrenType = ReactElement<JSXElementConstructor<typeof Panel>>[];

type IProps = {
  children: PanelChildrenType;
};

function Accordion({ children }: IProps) {
  const [activePanel, setActivePanel] = useState(-1);

  const handleOpen = (index: number) => {
    if (index === activePanel) setActivePanel(-1);
    else setActivePanel(index);
  };

  return (
    <div>
      {children.map((panel, i) => {
        const panelProps: any = panel.props;

        return (
          <Panel
            key={i}
            active={activePanel === i}
            handleOpen={(i) => handleOpen(i)}
            title={panelProps.title}
            subtitle={panelProps.subtitle}
            index={i}>
            {panelProps.children}
          </Panel>
        );
      })}
    </div>
  );
}

export default Accordion;
