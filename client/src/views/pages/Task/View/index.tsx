import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { tasks } from './const';
import { Card, CardContent, Fab, Box, Dialog, DialogContent } from '@mui/material';
import { Add } from '@mui/icons-material';

import TaskList from '../List';
import TaskCreate from '../Update';

const Tasks = () => {
    const { loading, error, data } = useQuery(tasks);

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card>
                {!loading && (
                    <>
                        <CardContent>
                            <TaskList items={data.tasks} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
                                    <Add />
                                </Fab>
                            </Box>
                        </CardContent>
                    </>
                )}
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
