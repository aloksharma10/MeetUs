import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Picker from "@emoji-mart/react";

import { Smile } from "lucide-react";

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
}
const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 hover:text-zinc-400 transition" />
      </PopoverTrigger>
      <PopoverContent
        className="border-none shadow-none drop-shadow-none mb-16 w-full"
        side="right"
        sideOffset={0}
      >
        <Picker
          theme={resolvedTheme}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
