import React, { useState } from "react";
function Fileupload() {
  //   console.log(files);

  return (
    <div>
      {ansFile.map((questions) => {
        const { id, file, ques } = questions;
        return (
          <>
            <div className="questions">
              <h4>{id}.</h4>
              <h4>{ques}</h4>
            </div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </>
        );
      })}
    </div>
  );
}

export default Fileupload;
