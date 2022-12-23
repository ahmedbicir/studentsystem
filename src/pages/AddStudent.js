import { Helmet } from 'react-helmet-async';
// ** React Imports
import React from 'react'

// ** MUI Imports
import TextareaAutosize from '@mui/material/TextareaAutosize';

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
  senderCustomerType: yup.string().required(),
  senderFirstName: yup.string().required(),
  senderMiddleName: yup.string().required(),
  senderLastName: yup.string().required(),
  senderMobile: yup
    .number()
    .typeError('Mobile field is required')
    // .min(10, obj => showErrors('Mobile number', obj.value.length, obj.min))
    .required(),
  senderTel: yup
    .number()
    .typeError('Tel field is required')
    // .min(10, obj => showErrors('Tel', obj.value.length, obj.min))
    .required(),
  receiver: yup.string().required(),
  remittanceType: yup.string().required(),
  mmtType: yup.string().required(),
  receiverMobile: yup
    .number()
    .typeError('Mobile field is required')
    // .min(10, obj => showErrors('Phone Number', obj.value.length, obj.min))
    .required(),
  receiverFullName: yup.string().required(),
  amount: yup.number().required(),
  amountCurrency: yup.string().required(),
  servicePercentage: yup.number().required(),
  serviceCharge: yup.number().required(),
  totalAmount: yup.number().required(),
  receivingAmount: yup.number().required(),
  recevingAmountCurr: yup.string().required(),
})

const defaultValues = {
  senderFirstName: '',
  senderMiddleName: '',
  senderLastName: '',
  senderMobile: '',
  senderTel: '',
  receiver: ' ',
  remittanceType: '',
  mmtType: '',
  receiverMobile: '',
  receiverFullName: '',
  amount: '',
  amountCurrency: 'USD',
  servicePercentage: '',
  serviceCharge: '',
  totalAmount: '',
  receivingAmount: '',
  recevingAmountCurr: 'USD',
}
const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5,3),
  }));

export default function AddStudentPage() {
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
    // dispatch(postRemittance(data))
    console.log(data)
    reset()
  }
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <Helmet>
        <title> User nm</title>
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
                            name='senderFirstName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='First name'
                                onChange={onChange}
                                placeholder='First name'
                                error={Boolean(errors.senderFirstName)}
                              />
                            )}
                          />
                          {errors.senderFirstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.senderFirstName.message}</FormHelperText>}
                        </FormControl>
                        </Grid>
                <Grid item xs={12} sm={4}>

                        <FormControl fullWidth>
                          <Controller
                            name='senderMiddleName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Middle name'
                                onChange={onChange}
                                placeholder='Middle name'
                                error={Boolean(errors.senderMiddleName)}
                              />
                            )}
                          />
                          {errors.senderMiddleName && <FormHelperText sx={{ color: 'error.main' }}>{errors.senderMiddleName.message}</FormHelperText>}
                        </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>

<FormControl fullWidth>
  <Controller
    name='senderLastName'
    control={control}
    rules={{ required: true }}
    render={({ field: { value, onChange } }) => (
      <TextField
        value={value}
        label='last name'
        onChange={onChange}
        placeholder='last name'
        error={Boolean(errors.senderLastName)}
      />
    )}
  />
  {errors.senderLastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.senderLastName.message}</FormHelperText>}
</FormControl>
</Grid>

<Grid item xs={12} sm={6}>

<FormControl fullWidth>
  <Controller
    name='senderphone'
    control={control}
    rules={{ required: true }}
    render={({ field: { value, onChange } }) => (
      <TextField
        value={value}
        label='Phone Number'
        onChange={onChange}
        placeholder='enter phone number'
        error={Boolean(errors.senderMiddleName)}
      />
    )}
  />
  {errors.senderMiddleName && <FormHelperText sx={{ color: 'error.main' }}>{errors.senderMiddleName.message}</FormHelperText>}
</FormControl>
</Grid>


{/* national id */}
<Grid item xs={12} sm={6}>

<FormControl fullWidth>
  <Controller
    name='senderid'
    control={control}
    rules={{ required: true }}
    render={({ field: { value, onChange } }) => (
      <TextField
        value={value}
        label='National id'
        onChange={onChange}
        placeholder='enter national id'
        error={Boolean(errors.sendernationalid)}
      />
    )}
  />
  {errors.senderMiddleName && <FormHelperText sx={{ color: 'error.main' }}>{errors.sendernationalid.message}</FormHelperText>}
</FormControl>
</Grid>
<Grid item xs={12} sm={12}>

<FormControl fullWidth>
  <Controller
    name='gmail'
    control={control}
    rules={{ required: true }}
    render={({ field: { value, onChange } }) => (
      <TextField
        value={value}
        label='Gmail'
        onChange={onChange}
        placeholder='enter gmail '
        error={Boolean(errors.sendergmail)}
      />
    )}
  />
  {errors.sendergmail && <FormHelperText sx={{ color: 'error.main' }}>{errors.senderemail.message}</FormHelperText>}
</FormControl>
</Grid>

          <Grid sx={12} sm={12}>
                          <FormControl error={ Boolean(errors.senderCustomerType)}>
                          <FormLabel>Gender</FormLabel>
                          <Controller
                            name='gender'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                                <FormControlLabel
                                  value='Male'
                                  label='Male'
                                  sx={errors.senderCustomerType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.senderCustomerType ? { color: 'error.main' } : null} />}
                                />
                                <FormControlLabel
                                  value='Female'
                                  label='Female'
                                  sx={errors.senderCustomerType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.senderCustomerType ? { color: 'error.main' } : null} />}
                                />
                              </RadioGroup>
                            )}
                          />
                          {errors.senderCustomerType && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-radio'>
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
        label='message'
        onChange={onChange}
        placeholder='write message '
        error={Boolean(errors.sendergmail)}
      />
    )}
  />
  {errors.message && <FormHelperText sx={{ color: 'error.main' }}>{errors.message.message}</FormHelperText>}
</FormControl>
</Grid>


<Grid item xs={12}>
                  <Button size='large' type='submit' variant='contained' >
                    Submit
                  </Button>
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