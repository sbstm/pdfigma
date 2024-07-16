import React from "react";
import Grafik from "./Grafik";
import Leger from "./Leger";

import Initarray from "./Initarray";

const TabelNilai = async () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-5 p-10">
        <Grafik />
        <Grafik />
      </div>
      <div className="grid grid-cols-1 gap-5 px-10 ">
        <Leger />
      <Initarray/>
      </div>
    </>
  );
};

export default TabelNilai;
