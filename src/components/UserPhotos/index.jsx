import React from "react";
import { Typography } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function fmt(date) {
  try {
    return new Date(date).toLocaleString();
  } catch {
    return String(date);
  }
}

export default function UserPhotos() {
  const { userId } = useParams();
	const photos = models.photoOfUserModel(userId);
	if (!photos || photos.length === 0) {
    return <Typography sx={{ p: 2 }}>No photos.</Typography>;
  }

  return (
    <div style={{ padding: 16 }}>
      {photos.map((photo) => {
        const src = `${process.env.PUBLIC_URL}/images/${photo.file_name}`;
        return (
          <div key={photo._id} style={{ marginBottom: 24, paddingBottom: 16}}>
            {/* Ảnh */}
            <img
							src={src}
							alt={photo.file_name}
							style={{ maxWidth: "100%", height: "auto", display: "block" }}
						/>

            {/* Thời gian ảnh */}
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Taken at: {fmt(photo.date_time)}
            </Typography>

            {/* Comments */}
            {Array.isArray(photo.comments) && photo.comments.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Comments
                </Typography>
                {photo.comments.map((comment) => (
                  <div key={comment._id} style={{ marginBottom: 12 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      <Typography
                        component={RouterLink}
                        to={`/users/${comment.user._id}`}
                        sx={{ textDecoration: "none", mr: 1 }}
                      >
                        {comment.user.first_name} {comment.user.last_name}
                      </Typography>
                      {fmt(comment.date_time)}
                    </Typography>
                    <Typography variant="body1">{comment.comment}</Typography>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
