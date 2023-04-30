import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { MRT_ColumnDef } from 'material-react-table';
import { MRT_Row } from 'material-react-table';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import Select from 'react-select';
import { Workspace, GroupType } from 'src/@types';
import { QueryKey, workspaceApis, groupApis } from 'src/apis';
import AsyncSelect from 'src/components/AsyncSelect';
import ListPageHeader from 'src/components/ListEntityPage/ListPageHeader';
import Select from 'src/components/Select';
import Table from 'src/components/Table';
import { ModalContext } from 'src/contexts/ModalContext';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
const WorkspaceSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  domain: z.string().min(1),
  personalMail: z.string().email(),
  // eduMail: z.string().email(),
});

export type WorkspaceFormInputs = z.infer<typeof WorkspaceSchema>;
interface WorkspaceFormProps {
  defaultValues?: WorkspaceFormBody;
  onSubmit?: any;
}
export type WorkspaceFormBody = WorkspaceFormInputs & { id: number };
function WorkspaceForm({ defaultValues, onSubmit }: WorkspaceFormProps) {
  const queryClient = useQueryClient();

  const { dispatch } = useContext(ModalContext);
  const mutation = useMutation<Workspace, unknown, typeof defaultValues, unknown>({
    mutationFn: (body) =>
       workspaceApis.createWorkspace(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.Workspaces] });
      toast.success(`Create Workspace successfully!`);
      dispatch({ type: 'close' });
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    clearErrors,
    setValue,

    formState: { errors },
  } = useForm<WorkspaceFormInputs>({
    mode: 'all',
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const watchCode = watch('code');

  useEffect(() => {
    setValue('domain', Boolean(watchCode) ? `${watchCode}.funiverse.world` : '');
  }, [setValue, watchCode]);



  function onSubmitForm(data) {
    const body: WorkspaceFormBody = {
      ...data,
    };
    // dispatch({ type: 'close' });
    if(onSubmit) onSubmit(body);
    // mutation.mutate(body);

  }

  return (
    <>
      <Box
        onSubmit={handleSubmit(onSubmitForm)}
        component="form"
        id="entityForm"
        autoComplete="off"
        noValidate
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          height: 350,
        }}
      >
        <TextField
          label="Name"
          required
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register('name')}
        />
        <TextField
          label="Code"
          required
          error={Boolean(errors.code)}
          helperText={errors.code?.message}
          {...register('code')}
        />
        <TextField
          label="Domain"
          required
          error={Boolean(errors.domain)}
          helperText={errors.domain?.message}
          InputLabelProps={{
            shrink: Boolean(watchCode),
          }}
          disabled
          {...register('domain')}
        />
        <TextField
          label="Email"
          required
          error={Boolean(errors.personalMail)}
          helperText={errors.personalMail?.message}
          {...register('personalMail')}
        />
        {/* <TextField
          label="Edu mail"
          required
          error={Boolean(errors.eduMail)}
          helperText={errors.eduMail?.message}
          {...register('eduMail')}
        /> */}
      </Box>
    </>
  );
}
export default WorkspaceForm;
