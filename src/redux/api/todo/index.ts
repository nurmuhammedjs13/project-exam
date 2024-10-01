import { api as index } from "..";

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query<TODO.GetTodosResponse, TODO.GetTodosRequest>({
            query: () => ({
                url: `/${ENDPOINT}`,
                method: "GET",
            }),
            providesTags: ["todo"],
        }),
        postTodo: build.mutation<TODO.PostTodoResponse, TODO.PostTodoRequest>({
            query: (data) => ({
                url: `/${ENDPOINT}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["todo"],
        }),
        editTodo: build.mutation<TODO.EditTodoResponse, TODO.EditTodoRequest>({
            query: ({ _id, data }) => ({
                url: `/${ENDPOINT}/${_id}`, // Исправлено
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["todo"],
        }),
        deleteTodo: build.mutation<
            TODO.DeleteTodoResponse,
            TODO.DeleteTodoRequest
        >({
            query: (_id) => ({
                url: `/${ENDPOINT}/${_id}`, // Исправлено
                method: "DELETE",
            }),
            invalidatesTags: ["todo"],
        }),
    }),
});

export const {
    useGetTodosQuery,
    usePostTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation,
} = api;
