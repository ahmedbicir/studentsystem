import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

// redux and store
import { useSelector, useDispatch } from 'react-redux';
import { retrieveStudents, deleteStudent } from '../store/StudentSlice';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'phone', label: 'Phone Number', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
//   { id: 'message', label: 'Message', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StudentsPage(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [open, setOpen] = useState(null);
  
  const [id, setId] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(()=>{
    dispatch(retrieveStudents());

  },[dispatch]);

  // const STUDENTLIST = useSelector(state => state.students).filter(student => student.isActive)
  const STUDENTL = useSelector(state => state.students.students)
  const STUDENTLIST = STUDENTL.filter(student => student.isActive)
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleSetId = (id) => {
    setId(id)
  
  }
  const handleDelete = () =>{
    // console.log(id)
    dispatch(deleteStudent(id))
  }
   const handleViewStudent = () =>{
      navigate({
        pathname: '/dashboard/view-student',
        search: `id=${id}`,
      });
  }
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = STUDENTLIST.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleClearSelected = () => {
    setSelected([]);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleNavigateAddStudent = () => {
    navigate('/dashboard/add-student')
  }
 
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - STUDENTLIST.length) : 0;

  const filteredStudents = applySortFilter(STUDENTLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredStudents.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Students | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Students
          </Typography>
          <Button variant="contained" onClick={handleNavigateAddStudent} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Student
          </Button>
        </Stack>

        <Card>
          <UserListToolbar selected={selected} handleClearSelected={handleClearSelected} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={STUDENTLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, firstName, lastName, phone, email, gender } = row;
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell align="left">{firstName}</TableCell>

                        <TableCell align="left">{lastName}</TableCell>

                        <TableCell align="left">{phone}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{gender}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick = {(e) => {handleOpenMenu(e); handleSetId(id)}}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={STUDENTLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick = { handleDelete }>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>

        <MenuItem sx={{ color: 'green' }} onClick = { handleViewStudent }>
          <Iconify icon={'eva:eye-outline'} sx={{ mr: 2 }} />
          View
        </MenuItem>
      </Popover>
    </>
  );
}
