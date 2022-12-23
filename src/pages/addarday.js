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
  senderCustomerType: '',
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
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Student
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
              <Grid container spacing={6}>
                <Grid item md={4} sm={12}>
                  <Divider sx={{mb:4}}/>
                        <FormControl error={Boolean(errors.senderCustomerType)}>
                          <FormLabel>Customer Type</FormLabel>
                          <Controller
                            name='senderCustomerType'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                                <FormControlLabel
                                  value='individual'
                                  label='Individual'
                                  sx={errors.senderCustomerType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.senderCustomerType ? { color: 'error.main' } : null} />}
                                />
                                <FormControlLabel
                                  value='corporate'
                                  label='Corporate'
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
                        
                        <FormControl fullWidth sx={{ mb: 6 }}>
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
                        <FormControl fullWidth sx={{ mb: 6 }}>
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
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='senderLastName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Last name'
                                onChange={onChange}
                                placeholder='Last name'
                                error={Boolean(errors.senderLastName)}
                              />
                            )}
                          />
                          {errors.senderLastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.senderLastName.message}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 6  }}>
                          <Controller
                            name='senderMobile'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <MuiTelInput 
                                label='Mobile' 
                                placeholder='Mobile' 
                                value={value} 
                                onChange={onChange} 
                                error={Boolean(errors.senderMobile)}
                              />
                            )}
                          />
                          {errors.senderMobile && <FormHelperText sx={{ color: 'error.main' }}>{errors.senderMobile.message}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='senderTel'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                type='number'
                                value={value}
                                label='Tel'
                                onChange={onChange}
                                placeholder='Tel'
                                error={Boolean(errors.senderTel)}
                              />
                            )}
                          />
                          {errors.senderTel && <FormHelperText sx={{ color: 'error.main' }}>{errors.senderTel.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                <Grid item md={4} sm={12}>
                  <Typography sx={{fontWeight: 'bold'}}>Receiver Information</Typography>
                  <Divider sx={{mb:4}}/>
                  <Box sx={{ display: 'flex', mb:6}}>
                  <FormControl fullWidth sx={{ mr: 2 }}>
                    <InputLabel
                      id='receiver-select'
                      error={Boolean(errors.receiver)}
                      htmlFor='receiver-select'
                    >
                      Receiver
                    </InputLabel>
                    <Controller
                      name='receiver'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='Receiver'
                          onChange={onChange}
                          inputProps={{ placeholder: 'Receiver' }}
                          error={Boolean(errors.receiver)}
                          labelId='receiver-select'
                          aria-describedby='receiver-select'
                        >
                          <MenuItem value=' '>Please select receiver</MenuItem>
                          <MenuItem value='individual'>Individual</MenuItem>
                          <MenuItem value='corporate'>Corporate</MenuItem>
                        </Select>
                      )}
                    />
                      {errors.receiver && (
                        <FormHelperText sx={{ color: 'error.main' }} id='receiver-select'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Button size='small' variant='contained' color='primary'>
                      Clear
                    </Button>
                  </Box>
                      <FormControl fullWidth error={Boolean(errors.remittanceType)} sx={{ mb: 6 }}>
                          <FormLabel>Remittance Types</FormLabel>
                          <Controller
                            name='remittanceType'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <RadioGroup row {...field} aria-label='remittanceTypes' name='validation-basic-radio'>
                                <FormControlLabel
                                  value='bank transfer'
                                  label='Bank Transfer'
                                  sx={errors.remittanceType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.remittanceType ? { color: 'error.main' } : null} />}
                                />
                                <FormControlLabel
                                  value='cash collection'
                                  label='Cash Collection'
                                  sx={errors.remittanceType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.remittanceType ? { color: 'error.main' } : null} />}
                                />
                                <FormControlLabel
                                  value='mobile money'
                                  label='Mobile Money'
                                  sx={errors.remittanceType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.remittanceType ? { color: 'error.main' } : null} />}
                                />
                              </RadioGroup>
                            )}
                          />
                          {errors.remittanceType && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-radio'>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(errors.mmtType)} sx={{ mb: 6 }}>
                          <FormLabel>MMT Types</FormLabel>
                          <Controller
                            name='mmtType'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <RadioGroup row {...field} aria-label='mmtTypes' name='validation-basic-radio'>
                                <FormControlLabel
                                  value='somalia'
                                  label='Somalia'
                                  sx={errors.mmtType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.mmtType ? { color: 'error.main' } : null} />}
                                />
                                <FormControlLabel
                                  value='mtn uganda'
                                  label='MTN Uganda'
                                  sx={errors.mmtType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.mmtType ? { color: 'error.main' } : null} />}
                                />
                                 <FormControlLabel
                                  value='mpesa transfer'
                                  label='Mpesa Transfer'
                                  sx={errors.mmtType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.mmtType ? { color: 'error.main' } : null} />}
                                />
                                 <FormControlLabel
                                  value='waafi wallet'
                                  label='Waafi Wallet'
                                  sx={errors.mmtType ? { color: 'error.main' } : null}
                                  control={<Radio sx={errors.mmtType ? { color: 'error.main' } : null} />}
                                />
                              </RadioGroup>
                            )}
                          />
                          {errors.mmtType && (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-radio'>
                              This field is required
                            </FormHelperText>
                          )}
                        </FormControl>
                        <Box sx={{ display: 'flex', mb:6 }}>
                          <FormControl fullWidth sx={{ mr: 2 }}>
                            <Controller
                              name='receiverMobile'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Mobile'
                                  onChange={onChange}
                                  placeholder='Mobile'
                                  error={Boolean(errors.receiverMobile)}
                                />
                              )}
                            />
                            {errors.receiverMobile && <FormHelperText sx={{ color: 'error.main' }}>{errors.receiverMobile.message}</FormHelperText>}
                          </FormControl>
                          <Button size='small' variant='contained' color='primary'>
                            Verify
                          </Button>
                        </Box>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='receiverFullName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                value={value}
                                label='Full name'
                                onChange={onChange}
                                placeholder='Full name'
                                error={Boolean(errors.receiverFullName)}
                              />
                            )}
                          />
                          {errors.receiverFullName && <FormHelperText sx={{ color: 'error.main' }}>{errors.receiverFullName.message}</FormHelperText>}
                        </FormControl>
                </Grid>
                <Grid item md={4} sm={12}>
                  <Typography sx={{fontWeight: 'bold'}}>Amount Information</Typography>
                  <Divider sx={{mb:4}}/>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        alignItems= 'flex-start'
                        justifyContent= 'space-between'
                        sx={{mb: 6}}
                      >
                        <FormControl fullWidth sx={{flexBasis:{xs: '100%', sm: '50%'}, mb:{xs:6, sm:0}}}>
                            <Controller
                              name='amount'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Amount'
                                  onChange={onChange}
                                  placeholder='Amount'
                                  error={Boolean(errors.amount)}
                                />
                              )}
                            />
                            {errors.amount && <FormHelperText sx={{ color: 'error.main' }}>{errors.amount.message}</FormHelperText>}
                          </FormControl>
                          <FormControl fullWidth sx={{flexBasis:{xs: '100%', sm: '50%'}}}>
                            <InputLabel
                              id='amountCurrency-select'
                              error={Boolean(errors.amountCurrency)}
                              htmlFor='amountCurrency-select'
                            >
                              Currency
                            </InputLabel>
                            <Controller
                              name='amountCurrency'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <Select
                                  value={value}
                                  label='Currency'
                                  onChange={onChange}
                                  inputProps={{ placeholder: 'Currency' }}
                                  error={Boolean(errors.amountCurrency)}
                                  labelId='amountCurrency-select'
                                  aria-describedby='amountCurrency-select'
                                >
                                  <MenuItem value='USD'>USD</MenuItem>
                                  <MenuItem value='KSH'>KSH</MenuItem>
                                </Select>
                              )}
                            />
                            {errors.amountCurrency && (
                              <FormHelperText sx={{ color: 'error.main' }} id='amountCurrency-select'>
                                This field is required
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Stack>
                      <Stack
                        direction='row'
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        alignItems= 'flex-start'
                        justifyContent= 'space-between'
                        sx={{mb: 6}}
                      >
                          <FormControl sx={{width:{sm: '80%'}}}>
                            <Controller
                              name='servicePercentage'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Service Percentage'
                                  onChange={onChange}
                                  placeholder='Service Percentage'
                                  error={Boolean(errors.servicePercentage)}
                                />
                              )}
                            />
                            {errors.servicePercentage && <FormHelperText sx={{ color: 'error.main' }}>{errors.servicePercentage.message}</FormHelperText>}
                          </FormControl>
                          <Typography variant='body1' sx={{ color: 'text.secondary', textAlign: 'center', width:{xs:'auto', sm:100}}}>%</Typography>
                      </Stack> 
                      <Stack
                        direction='row'
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        alignItems= 'flex-start'
                        justifyContent= 'space-between'
                        sx={{mb: 6}}
                      >
                          <FormControl sx={{width:{sm: '80%'}}}>
                            <Controller
                              name='serviceCharge'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Service Charges'
                                  onChange={onChange}
                                  placeholder='Service Charges'
                                  error={Boolean(errors.serviceCharge)}
                                />
                              )}
                            />
                            {errors.serviceCharge && <FormHelperText sx={{ color: 'error.main' }}>{errors.serviceCharge.message}</FormHelperText>}
                          </FormControl>
                          <Typography variant='body1' sx={{ color: 'text.secondary', textAlign: 'center', width:{xs:'auto', sm:100}}}>USD</Typography>
                      </Stack> 
                      <Stack
                        direction='row'
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        alignItems= 'flex-start'
                        justifyContent= 'space-between'
                        sx={{mb: 6}}
                      >
                          <FormControl sx={{width:{sm: '80%'}}}>
                            <Controller
                              name='totalAmount'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Total Amount'
                                  onChange={onChange}
                                  placeholder='Total Amount'
                                  error={Boolean(errors.totalAmount)}
                                />
                              )}
                            />
                            {errors.totalAmount && <FormHelperText sx={{ color: 'error.main' }}>{errors.totalAmount.message}</FormHelperText>}
                          </FormControl>
                          <Typography variant='body1' sx={{ color: 'text.secondary', textAlign: 'center', width:{xs:'auto', sm:100}}}>USD</Typography>
                      </Stack>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        alignItems= 'flex-start'
                        justifyContent= 'space-between'
                        sx={{mb: 6}}
                      >
                          <FormControl fullWidth sx={{flexBasis:{xs: '100%', sm: '50%'}, mb:{xs:6, sm:0}}}>
                            <Controller
                              name='receivingAmount'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <TextField
                                  value={value}
                                  label='Receiving Amount'
                                  onChange={onChange}
                                  placeholder='Receiving Amount'
                                  error={Boolean(errors.receivingAmount)}
                                />
                              )}
                            />
                            {errors.receivingAmount && <FormHelperText sx={{ color: 'error.main' }}>{errors.receivingAmount.message}</FormHelperText>}
                          </FormControl>
                          <FormControl fullWidth sx={{flexBasis:{xs: '100%', sm: '50%'}}}>
                            <InputLabel
                              id='recevingAmountCurr-select'
                              error={Boolean(errors.recevingAmountCurr)}
                              htmlFor='recevingAmountCurr-select'
                            >
                              Currency
                            </InputLabel>
                            <Controller
                              name='recevingAmountCurr'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange } }) => (
                                <Select
                                  value={value}
                                  label='Currency'
                                  onChange={onChange}
                                  inputProps={{ placeholder: 'Currency' }}
                                  error={Boolean(errors.recevingAmountCurr)}
                                  labelId='recevingAmountCurr-select'
                                  aria-describedby='recevingAmountCurr-select'
                                >
                                  <MenuItem value='USD'>USD</MenuItem>
                                  <MenuItem value='KSH'>KSH</MenuItem>
                                </Select>
                              )}
                            />
                            {errors.recevingAmountCurr && (
                              <FormHelperText sx={{ color: 'error.main' }} id='recevingAmountCurr-select'>
                                This field is required
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Stack>
                      <Typography variant='body1' sx={{color: 'red'}}>*Actual rate will bselecte determined at the time of transaction</Typography>
                </Grid>
                <Grid item xs={12}>  
                  <Divider /> 
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