import React from "react";

export const Logo = () => {
  return (
    <div className="flex flex-col relative aspect-[2.333] w-[84px] overflow-hidden px-1.5">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/97fd3e9541d744563d22ee2aa5df0e185dd2476626c9263dd3395357d306797d?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/97fd3e9541d744563d22ee2aa5df0e185dd2476626c9263dd3395357d306797d?placeholderIfAbsent=true&width=200 200w"
        className="absolute h-full w-full object-cover inset-0"
        alt="Company logo background"
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/99f09873d7dd4ddcb35f7bed72e0718c/030bd4947ff43d02c890419e6054b59d9c3dba3e8ac1e2d9bed306bf85e9930d?placeholderIfAbsent=true"
        className="aspect-[1.95] object-contain w-full"
        alt="Company logo"
      />
    </div>
  );
};
