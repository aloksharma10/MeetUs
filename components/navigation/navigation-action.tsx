"use client"
import { useModal } from "@/hooks/use-model-store";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <button
      className="group flex items-center w-full"
      onClick={() => onOpen("createServer")}
    >
      <div className="h-[48px] w-full text-center flex rounded-lg group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-emerald-500 dark:bg-neutral-700 group-hover:bg-emerald-600">
        <p className="text-white transition">Create a workspace</p>
      </div>
    </button>
  );
};

export default NavigationAction;
