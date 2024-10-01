"use client";

import { useUploadFileMutation } from "@/redux/api/file";
import { usePostTodoMutation } from "@/redux/api/todo";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoAdd.module.scss";

const TodoAdd = () => {
    const [postTodoMutation] = usePostTodoMutation();
    const [UploadFileMutation] = useUploadFileMutation();
    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const file = data.file[0];
        const formData = new FormData();
        formData.append("file", file);

        const { data: responseImage } = await UploadFileMutation(formData);
        const newData = {
            title: data.title,
            description: data.description,
            img: responseImage?.url!,
        };

        await postTodoMutation(newData);
        console.log(data);
    };

    return (
        <div className={scss.TodoAdd}>
            <div className="container">
                <div className={scss.content}>
                    <h1 className={scss.title}>Добавить </h1>
                    <form
                        className={scss.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            className={scss.input}
                            placeholder="Название"
                            type="text"
                            {...register("title", { required: true })}
                        />
                        <input
                            className={scss.input}
                            placeholder="Описание"
                            type="text"
                            {...register("description", { required: true })}
                        />
                        <input
                            type="file"
                            {...register("file", { required: true })}
                        />
                        <button className={scss.button} type="submit">
                            Добавить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TodoAdd;
