import { supabase } from "../utils/supabase";
import { Todo } from "./interface";

export const getAllTodos = async () => {
    const todos = await supabase.from("todo").select("*");
    return todos.data;
};

export const addTodo = async (title: string) => {
    await supabase
        .from('todo')
        .insert([{ title }]);
};

export const deleteTodo = async (id: number) => {
    await supabase
        .from('todo')
        .delete()
        .eq('id', id);
};