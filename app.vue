<script lang="ts" setup>
import { useColorMode, useCycleList } from "@vueuse/core";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import "@unocss/reset/sanitize/assets.css";
import "@unocss/reset/tailwind.css";
import "~~/asset/css/main.css";

const mode = useColorMode();
const modes = ["dark", "light"];
const { next } = useCycleList(modes, { initialValue: mode });

const injected = injectedModule();

const iconSVG = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M300.822 3.90717V68.3743C345.575 79.0708 385.03 105.412 412.066 142.644C439.103 179.877 451.939 225.547 448.26 271.413C444.58 317.278 424.627 360.318 392.001 392.764C359.375 425.21 316.225 444.924 270.339 448.349V404.491C306.809 400.966 340.706 384.143 365.569 357.23C390.432 330.317 404.522 295.196 405.153 258.562C405.785 221.927 392.913 186.342 368.992 158.588C345.071 130.835 311.773 112.854 275.446 108.074V177.435C259.207 173.418 242.122 174.533 226.542 180.625C210.962 186.718 197.653 197.489 188.446 211.457C179.24 225.425 174.589 241.902 175.132 258.622C175.676 275.342 181.388 291.483 191.482 304.823L205.766 290.539C197.694 278.803 193.987 264.61 195.289 250.425C196.59 236.241 202.818 222.96 212.891 212.888C222.963 202.816 236.245 196.59 250.43 195.29C264.615 193.99 278.807 197.699 290.542 205.772L304.827 191.478C299.133 187.16 292.892 183.615 286.268 180.936V147.749C312.427 155.065 335.051 171.606 349.957 194.313C364.863 217.02 371.042 244.357 367.352 271.267C363.661 298.178 350.35 322.841 329.881 340.697C309.412 358.552 283.17 368.391 256.007 368.394V511.995C260.813 511.995 265.601 511.86 270.339 511.599C405.058 504.162 512 392.577 512 256.002C512 129.911 420.841 25.1058 300.822 3.90717ZM336.915 256.002C336.944 237.419 330.549 219.397 318.814 204.987L304.604 219.194C313.491 230.932 317.83 245.489 316.82 260.177C315.81 274.865 309.518 288.692 299.108 299.102C288.697 309.513 274.871 315.804 260.183 316.815C245.495 317.825 230.938 313.486 219.2 304.6L204.998 318.797C211.255 323.899 218.244 328.03 225.732 331.05V364.251C199.572 356.936 176.947 340.395 162.04 317.688C147.133 294.98 140.953 267.643 144.644 240.732C148.335 213.821 161.646 189.157 182.116 171.301C202.586 153.446 228.83 143.607 255.993 143.605V63.1328H256.003V0C114.611 0 0 114.621 0 256.002C0 382.094 91.1593 486.89 211.178 508.088V443.63C166.426 432.933 126.971 406.591 99.9356 369.358C72.9 332.125 60.0639 286.455 63.7439 240.59C67.424 194.724 87.3778 151.685 120.004 119.239C152.63 86.7936 195.78 67.0792 241.665 63.654V107.504C205.194 111.029 171.296 127.851 146.432 154.764C121.568 181.677 107.477 216.799 106.846 253.434C106.215 290.07 119.087 325.656 143.01 353.41C166.932 381.164 200.231 399.143 236.558 403.922V334.551C248.479 337.494 260.913 337.687 272.919 335.115C284.926 332.544 296.19 327.274 305.859 319.706C315.528 312.139 323.349 302.47 328.73 291.434C334.111 280.397 336.911 268.28 336.918 256.002H336.915Z"
  class="fill-current"
/>
<path
  d="M293.314 255.999C293.313 263.38 291.124 270.596 287.022 276.733C282.92 282.87 277.091 287.654 270.271 290.478C263.451 293.302 255.946 294.04 248.707 292.599C241.467 291.159 234.817 287.603 229.598 282.383C224.379 277.163 220.825 270.512 219.386 263.272C217.946 256.032 218.686 248.528 221.512 241.709C224.338 234.889 229.122 229.061 235.26 224.96C241.398 220.86 248.615 218.672 255.996 218.673C260.897 218.673 265.75 219.639 270.278 221.515C274.806 223.391 278.92 226.141 282.386 229.607C285.851 233.073 288.6 237.187 290.475 241.716C292.35 246.244 293.315 251.097 293.314 255.999Z"
  class="fill-current"
/>
</svg>`;

const addCustomStyles = (): void => {
  if (window !== undefined) {
    const styleId = "customOnboard";
    const modeId = "colorMode";
    const isDark = window.document
      .getElementsByTagName("html")[0]
      .classList.contains("dark");
    const onboardEl = window.document.getElementsByTagName("onboard-v2")[0];

    if (onboardEl) {
      onboardEl.shadowRoot.getElementById(modeId)?.remove();
      const style = document.createElement("link");
      style.setAttribute("rel", "stylesheet");
      style.setAttribute("id", modeId);
      if (isDark) style.setAttribute("href", "/css/onboard-dark.css");
      else style.setAttribute("href", "/css/onboard-light.css");
      onboardEl.shadowRoot.append(style);
    }

    if (onboardEl && !onboardEl.shadowRoot.getElementById(styleId)) {
      const style = document.createElement("link");
      style.setAttribute("rel", "stylesheet");
      style.setAttribute("id", styleId);
      style.setAttribute("href", "/css/onboard.css");
      onboardEl.shadowRoot.append(style);
    }
    const root = onboardEl.shadowRoot.childNodes[4];
  }
};

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://mainnet.infura.io/v3/28142553adbc40dca6318f4eb70e7a9b",
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Matic Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
  ],
  appMetadata: {
    name: "Hubble Exchange",
    icon: iconSVG, // svg string icon
    logo: iconSVG, // svg string logo
    description: "Hubble Exchange Decentralized Perpetual Futures on Avalanche",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});

function connectWallet() {
  const wallets = onboard.connectWallet();
  addCustomStyles();
}

if (typeof window !== "undefined") {
  const ethereumButton = document.querySelector("#connetctwallet");
  ethereumButton.addEventListener("click", () => {
    connectWallet();
  });
}
</script>

<template>
  <div class="mains">
    <div class="walletbutton">
      <button class="enableEthereumButton" id="connetctwallet">Connect</button>
      <button
        class="flex items-center px-3 pt-1 pb-1.5 rounded-full"
        @click="next()"
      >
        <div v-if="mode === 'dark'" class="i-carbon-moon"></div>
        <div v-if="mode === 'light'" class="i-carbon-sun"></div>
      </button>
    </div>
  </div>
</template>

<style>
body {
  background-color: #5f9ea0;
}

.mains {
  width: 100%;
}

.walletbutton .enableEthereumButton {
  background-color: #f9f871;
  color: #000;
  border: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 10px 10px 14px 1px rgb(0 0 0 / 20%);
}
</style>
