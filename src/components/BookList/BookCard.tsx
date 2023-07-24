import { IBooks } from "@/globalTypes";
import { Card } from "flowbite-react";
import moment from "moment";
import { Link } from "react-router-dom";

interface IProps {
  book: IBooks;
}

const BookCard = ({ book }: IProps) => {
  const { _id, title, author, genre, publicationDate } = book;
  return (
    <>
      <Card className="max-w-xs mx-auto lg:max-w-sm lg:mx-1">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <p>{title}</p>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <p>Author: {author}</p>
          <p>Genre: {genre}</p>
          <p>
            Publication Date: {moment(publicationDate).format("MMMM Do YYYY")}
          </p>
        </p>

        <Link
          className="p-[10px] text-center text-white hover:text-black transition bg-green-500 rounded-md "
          to={`/bookdetails/${_id}`}
        >
          Details
        </Link>
      </Card>
    </>
  );
};

export default BookCard;
