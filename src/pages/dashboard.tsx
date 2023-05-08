import React from 'react';
import { Box } from '@mui/material';

import DrawerComponent from '../../components/drawer';
import TableComponent from '../../components/table';
import ResidentContainer from '../../components/ResidentContainer';

import styles from '../styles/dashboard.module.css';
import AppbarLanding from '../../components/AppbarLanding';


export default class Dashboard extends React.Component<any, any> {
  render() {
    return (
      <>

        <Box>    
            <AppbarLanding>
            
              <DrawerComponent />
              
            </AppbarLanding>
        </Box>

        <Box>
          <ResidentContainer />
        </Box>
      </>
    );
  }
}
