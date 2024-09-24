"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SalesForm: React.FunctionComponent = (): JSX.Element => {
  const formSchema = z.object({
    year: z
      .string()
      .length(4, {
        message: "Year must be 4 digits.",
      })
      .regex(/^\d{4}$/, {
        message: "Year must be a number.",
      }),
    sales: z
      .string()
      .min(1, {
        message: "Total sale is required.",
      })
      .regex(/^\d+$/, {
        message: "Total sale must be a number.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sales"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Sale</FormLabel>
              <FormControl>
                <Input placeholder="9000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
