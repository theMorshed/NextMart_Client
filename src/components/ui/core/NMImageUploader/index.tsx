/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../input";
import { Label } from "../../label";
import Image from "next/image";

type TImageUploaderProps = {
    imageFiles: File[] | [];
    setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
}

const NMImageUploader = ({imageFiles, setImageFiles}: TImageUploaderProps) => {
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file =  event.target.files![0];
        setImageFiles((prev) => [...prev, file]);

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImagePreview((prev) => [...prev, reader.result as string]);                
            }
        }
        event.target.value = "";
    }

    return (
        <div>
            <Label className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition" htmlFor="upload_logo">Upload Logo</Label>
            <Input onChange={handleImageChange} className="hidden" id="upload_logo" type="file" accept="image/*" multiple />
            <div>
                {
                    imagePreview.map((image, idx) => (
                        <Image key={idx} src={image} width={200} height={200} alt="image" />
                    ))
                }
            </div>
        </div>
    );
};

export default NMImageUploader;