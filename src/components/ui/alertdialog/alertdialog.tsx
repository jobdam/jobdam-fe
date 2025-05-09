/** @format */

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import PrivacyContents from "@/constants/privacyContents";
const AlertDialog = ({ children, title, contents }) => (
  <AlertDialogPrimitive.Root>
    <AlertDialogPrimitive.Trigger asChild>
      <button className="inline-flex h-[35px] items-center justify-center underline">
        {children}
      </button>
    </AlertDialogPrimitive.Trigger>
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />

      <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
        <AlertDialogPrimitive.Title className="flex justify-between m-0 text-[17px] font-medium text-mauve12">
          {title}
          <AlertDialogPrimitive.Cancel className="" asChild>
            <button className=" cursor-pointer inline-flex h-[35px] items-center justify-center rounded  px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 select-none">
              X
            </button>
          </AlertDialogPrimitive.Cancel>
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
          {contents}
        </AlertDialogPrimitive.Description>
        <div></div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  </AlertDialogPrimitive.Root>
);

export default AlertDialog;
