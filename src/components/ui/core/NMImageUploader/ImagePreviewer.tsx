/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../input";
import { Label } from "../../label";
import Image from "next/image";
import { Button } from "../../button";
import { X } from "lucide-react";

type TImageUploaderProps = {
    className?: string;
    imagePreview: string[];
    setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
    setImagePreview: Dispatch<SetStateAction<[] | string[]>>;
}

const ImagePreviewer = ({imagePreview, className, setImageFiles, setImagePreview}: TImageUploaderProps) => {
    const handleRemove = (index: number) => {
        setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
        setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
    }

    return (
        <div className={className}>
            {
                imagePreview.map((image, idx) => (
                    <div key={idx} className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300">
                        <Image src={image} width={200} height={200} alt="image" />
                        <Button type="button" size="sm" className="bg-red-500 hover:bg-red-400 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full" onClick={() => handleRemove(idx)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ))
            }
        </div>
    );
};

export default ImagePreviewer;