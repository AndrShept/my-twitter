'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, SendHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  comment: z.string().min(3),
});

export const CommentsInput = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(formSchema),
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { ...values, postId };
    const res = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.refresh();
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' bg-background/80 backdrop-blur-md z-[1] flex gap-2 sticky top-14 p-6 border-b '
      >
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  disabled={isLoading}
                  {...field}
                  placeholder='Enter comments...'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex '>
          <Button
            disabled={isLoading}
            className='rounded-full hover:text-primary text-muted-foreground '
            variant={'ghost'}
            size={'icon'}
          >
            <SendHorizontal />
          </Button>
      { isLoading &&   <div className='py-2'>  <Loader2 className='animate-spin' /></div>}
        </div>
      </form>
    </Form>
  );
};
