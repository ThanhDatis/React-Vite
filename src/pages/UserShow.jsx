import React from 'react';
import { 
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Avatar,
    Button,
    IconButton,
    Container,
    Link,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Facebook, Twitter, Youtube } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUserShowStyles } from '../theme/utils';
import userAvatar from '../assets/images/image.png';

// const userActionSchema = yup.object ({
//     userId: yup.number().required('User ID is required'),
//     action: yup.string().required('Action is required')
// });

export default function UserShow() {
    const theme = useTheme();
    const styles = useUserShowStyles();
    const IsMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const IsTablet = useMediaQuery(theme.breakpoints.between('md'));

    const users = [
        { id: 1, name: "Name Surname", username: "@username" },
        { id: 2, name: "Name Surname", username: "@username" },
        { id: 3, name: "Name Surname", username: "@username" },
        { id: 4, name: "Name Surname", username: "@username" }
    ];

    const formik = useFormik ({
        initialValues: {
            userId: '',
            action: ''
        },
        // validationSchema: userActionSchema,
        onSubmit: (values) => {
            console.log('User action', values);
            // Handle form submission logic "SHOP WITH ME" button click
        }
    });
    
    const handleShopAction = (userId) => {
        formik.setFieldValue('userId', userId);
        formik.setFieldValue('action', 'shop');
        formik.submitForm();
    };

    const socialIcons = [
        { 
            name: 'Facebook', 
            icon: <Facebook />,
            color: theme.custom.colors.social.facebook,
            href: '#facebook',
        },
        { 
            name: 'Twitter', 
            icon: <Twitter />, 
            color: '#000000',
            href: '#twitter'
        },
        { 
            name: 'YouTube', 
            icon: <Youtube /> ,
            color: '#000000',
            href: '#youtube'
        }
    ];

    // Component tái sử dụng cho UserCard
    const UserCard = ({ user }) => (
        <Card sx={styles.userCard}>
            <CardContent sx={styles.userCardContent}>
                <Avatar 
                    src={userAvatar} 
                    alt={user.name} 
                    sx={styles.avatar}      
                />

                <Typography variant="h6" component="h3" sx={styles.userName}>
                    {user.name}
                </Typography>
                <Typography variant="body2" sx={styles.userUsername}>
                    {user.username}
                </Typography>

                <Box sx={styles.socialIconsContainer}>
                    {socialIcons.map((social) => {
                        const IconComponent = social.icon;
                        return (
                            <IconButton 
                                key={social.name} 
                                href={social.href} 
                                sx={{ 
                                    ...styles.socialIcon,
                                    '&:hover': {
                                        backgroundColor: social.color,
                                        '& .MuiSvgIcon-root': {
                                            color: '#ffffff',
                                        }
                                    }
                                }}
                                aria-label={social.name}
                            >
                                <IconComponent sx={{ color: social.color }} />
                            </IconButton>
                        )
                    })}
                </Box>
            </CardContent>

            <CardActions sx={styles.userCardActions}>
                <Button 
                    variant="contained" 
                    fullWidth 
                    sx={styles.shopButton}
                    onClick={() => handleShopAction(user.id)}
                >
                    SHOP WITH ME
                </Button>
            </CardActions>
        </Card>
    );

    const UserSection = ({ title, seeAllText, seeAllHref = "#" }) => (
        <Box component="section" sx={styles.userSection}>
            <Container maxWidth="lg" sx={styles.userSectionContainer}>
                <Box sx={styles.SectionHeader}>
                    <Typography 
                        variant="h4" 
                        sx={styles.userSectionTitle}
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Link 
                        href={seeAllHref} 
                        sx={styles.seeAllLink}
                        underline="hover"
                    >
                        {seeAllText}
                    </Link>
                </Box>

                <Grid 
                    container spacing={3} 
                    sx={styles.userGrid}
                >
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                            <UserCard user={user} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );

    return (
        <Box sx={styles.mainContainer}>
            <UserSection title="AMBASSADORS" seeAllText="See all ambassadors" />


        </Box>
    );
}
