import { useState, FC } from 'react';
import { useQuery } from '@apollo/client';
import { tasks } from './const';
import { Card, CardContent, Fab, Box, Dialog, DialogContent, Alert, CircularProgress, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import TaskList from '../List';
import TaskCreate from '../Update';

import { ITasks } from '../TypesTask';

const Tasks: FC = () => {
    const { loading, error, data } = useQuery<ITasks>(tasks);

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <Card>
                <CardContent>
                    {data?.tasks && (
                        <>
                            <TaskList items={data.tasks} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
                                    <Add />
                                </Fab>
                            </Box>
                        </>
                    )}
                    {loading && (
                        <Stack alignItems="center">
                            <CircularProgress />
                        </Stack>
                    )}
                    {error && <Alert severity="error">Ошибка загрузки</Alert>}
                </CardContent>
            </Card>
            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogContent>
                    <TaskCreate onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Tasks;
