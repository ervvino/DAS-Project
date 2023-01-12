import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "../App.css";

const WalletConnectedDialog = ({ isWalletConnected, connect }) => {
  console.log({ isWalletConnected, connect });
  return (
    <Dialog
      open={!isWalletConnected}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Wallet not connected</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please connect your wallet
        </DialogContentText>
        <DialogActions>
          <Button onClick={connect}>connect</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectedDialog;
