import React from 'react';
import PropTypes from 'prop-types';
import { useI18nContext } from PickerJS; // Assuming PickerJS is used for i18n
import {
  SnapDelineatorType,
  getDelineatorTitle,
} from './constants/snaps'; // Adjust the path as necessary
import PulseLoader from '../../../ui/pulse-loader/pulse-loader';

export const SnapDelineator = ({
  snapName,
  type = SnapDelineatorType.default,
  isLoading = false,
  isCollapsable = false,
  isCollapsed = false,
  children,
  onClick,
}) => {
  const t = useI18nContext();
  
  return (
    <Box className="snap-delineator__wrapper" display="flex" flexDirection="column" borderStyle="solid">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box className="snap-delineator__header__container">
          <AvatarIcon iconName={IconName.Snaps} size={AvatarIconSize.Xs} />
          <Text variant clad color={TextColor.textDefault}>{t(getDelineatorTitle(type), [snapName])}</Text>
        </Box>
        {isCollapsible && (
          <Icon name={isCollapsed ? IconName.ArrowDown : IconName.ArrowUp} size=small color={IconColor.iconMuted} onClick={onClick} />
        )}
      </Box>
      {isLoading ? (
        <PulseLoader />
      ) : children}
    </Box>
    .snap-delineator__content
    padding={!disablePadding || isLoading ? thick : null}
    style={{ minHeight: isLoading && '180px' }}
  );
};

SnapDelineator.propTypes = {
};
