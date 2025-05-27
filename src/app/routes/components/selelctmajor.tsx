// /** @format */
// import React from "react";
// import majors from "@/constants/korean_university_majors_with_id.json";
// import Hangul from "hangul-js";
// import { Label } from "@/components/ui/form";
// import { Input } from "@/components/ui/form";
// import { Controller, useFormContext } from "react-hook-form";
// import { cn } from "@/utils/cn";

// type Props = {
//   className?: any;
// };

// export function useDebounce<T>(value: T, delay = 300): T {
//   const [debounced, setDebounced] = React.useState(value);
//   React.useEffect(() => {
//     const timer = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(timer);
//   }, [value, delay]);

//   return debounced;
// }

// const SelectMajor = ({ className }: Props) => {
//   const { setValue } = useFormContext();
//   const [input, setInput] = React.useState("");
//   const [suggestions, setSuggestions] = React.useState<
//     { id: number; name: string }[]
//   >([]);
//   const [highlightIndex, setHighlightIndex] = React.useState(-1);

//   const debouncedInput = useDebounce(input, 200);

//   console.log(debouncedInput);

//   const filterMajors = (query: string) => {
//     if (!query) return [];

//     const disassembledQuery = Hangul.disassemble(query).join("");
//     const filtered = majors.filter((item) => {
//       console.log(item);
//       const disassembledName = Hangul.disassemble(item.name, true)
//         .map((char) => (Array.isArray(char) ? char[0] : char))
//         .join("");

//       return (
//         item.name.includes(query) ||
//         disassembledName.includes(disassembledQuery)
//       );
//     });

//     console.log(filtered);
//     //대학교를 우선순위로 대학교 ->고려학교 등등 -> 고려대학교 대학원

//     return filtered;
//   };

//   React.useEffect(() => {
//     setSuggestions(filterMajors(debouncedInput).slice(0, 30));
//   }, [debouncedInput]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (suggestions.length === 0) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlightIndex((prev) =>
//         prev < suggestions.length - 1 ? prev + 1 : 0
//       );
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlightIndex((prev) =>
//         prev > 0 ? prev - 1 : suggestions.length - 1
//       );
//     } else if (e.key === "Enter" && highlightIndex >= 0) {
//       const selected = suggestions[highlightIndex];
//       console.log(selected);
//       setInput(selected.name);
//       setValue("university", selected.name);
//       setSuggestions([]);
//     }
//   };
//   const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
//   React.useEffect(() => {
//     if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
//       itemRefs.current[highlightIndex]?.scrollIntoView({
//         block: "nearest",
//       });
//     }
//   }, [highlightIndex]);
//   return (
//     <div className={cn("w-full flex items-center relative", className)}>
//       <Label className="w-[143px] text-[20px] font-semibold">학력</Label>

//       <div className="relative w-[266px] mr-[8px]">
//         {/* 전공 입력 */}
//         <Controller
//           name="major"
//           render={({ field }) => (
//             <Input
//               onKeyDown={handleKeyDown}
//               maxLength={15}
//               {...field}
//               value={input}
//               placeholder="전공 입력 "
//               className="w-[266px] h-[60px] text-[18px] font-medium"
//               profile={true}
//               onChange={(e) => {
//                 setInput(e.target.value);
//                 field.onChange(e);
//               }}
//             />
//           )}
//         />

//         {suggestions.length > 0 && (
//           <div className="absolute left-0 top-full mt-1 w-full max-h-[200px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md z-10">
//             {suggestions.map((item, i) => (
//               <div
//                 ref={(el) => {
//                   itemRefs.current[i] = el;
//                 }}
//                 key={item.id}
//                 // onMouseDown={() => {
//                 //   setInput(item.name);
//                 //   setValue("university", item.name);
//                 //   setSuggestions([]);
//                 // }}
//                 className={`px-4 py-2 text-[14px] hover:bg-gray-100 cursor-pointer ${
//                   i === highlightIndex ? "bg-blue-100" : ""
//                 }`}
//               >
//                 {item?.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SelectMajor;
