"use client";

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import Types, {CategoryType} from "./types";


interface Files {
    id: string,
    file: File,
    previewUrl: string
} 

const categories = ["cases", "fans", "cooler", "motherboard", "cpu", "graphics-card", "ram", "storage", "power-supply", "combo", "prebuilt"];

export default function Form() {
    const [category, setCategory] = useState<CategoryType>("select a category");
    const [descriptionCount, setDescriptionCount] = useState(3);
    const [files, setFiles] = useState<Files[]>([]);
    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map(file => ({
                id: `${file.name}-${Date.now()}-${Math.random()}`,
                file: file,
                previewUrl: URL.createObjectURL(file)
            }));
            setFiles(files => [...files, ...newFiles]);
        }
    };
    const deleteImage = (id: string, url: string) => {
            setFiles(files => files.filter(fileObj => fileObj.id !== id));
            URL.revokeObjectURL(url); 
    };
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as CategoryType;
        setCategory(selectedValue)
    }
    return (
        <form className=" text-xl h-[70vh] w-1/3 overflow-y-auto rounded-2xl scrollbar-none text-slate-200 font-bold bg-linear-to-r from-violet-600 to-indigo-600 flex flex-col p-10 gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="category">Choose a category:</label>
                <select className="p-2 border border-gray-300" name="category" id="category" onChange={handleCategoryChange} value={category}>
                    <option value="select a category" className="text-slate-200" disabled>Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category} className="text-black">{category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Name:</label>
                <input type="text" className="border border-gray-300 block p-2  focus:outline-none focus:border-blue-500 focus:ring-2  focus:ring-blue-400" name="name" id="name" placeholder="Enter Product Name" />
            </div>
            <Types category={category} />
            <p>Product Description</p>
            {Array.from({ length: descriptionCount }).map((_, index) => {
                return (
                    <div key={index} className="flex flex-col gap-2">
                        <label htmlFor={`label-${index}`}>Label :</label>
                        <input type="text" id={`label-${index}`} className="border border-gray-200 block p-2  focus:outline-none focus:border-blue-500 focus:ring-2  focus:ring-blue-400" name={`label-${index}`} placeholder={`Specs, warranty, etc... `} />
                        <label htmlFor={`description-${index}`}>Description :</label>
                        <textarea rows={2} className="border border-gray-200 block  w-full resize-none p-2  focus:outline-none focus:border-blue-500 focus:ring-2  focus:ring-blue-400 " name={`description-${index}`} placeholder={`Description... `}></textarea>
                    </div>
                );
                })}
                <div className="cursor-pointer flex gap-4" onClick={() => setDescriptionCount(descriptionCount + 1)}>
                    <PlusCircleIcon className="text-gray-200 h-6 w-6"  />
                    <span>Add Description</span>
                </div>
            <input type="file" className="hidden" id="file-input" accept="image/*" multiple onChange={(e) => handleFiles(e)} />
            <label htmlFor="file-input" className="cursor-pointer flex gap-4">
                <PlusCircleIcon className="inline-block cursor-pointer h-6 w-6 text-gray-200" />
                <span>Upload Product Images</span>
            </label>
            <div className="flex flex-wrap gap-4">
                {files.map((fileObj) => {
                    return (
                        <div className="relative" key={fileObj.id}>
                            <Image src={fileObj.previewUrl} alt="Preview" width={100} height={100} className="inline" />
                            <TrashIcon className="  absolute text-red-500 top-1 right-1 cursor-pointer h-6 w-6 " onClick={()=> deleteImage(fileObj.id, fileObj.previewUrl)} />        
                        </div>
                    );
                })}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer mt-2">
                Submit
            </button>
        </form>
    );
}
