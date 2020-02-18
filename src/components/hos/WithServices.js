import React from 'react';

import { ServicesConsumer } from '../ServicesContext';

const WithServices = Wrapped => (...props) => {
  return (
    <ServicesConsumer>
      {
        value => <Wrapped props services={value} />
      }
    </ServicesConsumer>
  )
}

export default WithServices;