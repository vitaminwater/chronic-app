import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import DeviceList from '../components/DeviceList';
import Device from '../components/Device';
import Wait from '../components/Wait';
import { addListener } from '../utils/redux';

export const AppNavigator = createStackNavigator({
  Wait: { screen: Wait, },
  Device: { screen: Device, },
  List: { screen: DeviceList, },
});

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={{
          dispatch,
          state: nav.toJS(),
          addListener,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.get('nav'),
});

export default connect(mapStateToProps)(AppWithNavigationState);
