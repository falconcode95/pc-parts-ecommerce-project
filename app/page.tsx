import Image from "next/image";
import Form from "../components/form";

export default function Home() {
  return (
    <div className="h-dvh flex justify-center items-center" >
      <Form />
    </div>
  );
}

                  //  <div className="relative flex flex c gap-4" key={fileObj.id}>
                  //       <Image src={fileObj.previewUrl} alt="Preview" width={100} height={100} className="inline" />
                  //       <TrashIcon className=" absolute top-1 right-1 cursor-pointer h-6 w-6 " />        
                  //   </div>
