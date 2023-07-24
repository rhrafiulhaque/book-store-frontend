import { apiSlice } from "../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/api/v1/books/",
      providesTags: ["getAllBooks"],
    }),
    findByGenre: builder.query({
      query: (genre) => `/api/v1/books/findbygenre/${genre}`,
    }),
    getAllGenre: builder.query({
      query: () => `/api/v1/books/getallgenres`,
      providesTags: ["getGenre"],
    }),
    getAllYear: builder.query({
      query: () => `/api/v1/books/getallyears`,
      providesTags: ["getYear"],
    }),
    getBookById: builder.query({
      query: (id) => `/api/v1/books/getbook/${id}`,
      providesTags: ["bookDetails"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bookDetails", "getAllBooks"],
    }),

    addReviews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/books/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bookDetails"],
    }),

    addBook: builder.mutation({
      query: (data) => ({
        url: `/api/v1/books/create-book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllBooks", "getYear", "getGenre"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/api/v1/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllBooks"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useFindByGenreQuery,
  useGetAllGenreQuery,
  useGetAllYearQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useAddReviewsMutation,
  useAddBookMutation,
  useDeleteBookMutation,
} = bookApi;
