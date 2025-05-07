/** @format */

import ContentsBox from "@/components/layout/contentsBox";
import { Select } from "@/components/ui/form";
import { Controller } from "react-hook-form";

const People = ({ control }) => {
  return (
    <ContentsBox title="함께 하고싶은 인원수를 선택해주세요.">
      <div className="relative">
        <Controller
          control={control}
          name="otherField"
          render={() => (
            <Select
              className="w-[169px]"
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
              ]}
            />
          )}
        />
      </div>
    </ContentsBox>
  );
};

export default People;
