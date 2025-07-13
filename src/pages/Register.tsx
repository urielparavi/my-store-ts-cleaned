import { ActionFunction, Form, Link, redirect } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitBtn, FormInput } from '@/components';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { customFetch } from '@/utils';

export const action: ActionFunction = async ({
  request,
}): Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/local/register', data);
    toast({ description: 'Registered' });
    return redirect('/login');
  } catch (error) {
    const errorMsg =
      error instanceof AxiosError
        ? error.response?.data.error.message
        : 'Registration Failed';
    toast({ description: errorMsg });
    return null;
  }
};

function Register() {
  return (
    <section className="h-screen grid place-items-center bg-gray-50 dark:bg-zinc-900 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md rounded-lg border border-gray-200 dark:border-zinc-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form method="post" className="flex flex-col">
            <FormInput type="text" name="username" autoComplete="username" />
            <FormInput type="email" name="email" autoComplete="email" />
            <FormInput
              type="password"
              name="password"
              autoComplete="new-password"
            />
            <SubmitBtn text="Register" className="w-full mt-4" />
            <p className="text-center mt-6 text-gray-700 dark:text-gray-300">
              Already a member?{' '}
              <Button
                type="button"
                asChild
                variant="link"
                className="text-orange-600 hover:underline"
              >
                <Link to="/login">Login</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default Register;
