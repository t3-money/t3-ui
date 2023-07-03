import React from "react";
import "./ApproveTokens.css";
import { Trans } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import ApproveTokenInput from "components/ApproveTokenInput/ApproveTokenInput";
import Button from "components/Button/Button";

export default function ApproveTokens(props) {
  const { chainId, pendingTxns, setPendingTxns, nonZeroBalanceTokens, closeApprovalsModal } = props;
  const { library } = useWeb3React();

  return (
    <div className="Approve-tokens-modal-body">
      <div className="Page-description">
        <Trans>
          Please approve the tokens present in your wallet to the necessary contracts to avoid repeated approval
          transactions. The tokens are being approved to the Router contract. Pre-approving assets leads to a faster
          trading experience!
        </Trans>
      </div>
      {nonZeroBalanceTokens.map((tokenInfo, index) => (
        <ApproveTokenInput
          key={index}
          tokenInfo={tokenInfo}
          library={library}
          chainId={chainId}
          pendingTxns={pendingTxns}
          setPendingTxns={setPendingTxns}
        />
      ))}
      <Button variant="primary-action" className="w-20 h-full" onClick={closeApprovalsModal}>
        {`Done`}
      </Button>
    </div>
  );
}
