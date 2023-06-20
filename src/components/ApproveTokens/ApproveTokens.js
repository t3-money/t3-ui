import React from "react";
import cx from "classnames";
import "./ApproveTokens.css";
import { Trans } from "@lingui/macro";
import { getWhitelistedTokens } from "config/tokens";

export default function ApproveTokens(props) {
  const { chainId } = props;

  const whitelistedTokens = getWhitelistedTokens(chainId);
  return (
    <div className="Approve-tokens-modal-body">
      <div className="Page-description">
        <Trans>{`Please approve the tokens present in your wallet to the necessary contracts to avoid repeated approval transactions.`}</Trans>
      </div>
    </div>
  );
}
