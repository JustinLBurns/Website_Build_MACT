"use strict";

(() => {
  let userAddress = null;
  const connect = document.querySelector("#wallet-connect");

  if (!connect) {
    console.error("Connect button not found!");
    return;
  }

  connect.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent the <a> tag from scrolling to top
    await connectWallet();
  });

  async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userAddress = accounts[0];
      const walletString = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
      connect.innerHTML = walletString;
      return userAddress;
    } catch (err) {
      if (err.code === 4001) {
        console.log("User rejected wallet connection.");
      } else {
        console.error("Wallet connection error:", err);
      }
    }
  }
})();

