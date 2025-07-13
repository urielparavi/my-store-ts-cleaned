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

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response: AxiosResponse = await customFetch.post(
        '/auth/local',
        data
      );
      const username = response.data.user.username;
      const jwt = response.data.jwt;
      store.dispatch(loginUser({ username, jwt }));
      return redirect('/');
    } catch {
      toast({ description: 'Login Failed' });
      return null;
    }
  };

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      const username = response.data.user.username;
      const jwt = response.data.jwt;
      dispatch(loginUser({ username, jwt }));
      navigate('/');
    } catch {
      toast({ description: 'Login Failed' });
    }
  };

  return (
    <section className="h-screen grid place-items-center bg-gray-50 dark:bg-zinc-900 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg border border-gray-200 dark:border-zinc-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form method="POST" className="flex flex-col">
            <FormInput
              type="email"
              label="Email"
              name="identifier"
              autoComplete="username"
            />

            <FormInput
              type="password"
              name="password"
              autoComplete="current-password"
            />

            <SubmitBtn text="Login" className="w-full mt-4" />

            <Button
              type="button"
              variant="outline"
              onClick={loginAsGuestUser}
              className="w-full mt-4 text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-zinc-700"
            >
              Guest User
            </Button>

            <p className="text-center mt-6 text-gray-700 dark:text-gray-300">
              Not a member yet?{' '}
              <Button
                type="button"
                asChild
                variant="link"
                className="text-orange-600 hover:underline"
              >
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
