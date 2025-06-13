import clsx from "clsx";
import { useState } from "react";
import "./ImageViewer.css";

interface Props {
  images: string[];
}

const ImageViewer = ({ images }: Props) => {
  const [current, setCurrent] = useState<string>(images[0]);

  const setImage = (src: string) => () => setCurrent(src);

  return (
    <div>
      <div className="image-viewer__display">
        <img
          src={current}
          alt=""
          width={360}
          height={360}
          className="image-viewer__image"
        />
      </div>
      <ul className="image-viewer__list">
        {images.map((img) => {
          const isActive = img === current;
          return (
            <li key={img}>
              <button
                className={clsx("image-viewer__list-item", {
                  "image-viewer__list-item_active": isActive,
                })}
                onClick={setImage(img)}
              >
                <img
                  width={44}
                  height={44}
                  src={img}
                  alt=""
                  className="image-viewer__image"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageViewer;
