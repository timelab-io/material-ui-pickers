import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui-next/styles/withStyles';
import withTheme from 'material-ui-next/styles/withTheme';
import Paper from 'material-ui-next/Paper';
import Tabs from 'material-ui-next/Tabs';
import Tab from 'material-ui-next/Tabs/Tab';
import Icon from 'material-ui-next/Icon';
import * as viewType from '../constants/date-picker-view';

const viewToTabIndex = (openView) => {
  if (openView === viewType.DATE || openView === viewType.YEAR) {
    return 'date';
  }

  return 'time';
};

const tabIndexToView = (tab) => {
  if (tab === 'date') {
    return viewType.DATE;
  }

  return viewType.HOUR;
};

export const DateTimePickerTabs = (props) => {
  const {
    view,
    onChange,
    classes,
    theme,
    dateRangeIcon,
    timeIcon,
  } = props;

  const indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
  const handleChange = (e, value) => {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return (
    <Paper>
      <Tabs
        fullWidth
        value={viewToTabIndex(view)}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor={indicatorColor}
      >
        <Tab value="date" icon={<Icon>{dateRangeIcon}</Icon>} />
        <Tab value="time" icon={<Icon>{timeIcon}</Icon>} />
      </Tabs>
    </Paper>
  );
};

DateTimePickerTabs.propTypes = {
  view: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  dateRangeIcon: PropTypes.node,
  timeIcon: PropTypes.node,
};

DateTimePickerTabs.defaultProps = {
  dateRangeIcon: 'date_range',
  timeIcon: 'access_time',
};

const styles = theme => ({
  tabs: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.type === 'light'
      ? theme.palette.primary.main
      : theme.palette.background.default,
  },
});

export default withTheme()(withStyles(styles, { name: 'MuiPickerDTTabs' })(DateTimePickerTabs));
