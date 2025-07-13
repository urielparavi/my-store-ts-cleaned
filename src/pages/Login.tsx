import {
  Form,
  Link,
  redirect,
  type ActionFunction,
  useNavigate,
} from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitBtn, FormInput } from '@/components';
import { customFetch } from '@/utils';
import { toast } from '@/components/ui/use-toast';
import { type ReduxStore } from '@/store';
import { loginUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks';
import { AxiosResponse } from 'axios';

// The action function is a factory that returns a React Router action handler.
// It receives the Redux store as a parameter to allow dispatching Redux actions inside the action.
export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    // Extract form data from the incoming request (POST from <Form method="POST">)
    const formData = await request.formData();

    // Convert the form data into a plain JavaScript object
    // Example: { identifier: 'test@test.com', password: 'secret' }
    const data = Object.fromEntries(formData);

    try {
      // Send POST request to the backend authentication endpoint with the form data
      const response: AxiosResponse = await customFetch.post(
        '/auth/local',
        data
      );

      // Extract the username and JWT token from the response payload
      const username = response.data.user.username;
      const jwt = response.data.jwt;

      // Dispatch loginUser action to Redux store to update authentication state globally
      // This ensures the app knows the user is logged in and can access protected routes
      store.dispatch(loginUser({ username, jwt }));

      // Redirect the user to the homepage after successful login
      return redirect('/');
    } catch (error) {
      // If the login request fails, show a toast notification to inform the user
      toast({ description: 'Login Failed' });

      // Return null to indicate the action failed and prevent redirection
      return null;
    }
  };

// username: firstExample
// email: firstexample@example.com
// password: 123456

function Login() {
  // Redux dispatcher to send actions to the Redux store
  const dispatch = useAppDispatch();

  // React Router's navigation function to programmatically change route
  const navigate = useNavigate();

  /**
   * loginAsGuestUser:
   * This async function logs in a guest user by making a POST request
   * to the /auth/local endpoint with hardcoded credentials.
   * On success, it dispatches the loginUser action to update Redux state
   * with the user's info and JWT token, then navigates to the home page.
   * If the request fails, it logs the error and shows a toast notification.
   */
  const loginAsGuestUser = async (): Promise<void> => {
    try {
      // Send POST request to authentication endpoint with guest credentials
      const response: AxiosResponse = await customFetch.post('/auth/local', {
        identifier: 'test@test.com', // The username or email to identify the user
        password: 'secret', // Guest user's password
      });
      // console.log(response);
      // response -> data -> user -> username
      // response -> data -> jwt

      // Extract username from the response data
      const username = response.data.user.username;

      // Extract JWT token for authentication purposes
      const jwt = response.data.jwt;

      // Dispatch loginUser action to Redux with username and token
      dispatch(loginUser({ username, jwt }));

      // Redirect user to the homepage after successful login
      navigate('/');
    } catch (error) {
      // Log the error to the console for debugging
      console.log(error);

      // Show a toast notification informing the user that login failed
      toast({ description: 'Login Failed' });
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form component from react-router-dom for handling form submissions */}
          <Form method="POST">
            {/* Input field for email or username */}
            <FormInput
              type="email"
              label="email"
              name="identifier"
              autoComplete="username"
            />

            {/* Input field for password */}
            <FormInput
              type="password"
              name="password"
              autoComplete="current-password"
            />

            {/* Submit button to submit the login form */}
            <SubmitBtn text="Login" className="w-full mt-4" />

            {/* Button to trigger guest user login without filling the form */}
            <Button
              type="button"
              variant="outline"
              onClick={loginAsGuestUser}
              className="w-full mt-4"
            >
              Guest User
            </Button>

            {/* Link to registration page for new users */}
            <p className="text-center mt-4">
              Not a member yet?
              <Button type="button" asChild variant="link">
                <Link to="/register">Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
export default Login;
