import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { QueryKey, groupApis, workspaceApis } from 'src/apis';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import EditOutlined from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import { Workspace } from 'src/@types';
import HeaderRowTable from 'src/components/HeaderRowTable';
import { AxiosResponse } from 'axios';
import WorkspaceForm from './WorkspaceForm';
import { ModalContext } from 'src/contexts/ModalContext';
import { generateOptions } from 'src/utils';
import CircularProgress from 'src/components/CircularProgress';

function transfromWorkspaceDetail(data: Workspace) {
  return {
    name: { label: 'Name', value: data.name },
    code: { label: 'Code', value: data.code },
    domain: { label: 'Domain', value: data.domain },
    adminPersonalMail: { label: 'Admin personal mail', value: data.admin.personalMail },
  };
}

function WorkspaceDetailPage() {
  const { slug } = useParams();
  const { dispatch } = useContext(ModalContext);

  const {
    data: workspaceDetailData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKey.Syllabi, 'slug'],
    queryFn: () => workspaceApis.getWorkspace(slug),
    refetchOnWindowFocus: false,
    // select: (data) => transfromWorkspaceDetail(data),
    retry: 0,
    enabled: Boolean(slug),
  });

  // function onEditWorkspace() {
  //   const defaultValues = {
  //     ...workspaceDetailData,
  //   };
  //   dispatch({
  //     type: 'open',
  //     payload: {
  //       title: 'Edit Workspace in Curriculum',
  //       content: () => <WorkspaceForm defaultValues={defaultValues as any} />,
  //     },
  //     onCreateOrSave: () => {},
  //   });
  // }

  if (isLoading) return <CircularProgress />;
  if (isError) {
    //TODO: Handle error case here
    return <div>This ID does not exist!</div>;
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h3" component="h3" gutterBottom sx={{ textTransform: 'capitalize' }}>
          Workspace Detail
        </Typography>
        {/* <Button startIcon={<EditOutlined />} variant="contained" onClick={onEditWorkspace}>
          Edit
        </Button> */}
      </Box>
      <HeaderRowTable data={transfromWorkspaceDetail(workspaceDetailData)} />
    </Box>
  );
}

export default WorkspaceDetailPage;
