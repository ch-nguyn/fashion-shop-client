import * as React from "react";

export interface IHeadingHomepage {
  title: string;
  heading: string;
}

export default function HeadingHomepage(props: IHeadingHomepage) {
  return (
    <div className="py-14 text-center">
      <div>
        <h3 className="font-medium mb-2">{props.title}</h3>
        <h2 className="text-2xl font-semibold">{props.heading}</h2>
      </div>
    </div>
  );
}
