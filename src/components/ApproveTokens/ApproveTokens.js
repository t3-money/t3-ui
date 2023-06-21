import React, { useState } from "react";
import "./ApproveTokens.css";
import { Trans } from "@lingui/macro";
import { getTokens } from "config/tokens";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { getContract } from "config/contracts";
import { contractFetcher } from "lib/contracts";

import Reader from "abis/ReaderV2.json";
import { useInfoTokens } from "domain/tokens";

export default function ApproveTokens(props) {
  const { chainId } = props;
  const { active, account, library } = useWeb3React();
  const readerAddress = getContract(chainId, "Reader");
  const tokens = getTokens(chainId);
  const tokenAddresses = tokens.map((token) => token.address);

  const [approveValue, setApproveValue] = useState("");

  const { data: tokenBalances } = useSWR(active && [active, chainId, readerAddress, "getTokenBalances", account], {
    fetcher: contractFetcher(library, Reader, [tokenAddresses]),
  });

  const onApproveValueChange = (e) => {
    setApproveValue(e.target.value);
  };

  const { infoTokens } = useInfoTokens(library, chainId, active, tokenBalances);

  let nonZeroBalanceTokens = [];
  for (let key in infoTokens) {
    let tokenInfo = infoTokens[key];
    if (tokenInfo.balance && tokenInfo.balance.gt(0)) {
      nonZeroBalanceTokens.push(tokenInfo);
    }
  }

  return (
    <div className="Approve-tokens-modal-body">
      <div className="Page-description">
        <Trans>
          Please approve the tokens present in your wallet to the necessary contracts to avoid repeated approval
          transactions. The tokens are being approved to the <span className="code">Router</span> contract.
        </Trans>
      </div>
      {nonZeroBalanceTokens.map((tokenInfo, index) => (
        <div key={index} className="Approve-tokens-input-section">
          <div className="Exchange-swap-section-top">
            <div className="muted">
              {tokenInfo.name} - {tokenInfo.balance.toString()}
            </div>
          </div>
          <div className="Exchange-swap-section-bottom">
            <div>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0.0"
                className="Exchange-swap-input"
                value={approveValue}
                onChange={onApproveValueChange}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
