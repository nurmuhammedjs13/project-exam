import { url } from "inspector";
import { api as index } from "..";

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
    endpoints: (build) => ({
        uploadFile: build.mutation<
            FILE.UploadFileResponse,
            FILE.UploadFileRequest
        >({
            query: () => ({
                url: `/${ENDPOINT} `,
                method: "GET",
            }),
        }),
    }),
});

export const { useUploadFileMutation } = api;
