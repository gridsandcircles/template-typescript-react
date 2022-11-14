import { useRef, useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

function App() {
  const inputRef = useRef();
  const bodyRef = useRef();
  const [imageURL, setImageURL] = useState([]);

  return (
    <div>
      <div
        ref={bodyRef}
        style={{
          display: "inline-block",
        }}
        onDrop={(e) => {
          e.preventDefault();
        }}
      >
        <img
          width={500}
          height={500}
          src={"/1b0a71b3-82df-4ab6-95cb-a38e84fd146a.jfif"}
          alt={"Logo"}
        />

        <Draggable>
          {imageURL ? (
            <Resizable
              defaultSize={{
                width: 250,
                height: 250,
              }}
              style={{
                backgroundImage: `url(${imageURL})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              lockAspectRatio={true}
            ></Resizable>
          ) : (
            <></>
          )}
        </Draggable>
      </div>

      <div>
        <input
          ref={inputRef}
          type={"file"}
          onChange={(e) => {
            const fr = new FileReader();
            fr.readAsArrayBuffer(e.target.files[0]);

            fr.onload = () => {
              const blob = new Blob([fr.result]);
              const url = URL.createObjectURL(blob, { type: "image/png" });
              setImageURL(url);
            };
          }}
          style={{
            display: "none",
          }}
        />
        <button
          onClick={() => {
            inputRef.current.click();
          }}
        >
          Upload
        </button>
      </div>

      <button
        onClick={() => {
          html2canvas(bodyRef.current).then((canvas) => {
            var link = document.createElement("a");
            link.download = "Download.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          });
        }}
      >
        Save
      </button>
    </div>
  );
}

export default App;
