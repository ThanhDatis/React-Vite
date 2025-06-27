import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import { colors, spacing, commonStyles } from "../../theme/theme"; 

export const StyledContainer = styled(Container)(({ theme }) => ({
  ...commonStyles.container.default,
  [theme.breakpoints.down("md")]: {
    padding: `0 ${spacing.lg}`,
  },
}));  

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  maxWidth: "1000px",
  marginBottom: theme.spacing(2),
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  ...commonStyles.container.content,
  [theme.breakpoints.down("md")]: {
    padding: spacing.lg,
  },
}));

export const SocialButton = styled(Button)(() => ({
  ...commonStyles.button.social,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiButton-startIcon': {
    marginRight: spacing.sm,
  }
}));

export const UploadContainer = styled(Box)(() => ({
  marginBottom: spacing.xxxl,
  display: "flex",
  justifyContent: "center",
}));

export const UploadBox = styled(Paper)(() => ({
  ...commonStyles.UploadBox,
}));

export const UploadText = styled(Typography)(() => ({
  fontSize: "12px",
  color: colors.text.hint,
  marginTop: spacing.xs,
}));

export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SectionTitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "15px",
  textAlign: "center",
//   color: theme.palette.primary.dark,
}));

export const StyledTextField = styled(TextField)(() => ({
  ...commonStyles.textField,
}));

export const SubmitButton = styled(Button)(() => ({
  ...commonStyles.button.primary,
  margin: '0 auto',
  display: 'block',
}));

export const StyledDivider = styled(Box)(() => ({
  ...commonStyles.divider,
}));
