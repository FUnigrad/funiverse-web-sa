import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import MuiLink from '@mui/material/Link';
import { Link } from 'react-router-dom';
import type { MRT_ColumnDef } from 'material-react-table';
import { MRT_Row } from 'material-react-table';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
// import Select from 'react-select';
import { Group, GroupType, Workspace } from 'src/@types';
import { QueryKey, groupApis, syllabusApis, workspaceApis } from 'src/apis';
import AsyncSelect from 'src/components/AsyncSelect';
import ListPageHeader from 'src/components/ListEntityPage/ListPageHeader';
import Select from 'src/components/Select';
import Table from 'src/components/Table';
import { ModalContext } from 'src/contexts/ModalContext';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import WorkspaceForm, { WorkspaceFormInputs } from './WorkspaceForm';
import { generateOptions } from 'src/utils';
import { toast } from 'react-toastify';
import WorkspaceForm from './WorkspaceForm';
import Modal from '@mui/material/Modal';
import CircularProgressLabel from 'src/components/CircularProgressLabel';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 100,
  // height: 100,
  bgcolor: '#fff',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '50%',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // pt: 2,
  // px: 4,
  // pb: 3,
};
function WorkspacePage() {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(ModalContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // setOpen(false)
  };
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [QueryKey.Workspaces],
    queryFn: workspaceApis.getWorkspaces,
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationFn: (id) => workspaceApis.deleteWorkspace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Workspaces] });
      toast.success(`Delete Workspace successfully!`);
      dispatch({ type: 'close' });
    },
  });

  const createMutation = useMutation<Workspace, unknown, any, unknown>({
    mutationFn: (body) => workspaceApis.createWorkspace(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Workspaces] });
      toast.success(`Create Workspace successfully!`);
      // dispatch({ type: 'close' });
    },
  });

  const isFulfilledSuccess = !createMutation.isLoading && createMutation.isSuccess;
  const isFulfilledFail = !createMutation.isLoading && createMutation.isError;
  // useEffect(() => {
  //   if (!open || isFulfilledFail) {
  //     setProgress(0);
  //     return;
  //   }
  //   const timer = setInterval(
  //     () => {
  //       setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 100));
  //     },
  //     isFulfilledSuccess ? 0 : 1000,
  //   );

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [open, isFulfilledFail, isFulfilledSuccess]);

  const columns = useMemo<MRT_ColumnDef<Workspace>[]>(
    () => [
      {
        header: 'Code',
        accessorKey: 'code',
        size: 50,
      },
      {
        header: 'Name',
        accessorKey: 'name',
        Cell: ({ cell, row }) => (
          <MuiLink component={Link} to={`${row.id}`}>
            {cell.getValue<string>()}
          </MuiLink>
        ),
        enableHiding: false,
      },
      {
        header: 'Domain',
        accessorKey: 'domain',
        size: 50,
      },
    ],
    [],
  );

  function handleCreateWorkspaceSubmit(data: any) {
    dispatch({ type: 'close' });
    // handleOpen();
    createMutation.mutate(data);
  }

  function onCreateEntity() {
    dispatch({
      type: 'open',
      payload: {
        title: 'Create Workspace',
        content: () => <WorkspaceForm onSubmit={handleCreateWorkspaceSubmit} />,
        saveTitle: 'Create',
      },
      onCreateOrSave: () => {},
    });
  }

  function onDeleteEntity(row: MRT_Row<Workspace>) {
    if (!row) return;

    dispatch({
      type: 'open_confirm',
      onConfirm: () => {
        mutation.mutate(row.id as any);
      },
      payload: {
        // title: 'Delete this item',
        content: () => (
          <Typography variant="body1">
            Are you sure you want to delete {row.original.name}?
          </Typography>
        ),
      },
    });
  }

  return (
    <Box>
      <ListPageHeader entity="workspace" onCreateEntity={onCreateEntity} />
      <Table
        columns={columns}
        data={data}
        // onEditEntity={onEditEntity}
        onDeleteEntity={onDeleteEntity}
        state={{
          isLoading,
          showAlertBanner: isError,
          showProgressBars: isFetching,
        }}
        getRowId={(originalRow: MRT_Row<Workspace>) => originalRow.id}
      />
      {/* <Modal
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 1400, '& .MuiBackdrop-root': { background: '#fff', opacity: 0.5 } }}
      >
        <Box sx={style}>
          <CircularProgressLabel value={progress} />
          {isFulfilledSuccess ? (
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 5 }}
              startIcon={<DoneIcon />}
              onClick={() => setOpen(false)}
            >
              Success
            </Button>
          ) : isFulfilledFail ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<ErrorOutlineIcon />}
              onClick={() => setOpen(false)}
              sx={{ mt: 5, width: 'fit-content' }}
            >
              Try again
            </Button>
          ) : null}
        </Box>
      </Modal> */}
    </Box>
  );
}

export default WorkspacePage;
