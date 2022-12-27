import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { CognitoUser, CognitoUserPool, CognitoUserSession, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

// action - state management
import { LOGIN, LOGOUT, FAILED_LOGIN, LOADING } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project imports
import Loader from 'components/Loader';
import { AWS_API } from 'config';
import { AWSCognitoContextType, InitialLoginContextProps } from 'types/auth';

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  error: null,
  isLoading: false
};

export const userPool: any = new CognitoUserPool({
  UserPoolId: AWS_API.poolId || '',
  ClientId: AWS_API.appClientId || ''
});

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

// ==============================|| AWS Cognito CONTEXT & PROVIDER ||============================== //

const AWSCognitoContext = createContext<AWSCognitoContextType | null>(null);

export const AWSCognitoProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && userPool.getCurrentUser() && userPool.getCurrentUser()?.username) {
          setSession(serviceToken);
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                name: userPool.getCurrentUser()?.username
              }
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({
      type: LOADING,
      payload: {
        isLoggedIn: false,
        isLoading: true
      }
    });

    const usr = new CognitoUser({
      Username: email,
      Pool: userPool
    });
    const authData = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    usr.authenticateUser(authData, {
      onSuccess: (session: CognitoUserSession) => {
        setSession(session.getAccessToken().getJwtToken());
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: {
              email: authData.getUsername(),
              name: authData.getUsername()
            }
          }
        });
        dispatch({
          type: LOADING,
          payload: {
            isLoggedIn: true,
            isLoading: false
          }
        });
      },
      onFailure: (_err) => {
        dispatch({
          type: FAILED_LOGIN,
          payload: {
            isLoggedIn: false,
            error: _err.message
          }
        });
        dispatch({
          type: LOADING,
          payload: {
            isLoggedIn: true,
            isLoading: false
          }
        });
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // // User was signed up by an admin and must provide new
        // // password and required attributes, if any, to complete
        // // authentication.
        // // the api doesn't accept this field back
        // delete userAttributes.email_verified;
        // // unsure about this field, but I don't send this back
        // delete userAttributes.phone_number_verified;
        // // Get these details and call
        // usr.completeNewPasswordChallenge(password, userAttributes, requiredAttributes);
      }
    });
  };

  const register = (email: string, password: string, firstName: string, lastName: string) =>
    new Promise((success, rej) => {
      userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: `${firstName} ${lastName}` })
        ],
        [],
        async (err: any, result: any) => {
          if (err) {
            rej(err);
            return;
          }
          success(result);
        }
      );
    });

  const logout = () => {
    const loggedInUser = userPool.getCurrentUser();
    if (loggedInUser) {
      setSession(null);
      loggedInUser.signOut();
      localStorage.clear();
      dispatch({ type: LOGOUT });
    }
  };

  const resetPassword = async (email: string) => {};
  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <AWSCognitoContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>
      {children}
    </AWSCognitoContext.Provider>
  );
};

export default AWSCognitoContext;
