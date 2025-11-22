import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
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
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchModel(`/photo/photosOfUser/${userId}`)
      .then((response) => {
        setPhotos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi lấy ảnh:", error);
        setPhotos([]);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <Typography sx={{ p: 2 }}>Loading photos...</Typography>;
  }

  if (!photos || photos.length === 0) {
    return <Typography sx={{ p: 2 }}>No photos found.</Typography>;
  }

  return (
    <div style={{ padding: 16 }}>
      {photos.map((photo) => {
        const src = `/images/${photo.file_name}`;

        return (
          <div key={photo._id} style={{ marginBottom: 32 }}>
            <Typography variant="caption" display="block" sx={{ mb: 1, color: "gray" }}>
              {fmt(photo.date_time)}
            </Typography>

            <img
              src={src}
              alt={photo.file_name}
              style={{ maxWidth: "100%", border: "1px solid #eee", borderRadius: 4 }}
            />

            <div style={{ marginTop: 12 }}>
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <div key={comment._id} style={{ marginBottom: 10, background: "#f9f9f9", padding: 8, borderRadius: 4 }}>
                    <Typography variant="subtitle2">
                      <RouterLink to={`/users/${comment.user._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                        {comment.user.first_name} {comment.user.last_name}
                      </RouterLink>
                      <span style={{ fontWeight: "normal", color: "gray", fontSize: "0.8em", marginLeft: 8 }}>
                        {fmt(comment.date_time)}
                      </span>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {comment.comment}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  No comments yet.
                </Typography>
              )}
            </div>
            <Divider sx={{ mt: 3 }} />
          </div>
        );
      })}
    </div>
  );
}