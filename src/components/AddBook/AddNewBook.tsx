import { Button, Card, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddBookMutation } from "../../redux/features/Book/BookApi";
import Loading from "../shared/Loading";
import NavbarMenu from "../shared/Navbar";

const AddNewBook = () => {
  const [addBook, { isLoading, isSuccess }] = useAddBookMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const genre = e.target.genre.value;
    const publicationDate = e.target.publicationDate.value;
    const data = {
      title,
      author,
      genre,
      publicationDate,
    };
    const response: any = await addBook(data);
    if (response?.data?.success) {
      toast.success("The Book Added Sucessfully");
      navigate("/");
    }
  };

  return (
    <>
      <NavbarMenu />
      <div className="grid h-screen justify-center content-center ">
        <h1 className="py-10 text-center text-2xl font-semibold">
          Add New Book
        </h1>
        <Card className="lg:w-[460px] w-[350px]  ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Book Title" />
              </div>
              <TextInput id="title" name="title" required type="text" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="author" value="Author Name" />
              </div>
              <TextInput id="author" name="author" required type="text" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="genre" value="Genre" />
              </div>
              <TextInput id="genre" name="genre" required type="text" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="publicationDate" value="Publication Date" />
              </div>
              <TextInput
                id="publicationDate"
                name="publicationDate"
                required
                type="date"
              />
            </div>

            <Button type="submit">Add Book</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddNewBook;
