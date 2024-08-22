import { atom } from "jotai";
import { PostData } from "../interfaces";

export const postsAtom = atom<PostData[]>([]);
export const editablePostAtom = atom<PostData>();
