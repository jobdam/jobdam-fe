/** @format */

//react-hook-form ⬅️ 연결 ⬅️ @hookform/resolvers/zod ⬅️ zod
//React Hook Form과 Zod를 연결해주는 브릿지 라이브러리

import { zodResolver } from "@hookform/resolvers/zod";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
  useFormContext,
} from "react-hook-form";

import { Label } from "./label";

import { ZodType, z } from "zod";
import { cn } from "@/utils/cn";

// . 제네릭 타입 파라미터
// TFieldValues:
// 이 제네릭 타입 파라미터는 폼 데이터의 형태를 정의합니다. 기본값으로 FieldValues가 설정되어 있는데, 이는 폼에서 다룰 수 있는 데이터의 형태입니다.
// 예를 들어, TFieldValues는 { email: string, password: string }와 같은 형태일 수 있습니다. 이 데이터는 React Hook Form에서 폼 필드를 관리하는 데 사용됩니다.

// TName:
// 이 제네릭은 TFieldValues의 필드 이름을 나타냅니다. TName은 TFieldValues 객체의 키이어야 합니다. 기본값으로 FieldPath<TFieldValues>가 사용됩니다.
// FieldPath는 주어진 TFieldValues 타입에서 가능한 **경로(필드 이름)**를 추출하는 유틸리티 타입입니다.
// 예를 들어, TFieldValues가 { email: string, password: string }라면 TName은 email 또는 password와 같은 값을 가질 수 있습니다.
export type FormProps<TFormValues extends FieldValues, Schema> = {
  onSubmit: SubmitHandler<TFormValues>;
  schema: Schema;
  className?: string;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
};

export type FormItemContextValue = {
  id: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

//✅ 하위 컴포넌트들이 이 name 값을 바탕으로 에러 메시지 등을 자동으로 추출 가능.
const FormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

//  { isTouched: true, error: { message: "필수 항목입니다." } }

//FormField에서 설정한 name을 기반으로 field의 상태 (error, isTouched 등)를 가져옴.

// 이 상태를 하위 UI 컴포넌트들이 공유해서 똑똑하게 작동함.

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext || {};

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// 실제 input에 적용됨.
// aria-* 속성으로 접근성과 에러 핸들링에 도움
const FormControl = React.forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const Form = <
  Schema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<Schema>,
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const form = useForm({
    ...options,
    resolver: zodResolver(schema),
  });
  console.log(id, "form");

  return (
    <FormProvider {...form}>
      <form
        noValidate
        className={cn("space-y-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
      >
        {children(form)}
      </form>
    </FormProvider>
  );
};

export { FormProvider, FormItem, FormControl, Form, FormField };

//오류 메시지를 자동으로 표시해줌.
// const FormMessage = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement>
// >(({ className, children, ...props }, ref) => {
//   const { error, formMessageId } = useFormField();
//   const body = error ? String(error?.message) : children;

//   if (!body) {
//     return null;
//   }

//   return (
//     <p
//       ref={ref}
//       id={formMessageId}
//       className={cn("text-[0.8rem] font-medium text-destructive", className)}
//       {...props}
//     >
//       {body}
//     </p>
//   );
// });
// FormMessage.displayName = "FormMessage";

// 설명 텍스트를 aria-describedby로 연결해줌.

// const FormDescription = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement>
// >(({ className, ...props }, ref) => {
//   const { formDescriptionId } = useFormField();

//   return (
//     <p
//       ref={ref}
//       id={formDescriptionId}
//       className={cn("text-[0.8rem] text-muted-foreground", className)}
//       {...props}
//     />
//   );
// });
// FormDescription.displayName = "FormDescription";

// error가 있을 때 className에 text-destructive를 자동으로 추가.
// const FormLabel = React.forwardRef<
//   React.ComponentRef<typeof LabelPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
// >(({ className, ...props }, ref) => {
//   const { error, formItemId } = useFormField();

//   return (
//     <Label
//       ref={ref}
//       className={cn(error && "text-destructive", className)}
//       htmlFor={formItemId}
//       {...props}
//     />
//   );
// });
// FormLabel.displayName = "FormLabel";
