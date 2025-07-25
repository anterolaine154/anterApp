import React, { useContext, useEffect, useMemo } from "react";
import browser from "webextension-polyfill";

import {
  type MultichainNetworkConfiguration,
} from "@anterapp/multichain-network-controller";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as designSystemConstants from "../../../helpers/constants/design-system";
import {
  AvatarAccount,
  Box,
  ButtonBase,
  ButtonIcon,
  Text,
} from "../../component-library";
// eslint-disable-next-line import/no-restricted-paths
const getEnvironmentType = require("../../../app/scripts/lib/util").getEnvironmentType;
// eslint-disable-next-line import/no-restricted-paths
const normalizeSafeAddress = require("../../../app/scripts/lib/multichain/address").normalizeSafeAddress;
import {
  ENVIRONMENT_TYPE_POPUP as envPopupType,
} from "../../../../shared/constants/app";

function AppHeaderUnlockedContent({
  popupStatus,
  currentNetwork: networkConfig,
}) {
  
}
