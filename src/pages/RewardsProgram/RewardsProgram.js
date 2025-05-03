import { Trans } from "@lingui/macro";
import "./RewardsProgram.css";
import tmxImg from "img/ic_tmx.svg";
import tlpImg from "img/ic_tlp.svg";

import { TokenCard } from "./TokenCard";
import { RewardProgram } from "./RewardProgram";
import Banner from "components/Banner/Banner";

export default function RewardsProgram() {
  const handleBuyTLP = () => {
    window.location.hash = "/buy_tlp";
  };

  const handleEarnTMX = () => {
    window.location.hash = "/earn";
  };

  return (
    <div className="protocol-tokens-container">
      <h1 className="page-title flex items-center">
        <Trans>Liquidity Incentives</Trans>
      </h1>

      <Banner id="rewards-draft-notice" className="rewards-draft-banner" dismissable={false}>
        <Trans>This draft is in final review.</Trans>
      </Banner>

      <div className="reward-programs-section">
        <div className="reward-overview">
          <div className="overview-card">
            <h3>Program Structure</h3>
            <ul>
              <li>90% of fees distributed to LPs from all whitelisted pools</li>
              <li>No minimum deposit requirement for fee rewards</li>
              <li>Direct TMX bonus rewards with no vesting period</li>
              <li>10-month lock-up period for TMX bonus rewards</li>
              <li>Enhanced rewards through esTMX staking</li>
            </ul>
          </div>
          <div className="overview-card">
            <h3>Key Benefits</h3>
            <ul>
              <li>Inclusive rewards for all liquidity providers</li>
              <li>Mix of proportional fees and bonus rewards</li>
              <li>Sustainable growth through controlled distribution</li>
              <li>Transparent on-chain distribution</li>
              <li>Regular monthly fee distributions</li>
            </ul>
          </div>
        </div>

        <div className="main-cta-banner">
          <div className="main-cta-content">
            <h2>Ready to Start Earning TMX Rewards?</h2>
            <p>Join our liquidity providers and earn rewards from day one</p>
            <button className="main-cta-button" onClick={handleBuyTLP}>
              Buy TLP Now
            </button>
          </div>
        </div>

        <h2 className="section-title">
          <Trans>TMX Reward Programs</Trans>
        </h2>

        <div className="reward-programs-grid">
          <RewardProgram
            title="First-Mover Bonus"
            description="50,000 TMX tokens distributed across 5 tiers for early liquidity providers. Minimum $5,000 USD deposit required."
            type="first-mover"
          />

          <RewardProgram
            title="LP Size Linear Bonus"
            description="0.1 TMX granted per $1.00 supplied. Minimum $50,000 USD deposit required. 100,000 TMX total allocation."
            type="size-bonus"
          />
        </div>

        <h2 className="section-title">
          <Trans>Additional Incentives</Trans>
        </h2>

        <div className="incentives-grid">
          <div className="incentive-card">
            <h3>esTMX Staking Boost</h3>
            <p>Enhance your fee rewards by staking esTMX tokens through the Distribution Contract.</p>
            <div className="incentive-details">
              <ul>
                <li>Boost your base fee rewards</li>
                <li>Controlled distribution rate for stability</li>
                <li>Long-term engagement incentives</li>
              </ul>
            </div>
          </div>

          <div className="incentive-card">
            <h3>Direct TMX Bonus Structure</h3>
            <p>Immediate rewards with a simple lock-up mechanism.</p>
            <div className="incentive-details">
              <ul>
                <li>No vesting period required</li>
                <li>10-month lock-up period</li>
                <li>Unlock and use freely after lock-up</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="tokens-grid">
        <TokenCard
          icon={tmxImg}
          title="TMX"
          description="TMX is the utility and governance token with a max circulating supply of 10 million tokens."
          stats={[<Trans>Max Supply: 10M TMX</Trans>, <Trans>10-month lock-up for bonus rewards</Trans>]}
          buttons={[
            { label: "Buy TMX", disabled: true },
            {
              label: "Read more",
              onClick: () => window.open("https://docs.t3.money/dex/tokenomics/tmx-token", "_blank"),
            },
          ]}
          comingSoon={true}
        />

        <TokenCard
          icon={tlpImg}
          title="TLP"
          description="TLP is the liquidity provider token. Earn 90% of all platform fees from whitelisted pools, distributed monthly."
          stats={[<Trans>90% fee distribution</Trans>, <Trans>No minimum deposit for fee rewards</Trans>]}
          buttons={[
            {
              label: "Buy TLP",
              onClick: handleBuyTLP,
            },
            { label: "Read more", onClick: () => window.open("https://docs.t3.money/dex/liquidity", "_blank") },
          ]}
        />
      </div>
    </div>
  );
}
