import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { QueryKey, groupApis, syllabusApis } from 'src/apis';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import EditOutlined from '@mui/icons-material/EditOutlined';
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { GroupType, Syllabus, Group, GroupUser } from 'src/@types';
import HeaderRowTable from 'src/components/HeaderRowTable';
import { AxiosResponse } from 'axios';
// import SyllabusFormPage from '../SyllabusForm';
import { ModalContext } from 'src/contexts/ModalContext';
import GroupForm, { GroupFormInputs } from './GroupForm';
import Table from 'src/components/Table';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';

function transfromGroupDetail(data: Group) {
  return {
    name: { label: 'Name', value: data.name },
    private: { label: 'Private', value: `${data.private}` },
    type: { label: 'Type', value: data.type },
    // preRequisite: {
    //   label: 'Pre-Requisite',
    //   value: data.preRequisite ? data.preRequisite.map((s) => s.name).join(', ') : '',
    // },
    active: { label: 'Active', value: `${data.active}` },
  };
}

function GroupDetailPage() {
  const { slug } = useParams();
  const { dispatch } = useContext(ModalContext);
  const columns = useMemo<MRT_ColumnDef<GroupUser>[]>(
    () => [
      {
        header: 'Code',
        accessorKey: 'code',
      },
      {
        header: 'Name',
        accessorKey: 'name',
        enableHiding: false,
      },
      // {
      //   header: 'Active',
      //   accessorKey: 'active',
      //   enableSorting: false,
      //   Cell: ({ cell }) => (
      //     <Checkbox disableRipple disableTouchRipple checked={cell.getValue<boolean>()} readOnly />
      //   ),
      // },
    ],
    [],
  );

  const {
    data: groupDetailData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKey.Groups, 'slug'],
    queryFn: () => groupApis.getGroup(slug),
    enabled: Boolean(slug),
  });
  // const groupUsersQuery = useQuery({
  //   queryKey: [QueryKey.Groups, 'slug', 'users'],
  //   queryFn: () => groupApis.getGroupUsers(slug),
  //   retry: 0,
  //   enabled: Boolean(slug),
  // });

  function onEditGroup() {
    if (!groupDetailData) return;
    const original = groupDetailData;
    let defaultValues: Partial<GroupFormInputs & { id: number; name: string }> = {
      id: +groupDetailData.id,
      type: original.type as any,
      // active: original.active,
    };
    switch (original.type) {
      case GroupType.Class:
        defaultValues = {
          ...defaultValues,
          // name: original.name,
          curriculum: { label: original.curriculum.name, value: original.curriculum.id },
        };
        break;
      case GroupType.Course:
        defaultValues = {
          ...defaultValues,
          syllabus: { value: original.syllabus.id, label: original.syllabus.name },
          class: { value: 1, label: 'NO SEND' }, //WARN: This value will not be in body payload
          teacher: { value: original.teacher.id, label: original.teacher.name },
        };
        break;
      case GroupType.Department:
      case GroupType.Normal:
        defaultValues = {
          ...defaultValues,
          name: original.name,
        };
        break;
    }
    dispatch({
      type: 'open',
      payload: {
        title: 'Edit Group',
        content: () => <GroupForm defaultValues={{ ...(defaultValues as any) }} />,
      },
      onCreateOrSave: () => {},
    });
  }

  function onAddGroupUser() {}

  if (isLoading) return <CircularProgress />;
  if (isError) {
    //TODO: Handle error case here
    return <div>This ID does not exist!</div>;
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h3" component="h3" gutterBottom sx={{ textTransform: 'capitalize' }}>
          Group Detail
        </Typography>
        <Button startIcon={<EditOutlined />} variant="contained" onClick={onEditGroup}>
          Edit
        </Button>
      </Box>
      <HeaderRowTable data={transfromGroupDetail(groupDetailData)} />
      {/* <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: '24px 0' }}
      >
        <Typography variant="h3" component="h3" gutterBottom sx={{ textTransform: 'capitalize' }}>
          Users
        </Typography>
        <Button startIcon={<Add />} variant="contained" onClick={onAddGroupUser}>
          Add user
        </Button>
      </Box> */}
      {/* <Table
        columns={columns}
        data={groupUsersQuery.data}
        // onEditEntity={onEditCurriculumSyllabus}
        // onDeleteEntity={onDeleteEntity}
        state={{
          isLoading: groupUsersQuery.isLoading,
          showAlertBanner: groupUsersQuery.isError,
          showProgressBars: groupUsersQuery.isFetching,
        }}
        getRowId={(originalRow: MRT_Row<GroupUser>) => originalRow.id}
      /> */}
    </Box>
  );
}

export default GroupDetailPage;
