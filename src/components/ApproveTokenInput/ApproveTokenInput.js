import React, { useState } from "react";
import "./ApproveTokenInput.css";
import { ethers } from "ethers";
import { formatAmount } from "lib/numbers";
import { approveTokens } from "domain/tokens";
import { getContract } from "config/contracts";
import { getTokenInfo } from "domain/tokens/utils";

export default function ApproveTokenInput(props) {
  const { tokenInfo, library, chainId, infoTokens, pendingTxns, setPendingTxns } = props;
  const [approveValue, setApproveValue] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const routerAddress = getContract(chainId, "Router");

  const onApproveValueChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue.trim() !== "") {
      const inputValueInWei = ethers.utils.parseEther(inputValue);
      if (inputValueInWei.gt(tokenInfo.balance)) {
        return;
      }
    }
    setApproveValue(inputValue);
  };

  function approveToken() {
    approveTokens({
      setIsApproving,
      library,
      tokenAddress: tokenInfo.address,
      spender: routerAddress,
      chainId: chainId,
      onApproveSubmitted: () => {
        setIsApproving(false);
      },
      infoTokens,
      getTokenInfo,
      pendingTxns,
      setPendingTxns,
    });
    return;
  }

  const onMaxClick = () => {
    const tokenBalanceInEther = ethers.utils.formatEther(tokenInfo.balance);
    setApproveValue(tokenBalanceInEther);
  };

  const onApproveClick = () => {
    approveToken();
  };

  return (
    <div className="Approve-tokens-input-section-wrapper">
      <div className="Approve-tokens-input-section">
        <div className="Exchange-swap-section-top">
          <div className="muted">
            {tokenInfo.name}: {formatAmount(tokenInfo.balance, tokenInfo.decimals, 4, true)}
          </div>
        </div>
        <div className="Approve-token-input-section-bottom">
          <div>
            <input
              type="number"
              min="0"
              placeholder="0.0"
              className="Exchange-swap-input"
              value={approveValue}
              onChange={onApproveValueChange}
            />
          </div>
          <div>
            <button onClick={onMaxClick} className="Approve-token-input-max">
              MAX
            </button>
          </div>
        </div>
      </div>
      <button onClick={onApproveClick} className="Approve-token-input-approve">
        Approve
      </button>
    </div>
  );
}
