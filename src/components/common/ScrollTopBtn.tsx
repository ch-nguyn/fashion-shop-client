import * as React from "react";

export interface IScrollTopBtnProps {}

export default function ScrollTopBtn(props: IScrollTopBtnProps) {
  const [isScroll, setIsScroll] = React.useState<boolean>(false);
  window.onscroll = function () {
    scrollFunction();
  };
  const scrollFunction = React.useCallback(() => {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }, []);

  return (
    <div className="">
      {isScroll && (
        <div
          onClick={() => window.scrollTo(0, 0)}
          className="fixed bottom-24 md:bottom-7 bg-white z-30 hover:text-fresh cursor-pointer hover:border-fresh right-24 w-[60px] h-[60px] border rounded-full flex items-center justify-center"
        >
          <i className="fa-light fa-angle-up text-2xl animate-bounce"></i>
        </div>
      )}
    </div>
  );
}
