import { OptionT } from "../types/OptionType";

interface Props {
  opt: OptionT;
  dir: boolean;
}

export default function Option(props: Props) {
  return (
    <div className="text-white shadowy cursor-pointer font-medium bg-gradient-to-b font-inter from-dull-lavender-500 to-dull-lavender-600 hover:from-dull-lavender-600 hover:to-dull-lavender-700 select-none rounded-[5px] px-[22px] py-[12px] text-center">
      {props.opt.title} {props.dir && "->"}
    </div>
  );
}
