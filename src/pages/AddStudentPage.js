import { Helmet } from 'react-helmet-async';
// ** React Imports
import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Grid, Stack } from '@mui/material'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';


// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { MuiTelInput } from 'mui-tel-input'

// redux and store
import { useDispatch } from 'react-redux';
import { createStudent, } from '../store/StudentSlice';

import Scrollbar from '../components/scrollbar';

// ** Store & Actions Imports

// const showErrors = (field, valueLen, min) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } 
//   else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }

const schema = yup.object().shape({
  gender: yup.string().required(),
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup
    .number()
    .typeError('Mobile field is required')
    // .min(10, obj => showErrors('Mobile number', obj.value.length, obj.min))
    .required(),
    // .min(10, obj => showErrors('Mobile number', obj.value.length, obj.min))
  nationalId: yup
    .number()
    .typeError('Tel field is required')
    // .min(10, obj => showErrors('Tel', obj.value.length, obj.min))
    .required(),
  county: yup.string().required(),
  // remittanceType: yup.string().required(),
  email: yup.string().required(),
  message: yup.string().required(),
 
})

const defaultValues = {
  gender: '',
  firstName: '',
  middleName: '',
  lastName: '',
  phone: '',
  nationalId: '',
  county: ' ',
  email: '',
  message: '',
}
const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5,3),
  }));

export default function AddStudentPage() {
  const dispatch = useDispatch()

  const {
    reset,
    control,
    // setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  
  const onSubmit = (data) => {
    dispatch(createStudent(data))
    reset()
  }
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <Helmet>
        <title> User  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New arday
          </Typography>
        </Stack>
        <Card>
          <Scrollbar>
            <StyledBox>
          {/* {store.isSubmitted ? (
            <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  x
                </IconButton>
              }
              sx={{ mb: 2}}
            >
              Submitted!
            </Alert>
          </Collapse>
          ):''} */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                          <Controller
                            name='firstName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='First name'
                                onChange={onChange}
                                placeholder='First name'
                                error={Boolean(errors.firstName)}
                              />
                            )}
                          />
                          {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                          <Controller
                            name='middleName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Middle name'
                                onChange={onChange}
                                placeholder='Middle name'
                                error={Boolean(errors.middleName)}
                              />
                            )}
                          />
                          {errors.middleName && <FormHelperText sx={{ color: 'error.main' }}>{errors.middleName.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                          <Controller
                            name='lastName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Last name'
                                onChange={onChange}
                                placeholder='Last name'
                                error={Boolean(errors.lastName)}
                              />
                            )}
                          />
                          {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                     <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                                 <Controller
                              name='phone'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <MuiTelInput 
                                  label='Phone' 
                                  placeholder='Phone' 
                                  value={value} 
                                  onChange={onChange} 
                                  error={Boolean(errors.phone)}
                                />
                            )}
                          />
                          {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                 <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                          <Controller
                            name='nationalId'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='nationalId '
                                onChange={onChange}
                                placeholder='National Id'
                                error={Boolean(errors.nationalId)}
                              />
                            )}
                          />
                          {errors.nationalId && <FormHelperText sx={{ color: 'error.main' }}>{errors.nationalId.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                  <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                          <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='email '
                                onChange={onChange}
                                placeholder='Email'
                                error={Boolean(errors.email)}
                              />
                            )}
                          />
                          {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl error={Boolean(errors.gender)}>
                          <FormLabel>gender</FormLabel>
                          <Controller
                            name='gender'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                                <FormControlLabel
                                  value='Male'
                                  label='Male'
                                  sx={errors.gender ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                                />
                                <FormControlLabel
                                  value='Female'
                                  label='Female'
                                  sx={errors.gender ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.gender ? { color: 'error.main' } : null} />}
                                />
                              </RadioGroup>
                            )}
                          />
                          {errors.gender && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-radio'>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth sx={{ mr: 2 }}>
                    <InputLabel
                      id='county-select'
                      error={Boolean(errors.county)}
                      htmlFor='county-select'
                    >
                      County
                    </InputLabel>
                    <Controller
                      name='county'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='County'
                          onChange={onChange}
                          inputProps={{ placeholder: 'County' }}
                          error={Boolean(errors.county)}
                          labelId='county-select'
                          aria-describedby='county-select'
                        >
                          <MenuItem value=' '>Please select county</MenuItem>
                          <MenuItem value='Garissa'>america</MenuItem>
                          <MenuItem value='Wajir'>canada</MenuItem>
                          <MenuItem value='Mandera'>uk</MenuItem>
                        </Select>
                      )}
                    />
                      {errors.county && (
                        <FormHelperText sx={{ color: 'error.main' }} id='county-select'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                </Grid>
                   <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                          <Controller
                            name='message'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='message '
                                onChange={onChange}
                                placeholder='Message'
                                error={Boolean(errors.message)}
                                multiline
                                rows={5}
                              />
                            )}
                          />
                          {errors.message && <FormHelperText sx={{ color: 'error.main' }}>{errors.message.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" type='submit' >Submit</Button>
                  </Grid>
              </Grid>
            </form>
            </StyledBox>
          </Scrollbar>
          </Card>
      </Container>
    </>
  );
}