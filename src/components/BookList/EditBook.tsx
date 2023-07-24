import { Label, TextInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../redux/features/Book/BookApi";
import Loading from "../shared/Loading";
import NavbarMenu from "../shared/Navbar";
const EditBook = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookByIdQuery(id);

  const [updateBook, { isError, isSuccess }] = useUpdateBookMutation();
  const navigate = useNavigate();

  const handleUpdateData = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const genre = e.target.genre.value;
    const publicationDate = e.target.publicationDate.value;
    const updatedData = {
      title,
      author,
      genre,
      publicationDate,
    };
    const response: any = await updateBook({ id, data: updatedData });

    if (response.data.success) {
      toast.success("The Book Update Successfully");
      navigate(`/bookdetails/${id}`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <NavbarMenu />
      <div className="grid h-screen justify-center content-center ">
        <form
          className="flex lg:w-[460px] w-[350px] flex-col gap-4"
          onSubmit={handleUpdateData}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              defaultValue={book?.data?.title}
              shadow
              type="text"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="author" value="Author" />
            </div>
            <TextInput
              id="author"
              defaultValue={book?.data?.author}
              shadow
              type="text"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="Genre" value="Genre" />
            </div>
            <TextInput
              id="genre"
              defaultValue={book?.data?.genre}
              shadow
              type="text"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="Publication Date" value="Publication Date" />
            </div>
            <TextInput
              id="publicationDate"
              defaultValue={new Date(book?.data?.publicationDate)
                .toISOString()
                .substr(0, 10)}
              shadow
              type="date"
            />
          </div>

          <button
            type="submit"
            className="p-[10px] text-center text-white hover:text-black transition bg-green-500 rounded-md "
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBook;
