import React, { useEffect, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  Tooltip,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddUserFormValidationSchema from "../../FormValidations/AddUserFormValidation";
import authAxios from "../../Utils/axios-header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  deleteItem,
  editUserDetails,
  Toast,
  userSignup,
} from "../../services/auth-services";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import LoadingSkeleton from "../Loading/LoadingSkeleton";

const theme = createTheme();

const SignupForm = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [editUser, setEditUser] = useState({ edit: false, id: "" });
  const [search, setSearch] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(AddUserFormValidationSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (editUser.edit) {
        let response = await editUserDetails(editUser.id, data);
        if (response) {
          setEditUser({ edit: false, id: "" });
          reset({ firstName: "", lastName: "", email: "" });
          setRefresh(!refresh);
        }
      } else {
        const response = await userSignup(data);
        if (response) {
          setRefresh(!refresh);
          reset("", { keepValues: false });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const edit = async (id) => {
    let data = users.find((data) => data._id === id);
    reset({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    setEditUser({ edit: true, id });
  };

  // const searchUser = async (query) => {
  //     if (query === '') {
  //         setRefresh(!refresh)
  //     } else {
  //         const { data } = await authAxios.get('/users/search-users-by-email/' + query)
  //         return data
  //     }

  // }

  // const handleChange = async (e) => {
  //     setSearch(e.target.value)

  //     let response = await searchUser(e.target.value)
  //     if (response) {
  //         setUsers(response)
  //     } else {
  //         setRefresh(!refresh)
  //     }
  // }

  const getSuggestions = async (query) => {
    if (query === "") {
      setRefresh(!refresh);
      setSearch(false)
    } else {
      const { data } = await authAxios.get(
        "/users/search-users-by-email/" + query
      );
      setUsers(data);
      setLoading(false);
      setSearch(true)
    }
  };

  const debounce = function (fn, d) {
    let timer;
    return function (e) {
      setLoading(true);
      let context = this,
        args = [e.target.value];
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  };

  const debounceForData = debounce(getSuggestions, 300);

  const resetSearch = () => {
    setSearch(false);
    setRefresh(!refresh);
  };

  useEffect(() => {
    setLoading(true);
    authAxios.get("/users/get-all-users").then(({ data }) => {
      data.reverse();
      setUsers(data);
      setLoading(false);
    });
  }, [refresh]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
              borderRadius: 6,
              boxShadow: 5,
            }}
          >
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                width: "100%",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="First Name"
                        variant="standard"
                        fullWidth
                        id="firstName"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Last Name"
                        variant="standard"
                        fullWidth
                        id="lastName"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Email Address"
                        variant="standard"
                        id="email"
                        fullWidth
                        autoComplete="email"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="email"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    {editUser.edit ? "Edit user" : "Add user"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <Container component="main" maxWidth="md" sx={{ mt: 5 }}>
        <Grid container>
          <Grid item>
            <TextField
              label="Search users by email"
              variant="standard"
              id="email"
              autoComplete="email"
              xs={{ mb: 5 }}
              onChange={debounceForData}
            />
          </Grid>
          <Grid item sx={{ mt: 1 }}>
            {search && (
              <Tooltip title="Reset" placement="top">
                <IconButton onClick={resetSearch}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>

        {loading ? (
          <LoadingSkeleton />
        ) : users[0] ? (
          users.map((data) => (
            <Card
              key={data._id}
              sx={{
                justifyContent: "space-between",
                minWidth: 275,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 0,
                borderRadius: 6,
                boxShadow: 3,
                mt: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                  <CardContent
                    sx={{
                      justifyContent: "space-around",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h5" component="div">
                          {data.firstName} {data.lastName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h5" component="div">
                          {data.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={2}>
                  <CardActions>
                    <Tooltip title="Edit" placement="top">
                      <IconButton
                        onClick={() => {
                          edit(data._id);
                        }}
                      >
                        <EditOutlinedIcon color="info" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top">
                      <IconButton
                        onClick={() => {
                          if (deleteItem(data._id)) {
                            setRefresh(!refresh);
                          }
                        }}
                      >
                        <DeleteOutlineOutlinedIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          ))
        ) : (
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: 5 }}
            component="div"
          >
            no users found
          </Typography>
        )}
      </Container>
    </>
  );
};

export default SignupForm;
