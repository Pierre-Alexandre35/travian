import React, { FC, useState, useEffect } from 'react';
import { Paper, Grid, TextField, Button, MenuItem, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { signUp, isAuthenticated } from '../utils/auth';
import { fetchTribes } from '../utils/api'; // ✅ Import the API function

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
  button: {
    textTransform: 'none',
  },
  marginTop: {
    marginTop: 10,
  },
}));

export const SignUp: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [tribeId, setTribeId] = useState<string>('');
  const [tribes, setTribes] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // 🔹 Fetch tribes when the component mounts
  useEffect(() => {
    const loadTribes = async () => {
      try {
        const data = await fetchTribes();
        setTribes(data); // ✅ Store the fetched tribes
      } catch (err) {
        console.error('Error loading tribes:', err);
        setError('Failed to load tribes');
      } finally {
        setLoading(false);
      }
    };

    loadTribes();
  }, []);

  const handleSubmit = async (_: React.MouseEvent) => {
    if (!tribeId) {
      setError('Tribe selection is required');
      return;
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    try {
      const data = await signUp(email, password, passwordConfirmation, tribeId);
      if (data) {
        history.push('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  return isAuthenticated() ? (
    <Redirect to="/" />
  ) : (
    <Paper className={classes.padding}>
      <div className={classes.margin}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md xs>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              fullWidth
              autoFocus
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md xs>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md xs>
            <TextField
              id="passwordConfirmation"
              label="Confirm password"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item md xs>
            {loading ? (
              <CircularProgress /> // ✅ Show loader while fetching tribes
            ) : (
              <TextField
                select
                id="tribe_id"
                label="Select Tribe"
                value={tribeId}
                onChange={(e) => setTribeId(e.target.value)}
                fullWidth
                required
              >
                {tribes.map((tribe) => (
                  <MenuItem key={tribe.id} value={tribe.id}>
                    {tribe.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
        </Grid>
        <br />
        {error && (
          <Grid container>
            <Grid item xs>
              <Alert severity="error">{error}</Alert>
            </Grid>
          </Grid>
        )}
        <Grid container justify="center" className={classes.marginTop}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};
