import { IBooks } from "../../globalTypes";
import { useGetAllBooksQuery } from "../../redux/features/Book/BookApi";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../shared/Loading";
import BookCard from "./BookCard";

const BookList = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const { searchTerm, genre, year } = useAppSelector(
    (state) => state.SearchList
  );

  if (isLoading) {
    return <Loading />;
  }

  const filterBySearchTerm = (book: IBooks) => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    const titleMatch = book.title.toLowerCase().includes(searchTermLower);
    const authorMatch = book.author.toLowerCase().includes(searchTermLower);
    const genreMatch = book.genre.toLowerCase().includes(searchTermLower);

    return titleMatch || authorMatch || genreMatch;
  };

  const filterByGenre = (book: IBooks) => {
    if (!genre) return true;
    return book.genre.toLowerCase() === genre.toLowerCase();
  };
  const filterByYear = (book: IBooks) => {
    if (!year) return true;
    const bookYear = new Date(book.publicationDate).getFullYear();

    return bookYear === Number(year);
  };

  const filteredBooks = data?.data?.filter(
    (book: IBooks) =>
      filterBySearchTerm(book) && filterByGenre(book) && filterByYear(book)
  );

  return (
    <>
      <div className="container mx-auto mt-14">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {filteredBooks?.map((book: IBooks) => (
            <BookCard key={book?._id} book={book} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;
