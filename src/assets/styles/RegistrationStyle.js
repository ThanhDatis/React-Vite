import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  padding: "0 100px",
  margin: "20px auto",
  [theme.breakpoints.down("md")]: {
    padding: "0 20px",
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  maxWidth: "1000px",
  marginBottom: theme.spacing(2),
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: "40px 120px",
  width: "100%",
  maxWidth: "1000px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
}));

export const SocialButton = styled(Button)(() => ({
  padding: "10px 20px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
  color: "#333",
  backgroundColor: "#fff",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "200px",
  "&:hover": {
    border: "1px solid #333",
    transform: "translateY(-1px)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiButton-startIcon": {
    marginRight: "10px",
  },
}));

export const UploadContainer = styled(Box)(() => ({
  marginBottom: "30px",
  display: "flex",
  justifyContent: "center",
}));

export const UploadBox = styled(Paper)(() => ({
  border: "2px dashed #ddd",
  width: "100px",
  height: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  backgroundColor: "transparent",
  "&:hover": {
    borderColor: "#333",
  },
}));

export const UploadText = styled(Typography)(() => ({
  fontSize: "12px",
  color: "#777",
  marginTop: "4px",
}));

export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: "100%",
  "& .section-title": {

  },
  // [theme.breakpoints.down('md')]: {
  //     marginBottom: theme.spacing(3),
  // },
}));

export const SectionTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "15px",
  textAlign: "center",
//   color: theme.palette.primary.dark,
}));

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ddd",
    },
    "&:hover fieldset": {
      borderColor: "#333",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333",
      boxShadow: "0 0 0 0.3px rgba(0, 0, 0, 0.1)",
    },
  },
}));

export const SubmitButton = styled(Button)(() => ({
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  padding: "12px 40px",
  borderRadius: "3px",
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "uppercase",
  margin: "0 auto",
  display: "block",
  minWidth: "200px",
  "&:hover": {
    backgroundColor: "#333",
    transform: "translateY(-1px)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    transform: "none",
    boxShadow: "none",
  },
}));

export const StyledDivider = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  margin: "30px 0",
  width: "100%",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#ddd",
  },
  "&::after": {
    background: "#fff",
    padding: "0 20px",
    color: "#666",
    fontSize: "14px",
    position: "relative",
    zIndex: 1,
  },
}));
