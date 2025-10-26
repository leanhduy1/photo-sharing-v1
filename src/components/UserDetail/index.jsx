import React from "react";
import { Typography, Stack, Button } from "@mui/material";

import "./styles.css";
import { useParams, Link as RouterLink } from "react-router-dom";

import models from "../../modelData/models";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
		const user = models.userModel(userId);
		if (!user) {
    	return <Typography sx={{ p: 2 }}>User không tồn tại.</Typography>;
  	}
    return (
    <div style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
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
        <Typography variant="body1" sx={{ mt: 1 }}>
          {user.description}
        </Typography>
      )}

      <Button
				variant="contained"
				component={RouterLink}
				to={`/photos/${user._id}`}
				sx={{ mt: 2 }}
			>
				View photos
			</Button>
    </div>
  );
}

export default UserDetail;
