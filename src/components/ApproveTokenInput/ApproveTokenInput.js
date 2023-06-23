import React, { useState } from "react";
import "./ApproveTokenInput.css";
import { ethers } from "ethers";
import { formatAmount } from "lib/numbers";
import { approveTokens } from "domain/tokens";
import { getContract } from "config/contracts";
import { getTokenInfo } from "domain/tokens/utils";
import Button from "components/Button/Button";

export default function ApproveTokenInput(props) {
  const { tokenInfo, library, chainId, infoTokens, pendingTxns, setPendingTxns } = props;
  const [approveValue, setApproveValue] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false); // New state variable to check if the approve process has completed
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
    try {
      approveTokens({
        setIsApproving,
        library,
        tokenAddress: tokenInfo.address,
        spender: routerAddress,
        chainId: chainId,
        onApproveSubmitted: () => {
          setIsApproving(false);
          setIsApproved(true);
        },
        infoTokens,
        getTokenInfo,
        pendingTxns,
        setPendingTxns,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }

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
      <Button
        variant={isApproved ? "approved" : "primary-action"}
        className="w-20 h-full"
        onClick={onApproveClick}
        disabled={parseFloat(approveValue) === "0" || isApproving}
      >
        {isApproved ? "Approved!" : "Approve"}
      </Button>
    </div>
  );
}
