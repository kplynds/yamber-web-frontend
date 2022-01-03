import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.primary.main,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const OpenThisModal = ({ data, close }) => {
  const classes = useStyles(theme);
  const body = (
    <div className={classes.root}>
      <Typography>test</Typography>
      <Typography>{data.content}</Typography>
    </div>
  );
  return (
    <Modal open={data.open} onClose={close}>
      {body}
    </Modal>
  );
};

export default OpenThisModal;
