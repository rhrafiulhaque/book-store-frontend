import { Button, Card, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/users/userApi";
import Loading from "../shared/Loading";
import NavbarMenu from "../shared/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  if (isLoading) {
    return <Loading />;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      email,
      password,
    };
    const response: any = await loginUser(data);

    if (response.data.success) {
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    }
  };

  return (
    <>
      <NavbarMenu />
      <div className="grid h-screen justify-center content-center ">
        <h1 className="py-10 text-center text-2xl font-semibold">Login</h1>
        <Card className="lg:w-[460px] w-[350px]  ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                name="email"
                placeholder="name@bookstore.com"
                required
                type="email"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                id="password1"
                name="password"
                required
                type="password"
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
