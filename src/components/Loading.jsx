import { ColorRing } from "react-loader-spinner";
export default function Loading({ height, bg, loadingSize }) {
  return (
    <div
      className={`h-[${height}] bg-[${bg}] w-[100%] flex justify-center items-center z-[999]`}
    >
      <ColorRing
        visible={true}
        height={loadingSize}
        width={loadingSize}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={[]}
      />
    </div>
  );
}
