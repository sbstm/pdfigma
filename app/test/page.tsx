"use client";
import Test from "@/components/Test";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import DOMPurify from "dompurify";
import { DrawerDialog } from "@/components/Editnilai";

interface EmbedSchema {
  code: string;
  nama: string;
}

const page = () => {

return (
<div className="">
  <DrawerDialog /> 
</div>

);
};

export default page;

// const [embeds, setEmbeds] = useState<EmbedSchema[]>([{ code: "", nama: "" }]);

// const handleInputChange = (
//   index: number,
//   field: keyof EmbedSchema,
//   value: string
// ) => {
//   const newEmbeds = [...embeds];
//   newEmbeds[index][field] = value;
//   setEmbeds(newEmbeds);
// };

// const addEmbed = () => {
//   setEmbeds([...embeds, { code: "", nama: "" }]);
// };

// return (
//   <div>
//     {embeds.map((embed, index) => (
//       <div key={index}>
//         <Input
//           placeholder="Nama Embed"
//           value={embed.nama}
//           onChange={(e) => handleInputChange(index, "nama", e.target.value)}
//         />
//         <Input
//           placeholder="Kode Embed"
//           value={embed.code}
//           onChange={(e) => handleInputChange(index, "code", e.target.value)}
//         />
//       </div>
//     ))}
//     <div>
//       {embeds.map((embed, index) => (
//         <div key={index}>
//           <h2>{embed.nama}</h2>
//           {embed.code && (
//             <div
//               className="embed-container"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(embed.code, {
//                   ADD_TAGS: ["iframe"],
//                 }),
//               }}
//             />
//           )}
//         </div>
//       ))}
//       <button onClick={addEmbed}>Add Embed</button>
//     </div>
//   </div>