// Wallet connection logic
let counter = 0;

const isWalletConnected = async () => {
  try {
    const { ethereum } = window;

    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log("accounts: ", accounts);

    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("wallet is connected! " + account);
    } else {
      console.log("make sure MetaMask is connected");
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

export const connectWallet = async (setCurrentAccount) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("please install MetaMask");
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error);
  }
};

export const universityCheck = async (
  setDisabled,
  openSnackbar,
  setCounter
) => {
  const value = await new Promise((res, rej) => {
    window.setTimeout(() => {
      const val = localStorage.getItem("uni");

      if ((val || "").length === 0) {
        localStorage.setItem("uni", true);
        res(true);
      }

      res(val);
    }, 3000);
  });

  setCounter(1);

  setDisabled(!(value === "true"));
  openSnackbar("University Wallet detected");
};
