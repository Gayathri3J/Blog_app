// src/pages/LearnOne.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress } from "@mui/material";

const LearnOne = () => {
  const { id } = useParams();   // get blog id from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:4000/blog/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return <Typography align="center">Blog not found!</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" mt={5} px={3}>
      <Card sx={{ maxWidth: "800px", width: "100%", borderRadius: 4, boxShadow: 6 }}>
        
        <CardMedia
          component="img"
          height="400"
          image={post.imageurl || "https://source.unsplash.com/random/1200x400?blog"}
          alt={post.title}
        />

        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            By {post.author || "Unknown"} • {post.username || "Blog User"}
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ mt: 2, lineHeight: 1.6 }}>
            {post.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LearnOne;
