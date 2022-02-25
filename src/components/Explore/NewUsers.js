import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import theme from "../../theme";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

function NewUsers() {
  const [newUsers, setNewUsers] = useState(null);
  const getMoreUsers = () => {
    axios
      .post("/fiveusers", { startAfter: newUsers[newUsers.length - 1].handle })
      .then((res) => {
        setNewUsers(newUsers.concat(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .post("/fiveusers")
      .then((res) => {
        setNewUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ margin: "1rem 3rem" }}>
      <Typography align="center">New Yambos</Typography>
      <div
        style={{
          borderTop: `1px solid ${theme.palette.text.secondary}`,
          marginBottom: "1.5rem",
          marginTop: ".5rem",
        }}
      >
        {newUsers ? (
          newUsers.map((newUser, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "1.5rem 0",
                }}
                key={newUser.handle}
              >
                <Avatar
                  alt={newUser.handle}
                  src={newUser.photo}
                  sx={{
                    height: theme.spacing(5),
                    width: theme.spacing(5),
                    marginRight: ".8rem",
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href={`/${newUser.handle}`}
                      style={{
                        color: theme.palette.text.primary,
                        textDecoration: "underline",
                      }}
                    >
                      <Typography>{newUser.handle}</Typography>
                    </a>
                    <Typography variant="body2" color="textPrimary">
                      joined {newUser.createdAt}
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ width: "100%" }}
                  >
                    {newUser.topArtists.join(", ")}
                  </Typography>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div style={{ display: "flex", margin: "1.5rem 0" }}>
              <Skeleton
                sx={{
                  height: theme.spacing(5),
                  width: theme.spacing(5),
                  marginRight: ".8rem",
                }}
                variant="circular"
              />
              <Skeleton sx={{ flexGrow: 1 }} />
            </div>
            <div style={{ display: "flex", margin: "1.5rem 0" }}>
              <Skeleton
                sx={{
                  height: theme.spacing(5),
                  width: theme.spacing(5),
                  marginRight: ".8rem",
                }}
                variant="circular"
              />
              <Skeleton sx={{ flexGrow: 1 }} />
            </div>
            <div style={{ display: "flex", margin: "1.5rem 0" }}>
              <Skeleton
                sx={{
                  height: theme.spacing(5),
                  width: theme.spacing(5),
                  marginRight: ".8rem",
                }}
                variant="circular"
              />
              <Skeleton sx={{ flexGrow: 1 }} />
            </div>
          </div>
        )}
      </div>
      {newUsers && newUsers[newUsers.length - 1].handle !== "kyle" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: theme.palette.primary.light,
              textTransform: "capitalize",
              color: theme.palette.text.primary,
            }}
            onClick={getMoreUsers}
          >
            more users
          </Button>
        </div>
      )}
    </div>
  );
}

export default NewUsers;
