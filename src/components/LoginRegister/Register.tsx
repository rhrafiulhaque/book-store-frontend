import { Button, Card, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/features/users/userApi";
import NavbarMenu from "../shared/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, isSuccess }] =
    useRegisterUserMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      name,
      email,
      password,
    };
    const response: any = await registerUser(data);
    console.log(response.data.data.accessToken);
    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    if (response.data.success) {
      navigate("/");
    }
  };

  return (
    <>
      <NavbarMenu />
      <div className="grid h-screen justify-center content-center ">
        <h1 className="py-10 text-center text-2xl font-semibold">Register</h1>
        <Card className="lg:w-[460px] w-[350px]  ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput name="name" placeholder="" required type="text" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@bookstore.com"
                required
                name="email"
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
            <Button type="submit">Register</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
