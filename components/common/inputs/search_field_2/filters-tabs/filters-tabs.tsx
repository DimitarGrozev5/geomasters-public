import React, { useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';
import FiltersAttr from './filters-attr';
import { SearchValue } from '../search-value-type';
import FiltersDate from './filters-date';
import Spacer from '../../../data-presentation/spacer';
import FiltersLocation from './filters-location';

type Props = {
  status: SearchValue | null;
  setStatus: (status: SearchValue | null) => void;
  category: SearchValue | null;
  setCategory: (status: SearchValue | null) => void;
  dateFrom: SearchValue | null;
  setDateFrom: (status: SearchValue | null) => void;
  dateTo: SearchValue | null;
  setDateTo: (status: SearchValue | null) => void;
  location: SearchValue | null;
  setLocation: (status: SearchValue | null) => void;
};

const FiltersTabs: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {
    status,
    setStatus,
    category,
    setCategory,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    location,
    setLocation,
  },
  ref
) => {
  // Tabs
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box ref={ref}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', ml: 1, mr: 1 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="filters"
          centered
        >
          <Tab label="Атрибути" {...a11yProps(0)} />
          <Tab label="Дата" {...a11yProps(1)} />
          <Tab label="Локация" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <FiltersAttr
          status={status}
          setStatus={setStatus}
          category={category}
          setCategory={setCategory}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <FiltersDate
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <FiltersLocation location={location} setLocation={setLocation} />
      </TabPanel>
    </Box>
  );
};

export default React.forwardRef(FiltersTabs);

function a11yProps(index: number) {
  return {
    id: `filters-tab-${index}`,
    'aria-controls': `filters-tabpanel-${index}`,
  };
}

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`filters-tabpanel-${index}`}
      aria-labelledby={`filters-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}
