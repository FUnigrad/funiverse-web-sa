import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRef, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import Button from '@mui/material/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from 'src/apis';
import { termApis } from 'src/apis/termApis';
import { ModalContext } from 'src/contexts/ModalContext';
import Typography from '@mui/material/Typography';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`,
);

function HeaderMenu() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { dispatch } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  // const { data: currentData } = useQuery({
  //   queryKey: [QueryKey.Terms, 'current'],
  //   queryFn: () => termApis.getTerm('current'),
  //   retry: 0,
  // });
  // const { data: nextData } = useQuery({
  //   queryKey: [QueryKey.Terms, 'next'],
  //   queryFn: () => termApis.getTerm('next'),
  //   cacheTime: 0,
  //   retry: 0,
  // });
  // const mutation = useMutation({
  //   mutationFn: termApis.startNewSemester,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [QueryKey.Terms, 'current'] });
  //     queryClient.invalidateQueries({ queryKey: [QueryKey.Terms, 'next'] });
  //     dispatch({ type: 'close' });
  //   },
  // });
  //TODO: Urgent
  function handleStartNewSemester() {
    // dispatch({
    //   type: 'open',
    //   payload: {
    //     content: () => (
    //       <Typography variant="h6" color="initial">
    //         Current semester is:{' '}
    //         <b>
    //           {currentData?.season} {currentData?.year}
    //         </b>
    //         . Do you want to start{' '}
    //         <b>
    //           {nextData?.season} {nextData?.year}
    //         </b>
    //         ?
    //       </Typography>
    //     ),
    //     title: 'Start new semester',
    //     saveTitle: 'Start',
    //   },
    //   onCreateOrSave: () => {
    //     dispatch({ type: 'close' });
    //     setTimeout(() => {
    //       dispatch({
    //         type: 'open',
    //         payload: {
    //           content: () => (
    //             <Typography variant="h6" color="initial">
    //               Doing this action means that you will ... .//TODO: Warning message here
    //             </Typography>
    //           ),
    //           title: 'Confirm start new semester',
    //           saveTitle: 'Confirm',
    //         },
    //         onCreateOrSave: () => {
    //           mutation.mutate();
    //         },
    //       });
    //     }, 0);
    //   },
    // });
  }
  return (
    <>
      {/* <Button variant="outlined" color="primary" onClick={handleStartNewSemester}>
        {currentData?.season} {currentData?.year}
      </Button> */}
      {/* <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/components/buttons"
          >
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Buttons" />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/components/forms"
          >
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Forms" />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Others
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper> */}
      {/* <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/overview">
          Overview
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/tabs">
          Tabs
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/cards">
          Cards
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/modals">
          Modals
        </MenuItem>
      </Menu> */}
    </>
  );
}

export default HeaderMenu;
