import React from "react";
import "./AppHome.css";
import Footer from "components/Footer/Footer";
import simpleSwapIcon from "img/ic_simpleswaps.svg";
import costIcon from "img/ic_cost.svg";
import liquidityIcon from "img/ic_liquidity.svg";
import totaluserIcon from "img/ic_totaluser.svg";

import statsIcon from "img/ic_stats.svg";
import tradingIcon from "img/ic_trading.svg";

import useSWR from "swr";

import { USD_DECIMALS, getTotalVolumeSum } from "lib/legacy";

import { useUserStat } from "domain/legacy";

import arbitrumIcon from "img/ic_arbitrum_96.svg";
import avaxIcon from "img/ic_avalanche_96.svg";

import TokenCard from "components/TokenCard/TokenCard";
import { Trans } from "@lingui/macro";
import { HeaderLink } from "components/Header/HeaderLink";
import { ARBITRUM, AVALANCHE } from "config/chains";
import { getServerUrl } from "config/backend";
import { bigNumberify, formatAmount, numberWithCommas } from "lib/numbers";

export default function Home({ showRedirectModal, redirectPopupTimestamp }) {
  // const [openedFAQIndex, setOpenedFAQIndex] = useState(null)
  // const faqContent = [{
  //   id: 1,
  //   question: "What is GMX?",
  //   answer: "GMX is a decentralized spot and perpetual exchange that supports low swap fees and zero price impact trades.<br><br>Trading is supported by a unique multi-asset pool that earns liquidity providers fees from market making, swap fees, leverage trading (spreads, funding fees & liquidations), and asset rebalancing.<br><br>Dynamic pricing is supported by Chainlink Oracles along with TWAP pricing from leading volume DEXs."
  // }, {
  //   id: 2,
  //   question: "What is the GMX Governance Token? ",
  //   answer: "The GMX token is the governance token of the GMX ecosystem, it provides the token owner voting rights on the direction of the GMX platform.<br><br>Additionally, when GMX is staked you will earn 30% of the platform-generated fees, you will also earn Escrowed GMX tokens and Multiplier Points."
  // }, {
  //   id: 3,
  //   question: "What is the GLP Token? ",
  //   answer: "The GLP token represents the liquidity users provide to the GMX platform for Swaps and Margin Trading.<br><br>To provide liquidity to GLP you <a href='https://gmx.io/buy_glp' target='_blank'>trade</a> your crypto asset BTC, ETH, LINK, UNI, USDC, USDT, MIM, or FRAX to the liquidity pool, in exchange, you gain exposure to a diversified index of tokens while earning 50% of the platform trading fees and esGMX."
  // }, {
  //   id: 4,
  //   question: "What can I trade on GMX? ",
  //   answer: "On GMX you can swap or margin trade any of the following assets: ETH, BTC, LINK, UNI, USDC, USDT, MIM, FRAX, with others to be added. "
  // }]

  // const toggleFAQContent = function(index) {
  //   if (openedFAQIndex === index) {
  //     setOpenedFAQIndex(null)
  //   } else {
  //     setOpenedFAQIndex(index)
  //   }
  // }

  // ARBITRUM

  const arbitrumPositionStatsUrl = getServerUrl(ARBITRUM, "/position_stats");
  const { data: arbitrumPositionStats } = useSWR([arbitrumPositionStatsUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  const arbitrumTotalVolumeUrl = getServerUrl(ARBITRUM, "/total_volume");
  const { data: arbitrumTotalVolume } = useSWR([arbitrumTotalVolumeUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  // AVALANCHE

  const avalanchePositionStatsUrl = getServerUrl(AVALANCHE, "/position_stats");
  const { data: avalanchePositionStats } = useSWR([avalanchePositionStatsUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  const avalancheTotalVolumeUrl = getServerUrl(AVALANCHE, "/total_volume");
  const { data: avalancheTotalVolume } = useSWR([avalancheTotalVolumeUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  // Total Volume

  const arbitrumTotalVolumeSum = getTotalVolumeSum(arbitrumTotalVolume);
  const avalancheTotalVolumeSum = getTotalVolumeSum(avalancheTotalVolume);

  let totalVolumeSum = bigNumberify(0);
  if (arbitrumTotalVolumeSum && avalancheTotalVolumeSum) {
    totalVolumeSum = totalVolumeSum.add(arbitrumTotalVolumeSum);
    totalVolumeSum = totalVolumeSum.add(avalancheTotalVolumeSum);
  }

  // Open Interest

  let openInterest = bigNumberify(0);
  if (
    arbitrumPositionStats &&
    arbitrumPositionStats.totalLongPositionSizes &&
    arbitrumPositionStats.totalShortPositionSizes
  ) {
    openInterest = openInterest.add(arbitrumPositionStats.totalLongPositionSizes);
    openInterest = openInterest.add(arbitrumPositionStats.totalShortPositionSizes);
  }

  if (
    avalanchePositionStats &&
    avalanchePositionStats.totalLongPositionSizes &&
    avalanchePositionStats.totalShortPositionSizes
  ) {
    openInterest = openInterest.add(avalanchePositionStats.totalLongPositionSizes);
    openInterest = openInterest.add(avalanchePositionStats.totalShortPositionSizes);
  }

  // user stat
  const arbitrumUserStats = useUserStat(ARBITRUM);
  const avalancheUserStats = useUserStat(AVALANCHE);
  let totalUsers = 0;

  if (arbitrumUserStats && arbitrumUserStats.uniqueCount) {
    totalUsers += arbitrumUserStats.uniqueCount;
  }

  if (avalancheUserStats && avalancheUserStats.uniqueCount) {
    totalUsers += avalancheUserStats.uniqueCount;
  }

  const LaunchExchangeButton = () => {
    return (
      <HeaderLink
        className="default-btn"
        to="/trade"
        redirectPopupTimestamp={redirectPopupTimestamp}
        showRedirectModal={showRedirectModal}
      >
        <Trans>Trade now</Trans>
      </HeaderLink>
    );
  };

  return (
    <div>
      <div className="Home">
        <div className="Home-top">
          {/* <div className="Home-top-image"></div> */}
          <div className="Home-title-section-container default-container">
            <div className="Home-title-section">
              <div className="Home-title">
                <Trans>
                  User-driven
                  <br />
                  <span className="Home-title-subtext">WEB 3.0</span>
                  <br />
                  Digital asset exchange
                </Trans>
                <br />
                <LaunchExchangeButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
