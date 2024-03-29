import { useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import {
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  FormHelperText
} from '@mui/material';

// third-party
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project import
import { useDispatch, useSelector } from 'store';
import MainCard from 'components/MainCard';
import { openSnackbar } from 'store/reducers/snackbar';
import { editSupplier, deleteSupplier } from 'store/reducers/supplier';
import { DayPayment } from 'config';

// types
import { Supplier } from 'types/supplier';

// ==============================|| EDIT SUPPLIER - MAIN ||============================== //

const getInitialValues = (supplier: FormikValues | Supplier) => {
  const newSubstance = {
    NameContact: supplier?.NameContact,
    PhoneContact: supplier?.PhoneContact,
    BusinessName: supplier?.BusinessName,
    EmailContact: supplier?.EmailContact,
    Nit: supplier?.Nit,
    LeadTimeBog: supplier?.LeadTimeBog,
    PaymenTerm: supplier?.PaymenTerm,
    LeadTimeBaq: supplier?.LeadTimeBaq,
    Discount: supplier?.Discount,
    DaysPayment: supplier?.DaysPayment,
    Cupo: supplier?.Cupo,
    Status: supplier?.Status
  };
  return newSubstance;
};

function UpdateSuplier() {
  const history = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const { supplierList } = useSelector((state) => state.supplier);

  const supplier = useMemo(() => {
    if (id) {
      return supplierList.find((item) => item.ID === Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    history(`/supplier`);
  };

  const SubstSchema = Yup.object().shape({
    BusinessName: Yup.string().max(255).required('Razón social es requerido'),
    Nit: Yup.string().max(255).required('NIT es requerido'),
    NameContact: Yup.string().max(255).required('Nombre de Contacto es requerido'),
    EmailContact: Yup.string().max(255).required('Email es requerido'),
    PhoneContact: Yup.string().max(255).required('Teléfono es requerido'),
    PaymenTerm: Yup.string().max(255).required('Plazo de pago es requerido')
  });

  const formik = useFormik({
    initialValues: getInitialValues(supplier!),
    validationSchema: SubstSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(editSupplier(Number(id), values));
        dispatch(
          openSnackbar({
            open: true,
            message: 'Supplier Update successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        history(`/supplier`);
        setSubmitting(false);
      } catch (error: any) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <MainCard>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos Básicos
                  </Typography>
                  <Grid container spacing={1} direction="row">
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Razón Social</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        error={Boolean(touched.BusinessName && errors.BusinessName)}
                        helperText={
                          !Boolean(touched.BusinessName && errors.BusinessName) ? '' : String(touched.BusinessName && errors.BusinessName)
                        }
                        placeholder="Ingresar Razón Social"
                        fullWidth
                        {...getFieldProps('BusinessName')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>NIT</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('Nit')}
                        error={Boolean(touched.Nit && errors.Nit)}
                        helperText={Boolean(touched.Nit && errors.Nit) ? String(touched.Nit && errors.Nit) : ''}
                        placeholder="Ingresar NIT"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos de Contacto
                  </Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Nombre de Contacto</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('NameContact')}
                        error={Boolean(touched.NameContact && errors.NameContact)}
                        helperText={
                          Boolean(touched.NameContact && errors.NameContact) ? String(touched.NameContact && errors.NameContact) : ''
                        }
                        placeholder="Ingresar Nombre de Contacto"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Teléfono</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        {...getFieldProps('PhoneContact')}
                        error={Boolean(touched.PhoneContact && errors.PhoneContact)}
                        helperText={
                          Boolean(touched.PhoneContact && errors.PhoneContact) ? String(touched.PhoneContact && errors.PhoneContact) : ''
                        }
                        placeholder="Ingresar Teléfono"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Email</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        type="email"
                        placeholder="Ingresar Email"
                        fullWidth
                        {...getFieldProps('EmailContact')}
                        error={Boolean(touched.EmailContact && errors.EmailContact)}
                        helperText={
                          Boolean(touched.EmailContact && errors.EmailContact) ? String(touched.EmailContact && errors.EmailContact) : ''
                        }
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <MainCard>
                      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                        Datos de Entregas
                      </Typography>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={6}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lead Time Bogota</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            {...getFieldProps('LeadTimeBog')}
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            error={Boolean(touched.LeadTimeBog && errors.LeadTimeBog)}
                            helperText={
                              Boolean(touched.LeadTimeBog && errors.LeadTimeBog) ? String(touched.LeadTimeBog && errors.LeadTimeBog) : ''
                            }
                            placeholder="Ingresar Lead Time Bogota"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Lead Time Barranquilla</InputLabel>
                          <TextField
                            sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            placeholder="Ingresar Lead Time Barranquilla"
                            fullWidth
                            {...getFieldProps('LeadTimeBaq')}
                            error={Boolean(touched.LeadTimeBog && errors.LeadTimeBog)}
                            helperText={
                              Boolean(touched.LeadTimeBog && errors.LeadTimeBog) ? String(touched.LeadTimeBog && errors.LeadTimeBog) : ''
                            }
                          />
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    Datos de Pago
                  </Typography>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Plazo de pago</InputLabel>
                      <Select
                        fullWidth
                        {...getFieldProps('PaymenTerm')}
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={Boolean(touched.PaymenTerm && errors.PaymenTerm)}
                      >
                        <MenuItem value="" sx={{ color: 'text.secondary' }}>
                          Seleccionar Plazo de pago
                        </MenuItem>
                        <MenuItem value="Pago inmediato">Pago inmediato</MenuItem>
                        {DayPayment.map((option: any) => {
                          return (
                            <MenuItem key={option.id} value={option.id}>
                              {option.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {touched?.PaymenTerm && formik.errors.PaymenTerm && (
                        <FormHelperText error id="ErrorPaymenTerm">
                          {String(errors?.PaymenTerm)}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Cupo</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        placeholder="Ingresar Cupo"
                        fullWidth
                        {...getFieldProps('Cupo')}
                        error={Boolean(touched.Cupo && errors.Cupo)}
                        helperText={Boolean(touched.Cupo && errors.Cupo) ? String(touched.Cupo && errors.Cupo) : ''}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Días pronto pago</InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Días pronto pago"
                        fullWidth
                        {...getFieldProps('DaysPayment')}
                        error={Boolean(touched.DaysPayment && errors.DaysPayment)}
                        helperText={
                          Boolean(touched.DaysPayment && errors.DaysPayment) ? String(touched.DaysPayment && errors.DaysPayment) : ''
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ mb: 1, opacity: 0.5 }}>Descuento pronto pago </InputLabel>
                      <TextField
                        sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
                        placeholder="Ingresar Descuento pronto pago %"
                        fullWidth
                        type="number"
                        {...getFieldProps('Discount')}
                        error={Boolean(touched.Discount && errors.Discount)}
                        helperText={Boolean(touched.Discount && errors.Discount) ? String(touched.Discount && errors.Discount) : ''}
                      />
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 6 }}>
                  <FormControlLabel
                    control={<Switch sx={{ mt: 0 }} defaultChecked={supplier?.Status} value={supplier?.Status} />}
                    label=""
                    labelPlacement="top"
                    {...getFieldProps('Status')}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      dispatch(deleteSupplier(Number(id)));
                      history(`/supplier`);
                    }}
                  >
                    Delete
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }} type="submit" disabled={isSubmitting}>
                    Actualizar
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </MainCard>
    </>
  );
}

export default UpdateSuplier;
