namespace TODO {
    interface ITodo {
        _id?: number;
        title: string;
        description: string;
        img: string;
    }

    type GetTodosResponse = ITodo[];
    type GetTodosRequest = void;

    type PostTodoResponse = ITodo[];
    type PostTodoRequest = ITodo[];

    type EditTodoResponse = ITodo[];
    type EditTodoRequest = {
        _id: number;
        data: ITodo;
    };

    type DeleteTodoResponse = ITodo[];
    type DeleteTodoRequest = number | undefined;
}
