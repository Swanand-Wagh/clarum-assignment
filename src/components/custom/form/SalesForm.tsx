'use client';

import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SalesFormProps } from '@/interfaces/salesForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Modal } from '../modal';
import { Button } from '@/components/ui/button';

export const SalesForm: React.FunctionComponent<Readonly<SalesFormProps>> = ({
  lastYear,
  setChartData,
  setOpenAddNumbersModal,
}): JSX.Element => {
  const formSchema = z.object({
    sales: z
      .string()
      .trim()
      .min(1, {
        message: 'Total sale is required.',
      })
      .regex(/^\d+$/, {
        message: 'Total sale must be a number.',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setChartData((prev) => [...prev, { year: lastYear + 1, sales: parseInt(values.sales) }]);
    setOpenAddNumbersModal(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="sales"
          render={({ field }) => (
            <FormItem className="mb-16 mt-8">
              <FormLabel>Total Sale for {lastYear + 1}</FormLabel>
              <FormControl>
                <Input placeholder="9000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Modal.Footer modalCloseText="Cancel">
          <Button type="submit" className="flex items-center gap-1">
            + Add
          </Button>
        </Modal.Footer>
      </form>
    </Form>
  );
};
