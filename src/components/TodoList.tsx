"use client";
import { useUploadFileMutation } from "@/redux/api/file";
import {
    useEditTodoMutation,
    useGetTodosQuery,
    useDeleteTodoMutation,
} from "@/redux/api/todo";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoList.module.scss";

const TodoList = () => {
    const [editId, setEditId] = useState<number | null>(null);
    const { data } = useGetTodosQuery();
    const [uploadFileMutation] = useUploadFileMutation();
    const [editTodoMutation] = useEditTodoMutation();
    const [deleteTodoMutation] = useDeleteTodoMutation();
    const { register, handleSubmit, setValue } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const file = data.file[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const responseImage = await uploadFileMutation(formData).unwrap();
            const updateData = {
                title: data.title,
                description: data.description,
                img: responseImage?.url!,
            };

            await editTodoMutation({ _id: editId!, data: updateData }).unwrap();
            setEditId(null);
        } catch (error) {
            console.error("Failed to edit todo:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodoMutation(id).unwrap();
            console.log("Todo deleted:", id);
        } catch (error) {
            console.error("Failed to delete todo:", error);
        }
    };

    return (
        <div className={scss.TodoList}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>Список</h1>
                    <div className={scss.block}>
                        {data?.map((item) => (
                            <div key={item._id}>
                                {item._id === editId ? (
                                    <form
                                        className={scss.form}
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <input
                                            className={scss.input}
                                            placeholder="Редактировать название"
                                            type="text"
                                            {...register("title", {
                                                required: true,
                                            })}
                                        />
                                        <input
                                            className={scss.input}
                                            placeholder="Редактировать описание"
                                            type="text"
                                            {...register("description", {
                                                required: true,
                                            })}
                                        />
                                        <input
                                            type="file"
                                            {...register("file", {
                                                required: true,
                                            })}
                                        />
                                        <button
                                            className={scss.button}
                                            type="submit"
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            className={scss.button}
                                            type="button"
                                            onClick={() => setEditId(null)}
                                        >
                                            Отменить
                                        </button>
                                    </form>
                                ) : (
                                    <div className={scss.card}>
                                        <h1>{item.title}</h1>
                                        <p>{item.description}</p>
                                        <Image
                                            className={scss.image}
                                            quality={70}
                                            width={50}
                                            height={70}
                                            src={item.img}
                                            alt="photo"
                                        />
                                        <div className={scss.buttons}>
                                            <button
                                                className={scss.button}
                                                onClick={() => {
                                                    setEditId(item._id!);
                                                    setValue(
                                                        "title",
                                                        item.title
                                                    );
                                                    setValue(
                                                        "description",
                                                        item.description
                                                    );
                                                }}
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                className={scss.buttonDelete}
                                                onClick={() =>
                                                    handleDelete(item._id!)
                                                }
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
