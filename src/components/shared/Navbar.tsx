import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Navbar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useLoggedinUser from "../../hooks/loggedInUser";
import {
  useGetAllGenreQuery,
  useGetAllYearQuery,
} from "../../redux/features/Book/BookApi";
import {
  setGenre,
  setSearch,
  setYear,
} from "../../redux/features/Book/BookSlice";

export default function NavbarMenu() {
  const { user, setUser } = useLoggedinUser();
  const { data: genres } = useGetAllGenreQuery(undefined);
  const { data: years } = useGetAllYearQuery(undefined);
  const dispatch = useDispatch();
  const signOut = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <Navbar>
      <Navbar.Brand>
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >
          Book Store
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            !user ? (
              <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
            ) : (
              <img
                className="rounded-full w-9"
                alt="User settings"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              />
            )
          }
        >
          {user && (
            <>
              <Dropdown.Header>
                <span className="block text-sm">
                  {user?.name.toUpperCase()}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
            </>
          )}

          {!user && (
            <>
              <Dropdown.Item>
                <Link to={"/login"}>Login</Link>{" "}
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/register"}>Register</Link>
              </Dropdown.Item>
            </>
          )}
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        {user && (
          <Navbar.Link>
            <Link to={"/addbook"}>Add New Book</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>

      <div className="lg:flex">
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="lg:block lg:w-[360px] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search by title, author, or genre"
          />
        </div>
        <button
          data-collapse-toggle="navbar-search"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>

      <div>
        <label htmlFor="genre-filter">Genre:</label>
        <select
          id="genre-filter"
          // value={selectedGenre}
          onChange={(e) => dispatch(setGenre(e.target.value))}
        >
          <option value="">All Genres</option>

          {genres?.data.map((genre: string) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="year-filter">Year:</label>
        <select
          id="year-filter"
          // value={selectedYear}
          onChange={(e) => dispatch(setYear(e.target.value))}
        >
          <option value="">All Year</option>

          {years?.data[0]?.years.map((year: any) => (
            <option value={year}>{year}</option>
          ))}
        </select>
      </div>
    </Navbar>
  );
}
