import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,



    getUsers: async () => {
        set({isUsersLoading: true});

        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },


    getMessages: async (userID) => {
        set({isMessageLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userID}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isMessageLoading: false});
        }
    }
}))