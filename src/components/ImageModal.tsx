// ImageModal.tsx
import {
  Box,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Typography
} from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Close
} from "@mui/icons-material";
import { useState, useEffect } from "react";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title: string;
}

export const ImageModal = ({
  open,
  onClose,
  images,
  initialIndex = 0,
  title
}: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!open) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  if (images.length === 0) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: "rgba(0, 0, 0, 0.9)" }
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, sm: 4 },
            outline: "none"
          }}
        >
          {/* Header with Title and Close */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: 16, sm: 32 },
              left: { xs: 16, sm: 32 },
              right: { xs: 72, sm: 88 },
              zIndex: 10
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: { xs: 16, sm: 32 },
              right: { xs: 16, sm: 32 },
              zIndex: 10,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "white",
              width: 48,
              height: 48,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
                transform: "scale(1.1)"
              }
            }}
          >
            <Close />
          </IconButton>

          {/* Main Image Container */}
          <Box
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Box
              component="img"
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1} of ${images.length}`}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 2,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)",
                transition: "all 0.3s ease"
              }}
            />

            {/* Navigation Arrows - Only show if multiple images */}
            {images.length > 1 && (
              <>
                <IconButton
                  onClick={prevImage}
                  sx={{
                    position: "absolute",
                    left: { xs: -50, sm: -70 },
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    width: { xs: 44, sm: 56 },
                    height: { xs: 44, sm: 56 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.25)",
                      transform: "scale(1.1)"
                    }
                  }}
                >
                  <ArrowBackIosNew />
                </IconButton>
                <IconButton
                  onClick={nextImage}
                  sx={{
                    position: "absolute",
                    right: { xs: -50, sm: -70 },
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    width: { xs: 44, sm: 56 },
                    height: { xs: 44, sm: 56 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.25)",
                      transform: "scale(1.1)"
                    }
                  }}
                >
                  <ArrowForwardIos />
                </IconButton>
              </>
            )}
          </Box>

          {/* Bottom Controls */}
          {images.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: 20, sm: 40 },
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 3
              }}
            >
              {/* Image Counter */}
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)"
                }}
              >
                {currentIndex + 1} / {images.length}
              </Box>

              {/* Dot Indicators */}
              <Box sx={{ display: "flex", gap: 1 }}>
                {images.slice(0, 8).map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    sx={{
                      width: idx === currentIndex ? 24 : 10,
                      height: 10,
                      borderRadius: idx === currentIndex ? 2 : "50%",
                      bgcolor: idx === currentIndex 
                        ? "white" 
                        : "rgba(255,255,255,0.4)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: idx === currentIndex 
                          ? "white" 
                          : "rgba(255,255,255,0.7)"
                      }
                    }}
                  />
                ))}
                {images.length > 8 && (
                  <Typography 
                    sx={{ 
                      color: "rgba(255,255,255,0.7)", 
                      fontSize: "0.8rem", 
                      ml: 1,
                      alignSelf: "center"
                    }}
                  >
                    +{images.length - 8}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};