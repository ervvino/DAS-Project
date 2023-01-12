import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "../App.css";

const WalletConnectedDialog = ({ isAccountConnected, connect }) => {
  console.log({ isAccountConnected, connect });
  return (
    <Dialog
      open={!isAccountConnected}
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
