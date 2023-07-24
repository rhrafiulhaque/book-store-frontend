import moment from "moment";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useLoggedinUser from "../../hooks/loggedInUser";
import {
  useAddReviewsMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from "../../redux/features/Book/BookApi";
import Loading from "../shared/Loading";
import NavbarMenu from "../shared/Navbar";

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookByIdQuery(id);
  const [addReviews] = useAddReviewsMutation();
  const { user } = useLoggedinUser();
  const [writeReview, setWriteReview] = useState("");
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }

  const handleReview = async (e: any) => {
    e.preventDefault();
    const data = {
      reviewerName: user?.name,
      review: writeReview,
    };
    setWriteReview(" ");
    const response: any = await addReviews({ id, data });
    if (response.data.success) {
      toast.success("The Review Added Sucessfully");
      navigate(`/bookdetails/${id}`);
    }
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (isConfirmed) {
      const response: any = await deleteBook(id);
      if (response.data.success) {
        toast.error("Book Deleted Successfully");
        navigate("/");
      }
    }
  };

  return (
    <>
      <NavbarMenu />
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 gap-6">
          <h2 className="text-3xl font-bold mb-4">Book Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div>
              <h3 className="text-xl font-semibold mb-2">Title</h3>
              <p className="mb-4">{book?.data?.title}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Author</h3>
              <p className="mb-4">{book?.data?.author}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Genre</h3>
              <p className="mb-4">{book?.data?.genre}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Publication Date</h3>
              <p className="mb-4">
                {moment(book?.data?.publicationDate).format("MMMM Do YYYY")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Reviews</h3>

              {book?.data?.reviews.length > 0 ? (
                book?.data?.reviews.map((review: any) => (
                  <div className="border w-[220px] border-gray-800 p-4 mb-5">
                    <p className="text-md font-semibold uppercase mb-2">
                      {review.reviewerName}
                    </p>
                    <p>{review.review}</p>
                  </div>
                ))
              ) : (
                <p>No Reviews</p>
              )}
            </div>

            {user && (
              <div>
                <h3 className="text-xl font-semibold mt-10 mb-2">
                  Write a Review
                </h3>
                <form onSubmit={handleReview}>
                  <textarea
                    onChange={(e) => setWriteReview(e.target.value)}
                  ></textarea>
                  <button className="bg-green-500 hover:bg-green-900 text-white font-semibold px-4 py-2 rounded block">
                    Submit
                  </button>
                </form>
              </div>
            )}

            {user && (
              <div className="mt-4">
                <Link
                  to={`/editbook/${id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2"
                >
                  Edit Book
                </Link>
                <button
                  onClick={handleDeleteClick}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                >
                  Delete Book
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
