import { ActionFunction, Form, Link, redirect } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitBtn, FormInput } from '@/components';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { customFetch } from '@/utils';

/*
  React Router's action function is a handler that collects form data submitted 
  via <Form> components.

  - If the form is inside the same Route where this action is defined,
    you do NOT need to specify the `action` attribute on the <Form>. 
    React Router automatically runs this action on form submit.

  - If the form is rendered in a different Route, you MUST specify the `action` 
    attribute on the <Form> with the path of the Route where the action lives.

  Important: The action function just collects and processes the form data; 
  sending this data to a backend API (e.g., using fetch or axios) must be done 
  inside the action function itself.
*/

// ActionFunction is a special React Router type for form action handlers that process POST requests
export const action: ActionFunction = async ({
  request,
  // We include `Response` in the return type because the `redirect()` function returns a Response object.
  // Without this, TypeScript would throw a type error if we try to return a redirect.
}): Promise<Response | null> => {
  // Await the form data submitted via the POST request
  // formData gives us access to the submitted form data as key-value pairs
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // Convert the FormData object into a plain JavaScript object
  // const data = Object.fromEntries(formData);

  // Example output in console: { username: 'test', email: 'test@test.com', password: 'secret' }
  // console.log(data);

  try {
    await customFetch.post('/auth/local/register', data);
    toast({ description: 'Registered' });
    return redirect('/login');
  } catch (error) {
    // console.log(error);
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
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            {/* <FormInput type="text" name="username" />
            <FormInput type="email" name="email" />
            <FormInput type="password" name="password" /> */}
            <FormInput type="text" name="username" autoComplete="username" />
            <FormInput type="email" name="email" autoComplete="email" />
            <FormInput
              type="password"
              name="password"
              autoComplete="new-password"
            />
            <SubmitBtn text="Register" className="w-full mt-4" />
            <p className="text-center mt-4">
              Already a member?
              <Button type="button" asChild variant="link">
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
