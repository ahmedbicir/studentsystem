// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles'
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import { viewStudent } from '../store/StudentSlice';

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2.5,3),
}));

const StyledStack = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(1, 3),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const ViewStudent = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(()=>{
    dispatch(viewStudent(id));
  }, [dispatch]);

  // 'students' is the name of the reducer
  const studentToView = useSelector(state => state.students.studentToView)

  return (
 <>
      <Helmet>
        <title> Students | Minimal UI </title>
      </Helmet>

      <Container>
        <StyledStack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h6" gutterBottom>
            View Student Details
          </Typography>
        </StyledStack>

        <Card>
          <StyledBox>
            <Typography variant="h4" sx={{mb:3, pl:3, pr:3 }}>
              {studentToView.firstName} {studentToView.middleName} {studentToView.lastName}
            </Typography>
            <StyledStack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                Phone
              </Typography>
              <Typography>
                {studentToView.phone}
              </Typography>
            </StyledStack>
            <StyledDivider/>
            <StyledStack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                Email address
              </Typography>
              <Typography>
                {studentToView.email}
              </Typography>
            </StyledStack>
            <StyledDivider/>
            <StyledStack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                First name
              </Typography>
              <Typography>
                {studentToView.nationalId}
              </Typography>
            </StyledStack>
            <StyledDivider/>
            <StyledStack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                Sex
              </Typography>
              <Typography>
                {studentToView.gender}
              </Typography>
            </StyledStack>
            <StyledDivider/>
            <StyledStack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                County
              </Typography>
              <Typography>
                {studentToView.county}
              </Typography>
            </StyledStack>
            <StyledDivider/>
          </StyledBox>
        </Card>
      </Container>
   

        
    </>
  )
}

export default ViewStudent