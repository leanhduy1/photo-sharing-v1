import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Lỗi lấy chi tiết user:", error);
        setUser(null);
      });
  }, [userId]);

  if (!user) {
    return <Typography sx={{ p: 2 }}>Loading user info...</Typography>;
  }

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>

      {user.location && (
        <Typography variant="body1">
          <strong>Location:</strong> {user.location}
        </Typography>
      )}

      {user.occupation && (
        <Typography variant="body1">
          <strong>Occupation:</strong> {user.occupation}
        </Typography>
      )}

      {user.description && (
        <Typography variant="body1" paragraph>
          <strong>Description:</strong> {user.description}
        </Typography>
      )}

      <Button
        variant="contained"
        component={RouterLink}
        to={`/photos/${user._id}`}
        sx={{ mt: 2 }}
      >
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;