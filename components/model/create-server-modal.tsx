"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";

import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createServer } from "@/actions/server";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";

const formSchema = zod.object({
  name: zod.string().min(1, { message: "Server name is required" }),
  imgURL: zod.string().min(1, { message: "Image is required" }),
});

const CreateServerModal = () => {
  const router = useRouter();
  
  const { isOpen, onClose, type }= useModal()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imgURL: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await createServer(values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

const isModelOpen = type === "createServer" && isOpen;

const handleClose = () => {
  form.reset();
  onClose();
}
  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      <DialogContent className="text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your workspace
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your workspace a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imgURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImages"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                    <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 dark:bg-zinc-700 dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
