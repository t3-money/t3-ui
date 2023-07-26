import { Menu } from "@headlessui/react";
import { t, Trans } from "@lingui/macro";
import { helperToast } from "lib/helperToast";
import { FaChevronDown, FaParachuteBox } from "react-icons/fa";
import "./FaucetDropdown.css";

function FaucetDropdown() {
  return (
    <Menu>
      <Menu.Button as="div">
        <button className="App-cta small transparent faucet-btn">
          <span className="faucet">Faucet</span>
          <FaChevronDown />
        </button>
      </Menu.Button>
      <div>
        <Menu.Items as="div" className="menu-itemss">
          <Menu.Item>
            <div
              className="menu-item"
              onClick={() => {
                helperToast.success(t`Clicked on USDC`);
              }}
            >
              <FaParachuteBox />
              <p>
                <Trans>USDC</Trans>
              </p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="menu-item"
              onClick={() => {
                helperToast.success(t`Clicked on USDT`);
              }}
            >
              <FaParachuteBox />
              <p>
                <Trans>USDT</Trans>
              </p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="menu-item"
              onClick={() => {
                helperToast.success(t`Clicked on WBTC`);
              }}
            >
              <FaParachuteBox />
              <p>
                <Trans>WBTC</Trans>
              </p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="menu-item"
              onClick={() => {
                helperToast.success(t`Clicked on LINK`);
              }}
            >
              <FaParachuteBox />
              <p>
                <Trans>LINK</Trans>
              </p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="menu-item"
              onClick={() => {
                helperToast.success(t`Clicked on DAI`);
              }}
            >
              <FaParachuteBox />
              <p>
                <Trans>DAI</Trans>
              </p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="menu-item"
              onClick={() => {
                helperToast.success(t`Clicked on WETH`);
              }}
            >
              <FaParachuteBox />
              <p>
                <Trans>WETH</Trans>
              </p>
            </div>
          </Menu.Item>
        </Menu.Items>
      </div>
    </Menu>
  );
}

export default FaucetDropdown;
