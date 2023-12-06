import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services";
import { Layout } from "../components/layouts";
import { Avatar, Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { AppointmentOwner } from "../models/AppointmentModel";
import { UserDetailCard } from "../components/users";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function UserDetail() {
    // 👇️ get ID from url
    const { id: userId } = useParams();
    const [user, setUser] = useState<AppointmentOwner>();
    
    const getUserInfo = async () => {
        const userData = await getUserById(userId as string);
        setUser(userData);
    }

    useEffect(() => {
        getUserInfo();
        // get events that user had gone
    }, []);
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Layout>
            {
                user ?
                    <Paper sx={{ borderRadius: '22px' }}>
                        <Grid container sx={{ p: 2 }}>
                            <Grid item xs={12} sm={4}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Avatar alt="Remy Sharp" src={user.img} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography variant="h4" gutterBottom>{`${user.name} ${user.surname}`}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>{`${user.phone} | ${user.email}`}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Detalle" />
                                            <Tab label="Eventos" />
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={value} index={0}>
                                        <UserDetailCard user={user}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>
                                        Pronto verá los eventos a los que asistió y los que organizó
                                    </CustomTabPanel>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                    : <Typography>Cargando</Typography>
            }
        </Layout>
    )
}

export default UserDetail